import { ROLES } from "../../const/roles"
import Role from "../../models/role.model"
import User from "../../models/users.model"




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
        password: "Password.123",
        role_id: adminRole.role_id
    }

    await User.upsert(newAdminUser);

    
  
}