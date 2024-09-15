import Equipment from "../../models/equipment.model";
import InventoryEntry, {
  EquipmentStatus,
  InventoryEntriesCreationAttributes,
} from "../../models/inventory-entry.model";
import Inventory from "../../models/inventory.model";
import User from "../../models/users.model";

type Data = {
  inventory_id: string;
  equipment_id: string;
  quantity: number | undefined;
};

const inventoryEntriesData = [
  {
    serial: "1a2b3c",
    status: EquipmentStatus.DISPOSED,
    observations: "Detalle de la observación 1",
    date_in: new Date("2024-09-10"),
  },
  {
    serial: "4d5e6f",
    status: EquipmentStatus.MAINTENANCE,
    observations: "Detalle de la observación 2",
    date_in: new Date("2024-09-11"),
  },
  {
    serial: "7g8h9i",
    status: EquipmentStatus.REPAIRED,
    observations: "Detalle de la observación 3",
    date_in: new Date("2024-09-12"),
  },
  {
    serial: "1s2t3u",
    status: EquipmentStatus.UNDER_REPAIR,
    observations: "Detalle de la observación 4",
    date_in: new Date("2024-09-13"),
  },
  {
    serial: "4q5w6e",
    status: EquipmentStatus.DISPOSED,
    observations: "Detalle de la observación 5",
    date_in: new Date("2024-09-14"),
  },
  {
    serial: "5a6s7d",
    status: EquipmentStatus.MAINTENANCE,
    observations: "Detalle de la observación 6",
    date_in: new Date("2024-09-15"),
  },
  {
    serial: "8f9g0h",
    status: EquipmentStatus.REPAIRED,
    observations: "Detalle de la observación 7",
    date_in: new Date("2024-09-09"),
  },
  {
    serial: "1j2k3l",
    status: EquipmentStatus.UNDER_REPAIR,
    observations: "Detalle de la observación 8",
    date_in: new Date("2024-09-08"),
  },
] as InventoryEntriesCreationAttributes[];

export const seedInventoryEntriesData = async () => {
  const equipments = await Equipment.findAll();
  const inventories = await Inventory.findAll();
  const users = await User.findAll();

  const newInventoryEntries = inventoryEntriesData.map(
    async (inventoryEntry) => {
      const randomUser = Math.floor(Math.random() * users.length);
      const randomEquipment = Math.floor(Math.random() * equipments.length);
      const randomInventory = Math.floor(Math.random() * inventories.length);

      return InventoryEntry.findOrCreate({
        where: {
          serial: inventoryEntry.serial,
        },
        defaults: {
          ...inventoryEntry,
          equipment_id: equipments[randomEquipment].equipment_id,
          inventory_id: inventories[randomInventory].inventory_id,
          user_id: users[randomUser].user_id,
        },
      });
    }
  );
  await Promise.all(newInventoryEntries);
};
