import Equipment from "../../models/equipment.model";

type CreateEquipmentDto = {
    make: string;
    model: string;
    status: string;
    location: string;
    date_of_acquisition: Date;
    observations: string;
    equipment_type_id: string;
    user_id: string;
};

type UpdateEquipmentDto = Partial<CreateEquipmentDto>;

export class EquipmentsService {
  constructor(private equipmentsModel: typeof Equipment) {}

  async createEquipment(equipment: CreateEquipmentDto) {
    return await this.equipmentsModel.create(equipment);
  }

  async getEquipments() {
    return await this.equipmentsModel.findAll();
  }

  async getEquipmentById(id: string) {
    return await this.equipmentsModel.findByPk(id);
  }

  async getEquipmentByMake(make: string) {
    return await this.equipmentsModel.findOne({ where: { make } });
  }

  async getEquipmentByModel(model: string) {
    return await this.equipmentsModel.findOne({ where: { model } });
  }

  async updateEquipment(id: string, equipment: UpdateEquipmentDto) {
    return await this.equipmentsModel.update(equipment, {
      where: { equipment_id: id },
    });
  }

  async deleteEquipment(id: string) {
    return await this.equipmentsModel.destroy({
      where: { equipment_id: id },
    });
  }
}
