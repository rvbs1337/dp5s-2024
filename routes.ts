import { Router } from 'express'
import UserController from './src/model/user/user.controller'
import TaskController from './src/model/task/task.controller'
import CategoryController from './src/model/category/category.controller'

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

routes.post('/categoria', CategoryController.create)
routes.post('/categoria/:id', CategoryController.updateById)
routes.get('/categoria', CategoryController.findAll)
routes.get('/categoria/:id', CategoryController.findById)
routes.delete('/categoria/:id', CategoryController.deleteById)

export{
    routes
}