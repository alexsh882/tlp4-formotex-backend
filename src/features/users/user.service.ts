import User from "../../models/users.model";

export class UserService{
    constructor(private userModel: typeof User= User){}

    async getUserById(user_id: string){
        return await this.userModel.findByPk(user_id);
    }
}