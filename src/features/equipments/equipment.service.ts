import EquipmentType from "../../models/equipment-type.model";
import Equipment from "../../models/equipment.model";
import InventoryEntry from "../../models/inventory-entry.model";
import Make from "../../models/makes.model";
import User from "../../models/users.model";
import {
  IEquipmentCreationAttributes,
  IEquipmentUpdateAttributes,
} from "./interfaces/equipment";

export class EquipmentsService {
  constructor(private equipmentsModel: typeof Equipment = Equipment) {}

  async createEquipment(equipment: IEquipmentCreationAttributes, user: User) {
    return await this.equipmentsModel.create({
      model: equipment.model,
      characteristics: equipment.characteristics,
      equipment_type_id: equipment.equipment_type_id,
      make_id: equipment.make_id,
      user_id: user.user_id,
    });
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
      throw new Error("Equipo no encontrado.");
    }

    return await this.equipmentsModel.update(equipment, {
      where: { equipment_id: foundEquipment.equipment_id },
    });
  }

  async deleteEquipment(id: string) {

    const foundEquipment = await this.equipmentsModel.findByPk(id,{
      include: [
        {
          model: InventoryEntry,
          as: 'inventory_entries'
        }
      ]
    });

    if (!foundEquipment) {
      throw new Error("Equipo no encontrado.");
    }

    if (foundEquipment.inventory_entries.length > 0) {
      throw new Error("No se puede eliminar el equipo porque tiene entradas en inventario.");
    }

    return await this.equipmentsModel.destroy({
      where: { equipment_id: id },
    });
  }
}
