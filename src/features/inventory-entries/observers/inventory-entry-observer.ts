import User from "../../../models/users.model";

export class InventoryEntryObserver {
  private static instance: InventoryEntryObserver;
  private observers: User[] = [];

  static getInstance() {
    if (!this.instance) {
      this.instance = new InventoryEntryObserver();
    }

    return this.instance;
  }

  addObservers(observer: User) {
    console.log(`${observer.names} inició sesión y se agregó el observador.`);

    this.observers.push(observer);
  }

  notifyUsers(message: string) {
    this.observers.forEach((user) => {
      if (user.notification) {
        user.notification(message);
      }
    });
  }
}
