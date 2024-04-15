import { Router } from 'express'
import UserController from './src/model/user/user.controller'
import TaskController from './src/model/task/task.controller'

const routes = Router()
routes.post('/usuario', UserController.create)
routes.post('/usuario/:id', UserController.updateById)
routes.get('/usuario', UserController.findAll)
routes.get('/usuario/:id', UserController.findById)
routes.delete('/usuario/:id', UserController.deleteById)

routes.post('/tarefa', TaskController.create)
routes.post('/tarefa/:id', TaskController.updateById)
routes.get('/tarefa', TaskController.findAll)
routes.get('/tarefa/:id', TaskController.findById)
routes.delete('/tarefa/:id', TaskController.deleteById)

export{
    routes
}