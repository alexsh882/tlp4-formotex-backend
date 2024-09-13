import bcrypt from "bcrypt";
import jwt, { Secret } from "jsonwebtoken";

import Role from "../models/role.model";
import User from "../models/users.model";
import { UserService } from "../features/users/user.service";

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
  constructor(private userService = new UserService()) {}

  getProfile = async (token: string) => {
    if (!token) {
      throw new Error("Token no proporcionado");
    }
    const user = await this.verifyToken(token);

    return user;
  };

  signUp = async ({ names, username, password }: UserSignUp) => {
    const userFounded = await this.userService.getUserByUsername(username);

    if (userFounded) {
      throw new Error("El usuario ya existe");
    }

    const newUser = await this.userService.createNewUser({
      username,
      names,
      password,
    });

    if (!newUser) {
      throw new Error("Error al crear el usuario");
    }

    const user = {
      ...newUser.dataValues,
      password: undefined,
      role_id: undefined,
    };

    const token = await this.createToken(user.user_id);

    return { user, token };
  };

  signIn = async ({ username, password }: UserSignIn) => {
    const userFounded = await this.userService.getUserByUsername(username);

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

  logout = async ({ id }: { id: string }) => {
    const user = await this.userService.getUserById(id);

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
          const { user_id } = decoded as JwtPayload;

          if (!user_id) {
            reject(err);
          }
          const user = await this.userService.getUserById(user_id);

          resolve(user);
          reject(new Error("Token no válido o no existe"));
        }
      );
    });
  };
}

type JwtPayload = {
  user_id: string;
  expires_in: number;
};
