import { ROLES } from "../../const/roles";
import Role from "../../models/role.model";

export const roles = [
  {
    name: ROLES.ADMIN,
  },
  {
    name: ROLES.USER,
  },
];

export const seedRoles = async () => {
  const existRoles = await Role.count();

  if (existRoles > 0) {
    return;
  }

  const rolesToCreate = roles.map((role) => Role.upsert(role));

  await Promise.all(rolesToCreate);
};
