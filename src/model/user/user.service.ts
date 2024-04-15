import userSchema from "./user.schema";

export class UserService{
    async create(user: any){
        const createUser = userSchema.create(user)
        return createUser
    }

    async findById(id: any){
        const foundUser = await userSchema.findById(id)
        return foundUser
    }

    async findAll(){
        const foundUser = await userSchema.find()
        return foundUser
    }

    async updateById(id: any, user: any){
        const foundUser = await userSchema.findByIdAndUpdate(id, user)
        return foundUser
    }

    async deleteById(id: any){
        const deletedUser = await userSchema.findByIdAndDelete(id)
        return deletedUser
    }
}