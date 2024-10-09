import Inventory from "../../models/inventory.model";

const inventoryData = [
  {
    name: "Inventory 1",
  },
  {
    name: "Inventory 2",
  },
  {
    name: "Inventory 3",
  },
];

export const seedInventories = async () => {

  const existInventories = await Inventory.count();

  if (existInventories > 0) {
    return;
  }

  const inventories = inventoryData.map(async (inventory) => {
    return Inventory.findOrCreate({
      where: {
        name: inventory.name,
      },
      defaults: {
        ...inventory,
      },
    });
  });

  await Promise.all(inventories);
};
