import bcrypt from "bcrypt";
import jwt, { Secret } from "jsonwebtoken";

import { ROLES } from "../const/roles";
import Role from "../models/role.model";
import User from "../models/users.model";

export class BadRequestError extends Error {}

type UserSignUp = {
  names: string;
  username: string;
  password: string;
};

type UserSignIn = {
  username: string;
  password: string;
};

export class AuthService {
  constructor(
    private userModel?: typeof User,
    private roleModel?: typeof Role
  ) {}

  signUp = async ({ names, username, password }: UserSignUp) => {
    const userFounded = await this.userModel?.findOne({
      where: { username: username },
    });

    if (userFounded) {
      throw new Error("El usuario ya existe");
    }

    const roleUser = await this.roleModel?.findOne({
      where: { name: ROLES.USER },
    });

    if (!roleUser) {
      throw new Error("El rol no existe");
    }

    const newUser = await this.userModel?.create({
      names,
      username,
      password: bcrypt.hashSync(password, 10),
      role_id: roleUser.role_id,
    });

    if (!newUser) {
      throw new Error("Error al crear el usuario");
    }

    const user = {
      ...newUser.dataValues,
      user_role: roleUser,
      password: undefined,
      role_id: undefined,
    };

    const token = await this.createToken(user.user_id);

    return { user, token };
  };

  signIn = async ({ username, password }: UserSignIn) => {
    const userFounded = await this.userModel?.findOne({
      where: { username },
      include: {
        model: this.roleModel,
        as: "user_role",
      },
      attributes: { exclude: ["role_id"] },
    });

    if (!userFounded) {
      throw new BadRequestError("Usuario o contraseña incorrecta");
    }

    const isPasswordValid = bcrypt.compareSync(password, userFounded.password);

    if (!isPasswordValid) {
      throw new BadRequestError("Usuario o contraseña incorrecta");
    }

    const token = await this.createToken(userFounded.user_id);

    const user = {
      ...userFounded.dataValues,
      password: undefined,
    };

    return { user, token };
  };

  logout = async ({ id }: { id: number }) => {
    const user = await this.userModel?.findByPk(id);

    if (!user) {
      throw new Error("Usuario no encontrado");
    }
    return null;
  };

  async createToken(user_id: string) {
    return new Promise((resolve, reject) => {
      jwt.sign(
        { user_id: user_id, expires_in: 86400 },
        process.env.JWT_SECRET as Secret,
        {
          expiresIn: 86400, // 24 horas
        },
        (err, token) => {
          if (err) {
            reject(err);
          }
          resolve(token);
        }
      );
    });
  }

  verifyToken = async (token: string) => {
    return new Promise((resolve, reject) => {
      jwt.verify(
        token,
        process.env.JWT_SECRET as Secret,
        async (err, decoded) => {
          if (err) {
            reject(err);
          }
          const dataDecoded = decoded as JwtPayload;

          if (!dataDecoded.user_id) {
            reject(err);
          }
          const user = await this.userModel?.findByPk(dataDecoded.user_id);

          resolve(user);
          reject(new Error("Token no válido o no existe"));
        }
      );
    });
  };
}

type JwtPayload = {
  user_id: number;
  expires_in: number;
};

export const authService = new AuthService(User, Role);
