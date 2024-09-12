import EquipmentType from "../../models/equipment-type.model";

type CreateEquipmentTypeDto = {
  name: string;
};

type UpdateEquipmentTypeDto = Partial<CreateEquipmentTypeDto>;

export class EquipmentTypesService {
  constructor(
    private equipmentTypesModel: typeof EquipmentType = EquipmentType
  ) {}

  async createEquipmentType(equipmentType: CreateEquipmentTypeDto) {
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

  async updateEquipmentType(id: string, equipmentType: UpdateEquipmentTypeDto) {
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
