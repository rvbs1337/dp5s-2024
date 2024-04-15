import taskSchema from "./task.schema";

export class TaskService{
    async create(task: any){
        const createTask = taskSchema.create(task)
        return createTask
    }

    async findById(id: any){
        const foundTask = await taskSchema.findById(id)
        return foundTask
    }

    async findAll(){
        const foundTask = await taskSchema.find()
        return foundTask
    }

    async updateById(id: any, task: any){
        const foundTask = await taskSchema.findByIdAndUpdate(id, task)
        return foundTask
    }

    async deleteById(id: any){
        const deletedTask = await taskSchema.findByIdAndDelete(id)
        return deletedTask
    }
}