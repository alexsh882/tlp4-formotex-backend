import EquipmentType from "../../models/equipment-type.model";
import Equipment from "../../models/equipment.model";
import Make from "../../models/makes.model";
import User from "../../models/users.model";
import {
  IEquipmentCreationAttributes,
  IEquipmentUpdateAttributes,
} from "./interfaces/equipment";

export class EquipmentsService {
  constructor(private equipmentsModel: typeof Equipment = Equipment) {}

  async createEquipment(equipment: IEquipmentCreationAttributes) {
    return await this.equipmentsModel.create(equipment);
  }

  async getEquipments() {
    return await this.equipmentsModel.findAll({
      include: [
        { model: User, as: "user", attributes: { exclude: ["password"] } },
        { model: EquipmentType },
        { model: Make },
      ],
    });
  }

  async getEquipmentById(id: string) {
    return await this.equipmentsModel.findByPk(id);
  }

  async getEquipmentByModel(model: string) {
    return await this.equipmentsModel.findOne({ where: { model } });
  }

  async updateEquipment(
    id: string,
    equipment: IEquipmentUpdateAttributes,
    user: User
  ) {
    const foundEquipment = await this.equipmentsModel.findByPk(id);

    if (!foundEquipment) {
      throw new Error("Equipment not found");
    }

    if (foundEquipment.user_id !== user.user_id) {
      throw new Error("You are not allowed to update this equipment");
    }

    return await this.equipmentsModel.update(equipment, {
      where: { equipment_id: foundEquipment.equipment_id },
    });
  }

  async deleteEquipment(id: string) {
    return await this.equipmentsModel.destroy({
      where: { equipment_id: id },
    });
  }
}
