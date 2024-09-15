
import * as fs from "node:fs/promises";

import { ROLES } from "../../const/roles";
import Role from "../../models/role.model";
import User, { UserCreationAttributes } from "../../models/users.model";
import { hashPassword } from "../../utils/hash-password";


export const seedUserAdmin = async () => {
  const adminRole = await Role.findOne({
    where: {
      name: ROLES.ADMIN,
    },
  });

  if (!adminRole) {
    throw new Error("No existe el rol buscado.");
  }

  const newAdminUser = {
    names: "Alejandro",
    username: "admin",
    password: hashPassword("Password.123"),
    role_id: adminRole.role_id,
  };

  await User.upsert(newAdminUser);
};

export const seedUsers = async () => {
  const userRole = await Role.findOne({
    where: {
      name: ROLES.USER,
    },
  });

  if (!userRole) {
    throw new Error("No existe el rol buscado.");
  }

  const contents = await fs.readFile('src/database/seeders/mock/users.json', 'utf8');
    

  const basicUsers = JSON.parse(contents) as  UserCreationAttributes[];
  

  const newBasicUsers = basicUsers.map(async (user) => {
    return User.findOrCreate({
      where: {
        username: user.username,
      },
      defaults: {
        ...user,
        role_id: userRole.role_id,
      },
    });
  });

  await Promise.all(newBasicUsers);
};
