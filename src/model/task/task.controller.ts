import { Request, Response } from 'express'
import { TaskService } from './task.service'

class TaskController{
    async create(req: Request, res: Response){
        const task = await new TaskService().create(req.body)
        return res.json(task)
    }

    async findById(req: Request, res: Response){
        const task = await new TaskService().findById(req.params.id)
        return res.json(task)
    }

    async findAll(req: Request, res: Response){
        const task = await new TaskService().findAll()
        return res.json(task)
    }

    async updateById(req: Request, res: Response){
        const task = await new TaskService().updateById(req.params.id, req.body)
        return res.json(task)
    }
    async deleteById(req: Request, res: Response){
        const task = await new TaskService().deleteById(req.params.id)
        return res.json(task)
    }
}

export default new TaskController()