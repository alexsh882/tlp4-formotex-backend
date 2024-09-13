import { ROLES } from "../../const/roles";
import Role from "../../models/role.model";

export class RoleService {
  constructor(private roleModel: typeof Role = Role) {}

  async getRoleByName(name: string) {
    return await this.roleModel?.findOne({
      where: { name },
    });
  }
}
