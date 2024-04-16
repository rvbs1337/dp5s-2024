import { Request, Response } from 'express'
import { CategoryService } from './category.service'

class CategoryController{
    async create(req: Request, res: Response){
        const category = await new CategoryService().create(req.body)
        return res.json(category)
    }

    async findById(req: Request, res: Response){
        const category = await new CategoryService().findById(req.params.id)
        return res.json(category)
    }

    async findAll(req: Request, res: Response){
        const category = await new CategoryService().findAll()
        return res.json(category)
    }

    async updateById(req: Request, res: Response){
        const category = await new CategoryService().updateById(req.params.id, req.body)
        return res.json(category)
    }
    async deleteById(req: Request, res: Response){
        const category = await new CategoryService().deleteById(req.params.id)
        return res.json(category)
    }
}

export default new CategoryController()