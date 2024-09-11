
export type CreateInventoryDto = {
    name: string;
}


export type UpdateInventoryDto = Partial<CreateInventoryDto>;