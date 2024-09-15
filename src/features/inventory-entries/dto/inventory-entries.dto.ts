export type CreateInventoryEntriesDto = {
  inventory_entry_id: string;
  serial: string;
  status: string;
  date_in: Date;
  date_out: Date;
  observations: string;
  equipment_id: string;
  inventory_id: string;
  user_id: string;
};

export type UpdateInventoryEntriesDto = Partial<CreateInventoryEntriesDto>;