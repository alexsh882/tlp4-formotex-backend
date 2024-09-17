import EquipmentType from "../../models/equipment-type.model";
import Equipment from "../../models/equipment.model";
import {
  IEquipmentTypeCreationAttributes,
  IEquipmentTypeUpdateAttributes,
} from "./interfaces/equipment-type";

export class EquipmentTypesService {
  constructor(
    private equipmentTypesModel: typeof EquipmentType = EquipmentType
  ) {}

  async createEquipmentType(equipmentType: IEquipmentTypeCreationAttributes) {
    return await this.equipmentTypesModel.create({
      name: equipmentType.name,
    });
  }

  async getEquipmentTypes() {
    return await this.equipmentTypesModel.findAll({
      order: [["name", "ASC"]],
    });
  }

  async getEquipmentTypeById(id: string) {
    return await this.equipmentTypesModel.findByPk(id);
  }

  async getEquipmentTypeByName(name: string) {
    return await this.equipmentTypesModel.findOne({
      where: { name },
    });
  }

  async updateEquipmentType(
    id: string,
    equipmentType: IEquipmentTypeUpdateAttributes
  ) {
    return await this.equipmentTypesModel.update(
      {
        name: equipmentType.name,
      },
      {
        where: { equipment_type_id: id },
      }
    );
  }

  async deleteEquipmentType(id: string) {

    const foundEquipmentType = await this.equipmentTypesModel.findByPk(id,
      {
        include: [{ model: Equipment, as: "equipments" }],
      }
    )

    if (!foundEquipmentType) {
      throw new Error("Tipo de equipo no encontrado");
           
    }

    if (foundEquipmentType.equipments.length) {
      throw new Error("No se puede eliminar el tipo de equipo porque tiene equipos asociados.");
    }


    return await this.equipmentTypesModel.destroy({
      where: { equipment_type_id: foundEquipmentType.equipment_type_id },
    });
  }
}
