import * as fs from "node:fs/promises";
import EquipmentType from "../../models/equipment-type.model";
import Make from "../../models/makes.model";
import Equipment from "../../models/equipment.model";
import User from "../../models/users.model";

type Data = {
  type: string;
  marca: string;
  modelo: string;
  characteristics: string;
};

export const seedEquipmentsData = async () => {
  const contents = await fs.readFile(
    "src/database/seeders/mock/equipments.json",
    "utf8"
  );

  const data = JSON.parse(contents) as Data[];

  const users = await User.findAll();

  const equipment = data.map(async (equipment) => {
    const [equipmentTypesCreated, create] = await EquipmentType.findOrCreate({
      where: {
        name: equipment.type,
      },
      defaults: {
        name: equipment.type,
      },
    });

    const [make, created] = await Make.findOrCreate({
      where: {
        name: equipment.marca,
      },
      defaults: {
        name: equipment.marca,
      },
    });

    const randomUser = Math.floor(Math.random() * users.length);

    return Equipment.findOrCreate({
      where: {
        model: equipment.modelo,
      },
      defaults: {
        model: equipment.modelo,
        characteristics: equipment.characteristics,
        equipment_type_id: equipmentTypesCreated.equipment_type_id,
        user_id: users[randomUser].user_id,
        make_id: make.make_id,
      },
    });
  });

  await Promise.all(equipment);
};
