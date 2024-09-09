
export interface IDatabase {
   dbInit(): Promise<void>;
   getDbConfig(): any;
}