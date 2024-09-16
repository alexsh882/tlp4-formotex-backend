import { ROLES } from "../../const/roles";
import Role from "../../models/role.model";

export class RoleService {
  constructor(private roleModel: typeof Role = Role) {}

  async getRoles() {
    return await this.roleModel?.findAll();
  }

  async getRoleByName(name: string) {
    return await this.roleModel?.findOne({
      where: { name },
    });
  }

  async getRoleById(role_id: string) {
    return await this.roleModel?.findByPk(role_id);
  }

}
