import Make from "../../models/makes.model";
import { IMakeCreationAttributes, IMakeUpdateAttributes } from "./interfaces/make";

export class MakeService {
  constructor(private makeModel: typeof Make = Make) {}

  async createMake(make: IMakeCreationAttributes) {
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

  async updateMake(id: string, make: IMakeUpdateAttributes) {
    const foundMake = await this.makeModel.findByPk(id);

    if (!foundMake) {
      throw new Error("Make not found");
    }

    return await this.makeModel.update(make, {
      where: { make_id: foundMake.make_id },
    });
  }

  async deleteMake(id: string) {
    const foundMake = await this.makeModel.findByPk(id);

    if (!foundMake) {
      throw new Error("Make not found");
    }

    return await this.makeModel.destroy({
      where: { make_id: foundMake.make_id },
    });
  }
}
