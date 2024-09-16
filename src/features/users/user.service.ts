import bcrypt from "bcrypt";
import { ROLES } from "../../const/roles";
import User from "../../models/users.model";
import { RoleService } from "../roles/role.service";
import Role from "../../models/role.model";
import { hashPassword } from "../../utils/hash-password";
import {
  IUserCreationAttributes,
  IUserUpdateAttributes,
} from "./interfaces/user";

export class UserService {
  constructor(
    private userModel: typeof User = User,
    private roleService = new RoleService()
  ) {}

  async getUsers() {
    return await this.userModel.findAll({
      include: {
        model: Role,
        as: "user_role",
      },
      attributes: {
        exclude: ["password"],
      },
      order: [["created_at", "DESC"]],
    });
  }

  async getUserById(user_id: string) {
    return await this.userModel.findByPk(user_id, {
      include: {
        model: Role,
        as: "user_role",
      },
      attributes: {
        exclude: ["password"],
      },
    });
  }

  async getUserByUsername(username: string) {
    return await this.userModel?.findOne({
      where: { username },
      include: {
        model: Role,
        as: "user_role",
      },
      attributes: { exclude: ["role_id"] },
    });
  }

  async createNewUser(user: IUserCreationAttributes) {
    const roleUser = user.role_id
      ? await this.roleService.getRoleById(user.role_id)
      : await this.roleService.getRoleByName(ROLES.USER);
    if (!roleUser) {
      throw new Error("El rol no existe");
    }
    const newUser = await this.userModel?.create(
      {
        names: user.names,
        username: user.username,
        password: hashPassword(user.password),
        role_id: roleUser.role_id,
      },
      {
        include: {
          model: Role,
          as: "user_role",
        },
      }
    );

    return newUser;
  }

  async updateUser(user_id: string, user: IUserUpdateAttributes) {
    const foundedUser = await this.userModel.findByPk(user_id);

    if (!foundedUser) {
      throw new Error("El usuario no existe");
    }

    const foundedRole = await this.roleService.getRoleById(
      user.role_id as string
    );

    return await foundedUser.update({
      names: user.names,
      username: user.username,
      role_id: foundedRole?.role_id,
    });
  }

  async updatePassword(user_id: string, password: string) {
    const foundedUser = await this.userModel.findByPk(user_id);

    if (!foundedUser) {
      throw new Error("El usuario no existe");
    }

    return await foundedUser.update({
      password: hashPassword(password),
    });
  }

  async updateRoleToUser(user_id: string, role_id: string) {
    const foundedUser = await this.userModel.findByPk(user_id);

    if (!foundedUser) {
      throw new Error("El usuario no existe");
    }

    const foundedRole = await this.roleService.getRoleById(role_id);

    if (!foundedRole) {
      throw new Error("El rol no existe");
    }

    return await foundedUser.update({
      role_id: foundedRole.role_id,
    });
  }

  async deleteUser(user_id: string, user?: User) {
    const foundedUser = await this.userModel.findByPk(user_id, {
      include: {
        model: Role,
        as: "user_role",
      },
    });

    if (!foundedUser) {
      throw new Error("El usuario no existe");
    }

    if (user_id === user?.user_id) {
      throw new Error("No puedes eliminarte a ti mismo");
    }

    if (foundedUser.user_role.name === ROLES.ADMIN) {
      throw new Error("No puedes eliminar a un administrador");
    }

    await foundedUser.destroy();
  }
}
