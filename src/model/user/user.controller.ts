import { Request, Response } from 'express'
import { UserService } from './user.service'

class UserController{
    async create(req: Request, res: Response){
        const user = await new UserService().create(req.body)
        return res.json(user)
    }

    async findById(req: Request, res: Response){
        const user = await new UserService().findById(req.params.id)
        return res.json(user)
    }

    async findAll(req: Request, res: Response){
        const user = await new UserService().findAll()
        return res.json(user)
    }

    async updateById(req: Request, res: Response){
        const user = await new UserService().updateById(req.params.id, req.body)
        return res.json(user)
    }
    
    async deleteById(req: Request, res: Response){
        const user = await new UserService().deleteById(req.params.id)
        return res.json(user)
    }
}

export default new UserController()