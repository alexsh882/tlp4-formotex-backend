import {
  Table,
  Column,
  Model,
  BelongsTo,
  ForeignKey,
  CreatedAt,
  UpdatedAt,
  DeletedAt,
  PrimaryKey,
  DataType,
  Default,
} from "sequelize-typescript";
import Equipment from "./equipment.model";
import Inventory from "./inventory.model";
import User from "./users.model";
import { IInventoryEntriesAttributes, IInventoryEntriesCreationAttributes } from "../features/inventory-entries/interfaces/inventory-entry";


export enum EquipmentStatus {
  REPAIRED = "repaired",
  UNDER_REPAIR = "under_repair",
  MAINTENANCE = "maintenance",
  DISPOSED = "disposed",
}

export const ENUM_EQUIPMENT_STATUS = Object.values(EquipmentStatus);

@Table({
  tableName: "inventory_entries",
  paranoid: true,
  timestamps: true,
})
export default class InventoryEntry extends Model<
  IInventoryEntriesAttributes,
  IInventoryEntriesCreationAttributes
> {
  @PrimaryKey
  @Default(DataType.UUIDV4)
  @Column(DataType.UUID)
  inventory_entry_id: string;

  @Column({})
  serial: string;
  
  @Column({
    type: DataType.ENUM,
    values: Object.values(EquipmentStatus),
  })
  status: string;

  @Column({
    allowNull: true,
  })
  date_in: Date;

  @Column({
    allowNull: true,
  })
  date_out: Date;

  @Column({
    allowNull: true,
    type: DataType.TEXT,
  })
  observations: string;


  @ForeignKey(() => Equipment)
  equipment_id: string;

  @ForeignKey(() => Inventory)
  inventory_id: string;

  @ForeignKey(() => User)
  user_id: string;

  
  @BelongsTo(() => Equipment)
  equipment: Equipment;

  @BelongsTo(() => Inventory)
  inventory: Inventory;

  @BelongsTo(() => User)
  user: User;

  @CreatedAt
  created_at: Date;

  @UpdatedAt
  updated_at: Date;

  @DeletedAt
  deleted_at: Date;
}
