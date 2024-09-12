export type CreateEquipmentDto = {
  model: string;
  characteristics: string;
  make_id: string;
  equipment_type_id: string;
  user_id: string;
};

export type UpdateEquipmentDto = Partial<CreateEquipmentDto>;
