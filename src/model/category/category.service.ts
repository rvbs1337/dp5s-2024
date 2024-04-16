import categorySchema from "./category.schema";

export class CategoryService{
    async create(category: any){
        const createCategory = categorySchema.create(category)
        return createCategory
    }

    async findById(id: any){
        const foundCategory = await categorySchema.findById(id)
        return foundCategory
    }

    async findAll(){
        const foundCategory = await categorySchema.find()
        return foundCategory
    }

    async updateById(id: any, category: any){
        const foundCategory = await categorySchema.findByIdAndUpdate(id, category)
        return foundCategory
    }

    async deleteById(id: any){
        const deletedCategory = await categorySchema.findByIdAndDelete(id)
        return deletedCategory
    }
}