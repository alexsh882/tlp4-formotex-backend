import Make from "../../models/makes.model";

export class MakeService {
  constructor(private makeModel: typeof Make) {}

  async createMake(make: any) {
    return await this.makeModel.create(make);
  }

  async getMakes() {
    return await this.makeModel.findAll({});
  }

  async getMakeById(id: string) {
    return await this.makeModel.findByPk(id);
  }

  async getMakeByName(name: string) {
    return await this.makeModel.findOne({
      where: { name },
    });
  }
}
