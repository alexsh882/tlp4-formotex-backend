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

  const equipmentTypes = data.map(async (equipment) => {
    return EquipmentType.upsert({
      name: equipment.type,
    });
  });

  const equipmentMake = data.map(async (equipment) => {
    return Make.upsert({
      name: equipment.marca,
    });
  });

  const equipmentTypesCreated = await Promise.all(equipmentTypes);
  const equipmentMakeCreated = await Promise.all(equipmentMake);

  const users = await User.findAll();

  const equipment = data.map(async (equipment) => {
    const randomUser = Math.floor(Math.random() * users.length);
    const randomEquipmentType = Math.floor(
      Math.random() * equipmentTypesCreated.length
    );
    const randomEquipmentMake = Math.floor(
      Math.random() * equipmentMakeCreated.length
    );

    return Equipment.findOrCreate({
      where: {
        model: equipment.modelo,
      },
      defaults: {
        model: equipment.modelo,
        characteristics: equipment.characteristics,
        user_id: users[randomUser].user_id,
        equipment_type_id:
          equipmentTypesCreated[randomEquipmentType][0].equipment_type_id,
        make_id: equipmentMakeCreated[randomEquipmentMake][0].make_id,
      },
    });
  });

  await Promise.all(equipment);
};
