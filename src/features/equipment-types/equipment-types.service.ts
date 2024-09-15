import EquipmentType from "../../models/equipment-type.model";
import { IEquipmentTypeCreationAttributes, IEquipmentTypeUpdateAttributes } from "./interfaces/equipment-type";

export class EquipmentTypesService {
  constructor(
    private equipmentTypesModel: typeof EquipmentType = EquipmentType
  ) {}

  async createEquipmentType(equipmentType: IEquipmentTypeCreationAttributes) {
    return await this.equipmentTypesModel.create(equipmentType);
  }

  async getEquipmentTypes() {
    return await this.equipmentTypesModel.findAll({});
  }

  async getEquipmentTypeById(id: string) {
    return await this.equipmentTypesModel.findByPk(id);
  }

  async getEquipmentTypeByName(name: string) {
    return await this.equipmentTypesModel.findOne({
      where: { name },
    });
  }

  async updateEquipmentType(id: string, equipmentType: IEquipmentTypeUpdateAttributes) {
    return await this.equipmentTypesModel.update(equipmentType, {
      where: { equipment_type_id: id },
    });
  }

  async deleteEquipmentType(id: string) {
    return await this.equipmentTypesModel.destroy({
      where: { equipment_type_id: id },
    });
  }
}
