import { ROLES } from "../../const/roles"
import { UserService } from "../../features/users/user.service"
import Role from "../../models/role.model"
import User from "../../models/users.model"


const userService = new UserService();

export const seedUserAdmin = async () => {
    const adminRole = await Role.findOne({
        where: {
            name: ROLES.ADMIN
        }
    }) 

    if (!adminRole) {
        throw new Error("No existe el rol buscado.")
    }

    const newAdminUser = {
        names: "Alejandro",
        username: "admin",
        password: "Password.123"
    }

    const newAdmin = await userService.createNewUser(newAdminUser);

    await userService.updateRoleToUser(newAdmin.user_id, adminRole?.role_id);
  
}