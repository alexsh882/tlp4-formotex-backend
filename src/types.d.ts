import User from "./models/users.model";

declare global {
  declare namespace Express {
    interface Request {
      user?: User;
    }
  }
}
