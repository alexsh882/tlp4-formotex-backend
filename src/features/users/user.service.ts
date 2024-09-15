import bcrypt from "bcrypt";
import { ROLES } from "../../const/roles";
import User from "../../models/users.model";
import { RoleService } from "../roles/role.service";
import Role from "../../models/role.model";
import { hashPassword } from "../../utils/hash-password";

export interface IUser {
  names: string;
  username: string;
  password: string;
  role_id?: string;
}

export class UserService {
  constructor(
    private userModel: typeof User = User,
    private roleService = new RoleService()
  ) {}

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

  async createNewUser(user: IUser) {
    const roleUser = await this.roleService.getRoleByName(ROLES.USER);
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

  async updateRoleToUser(user_id: string, role_id: string) {
    const foundedUser = await this.userModel.findByPk(user_id);

    if (!foundedUser) {
      throw new Error("El usuario no existe");
    }

    return await foundedUser.update({
      role_id
    })

  }
}
