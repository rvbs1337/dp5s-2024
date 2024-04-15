import app from "../app";
import { describe, it, expect } from "@jest/globals";
import taskModel from '../src/model/task/task.schema'
import * as request from 'supertest'

describe('testando endpoints tarefas', ()=>{
    it('Deve inserir uma tarefa no banco',async () => {
        const taskMock = {
            titulo: "Tarefa teste 1",
            descricao: "teste de insercao 1",
            data_criacao: new Date(),
            data_conclusao: new Date()+30,
            tipo: ,
            categoria: 
        }

        const response = await request.default(app).post('/usuario').send(userMock)
        const foundUser = await userModel.findById(response.body._id)

        expect(userMock.username).toBe(foundUser?.username)
        expect(userMock.peso).toBe(foundUser?.peso)
        expect(userMock.senha).toBe(foundUser?.senha)
        expect(userMock.email).toBe(foundUser?.email)
    })

    it('Deve contar a quantidade de usuarios', async () => {
        const response = await request.default(app).get('/usuario')
        const totalUsuarios = await userModel.countDocuments()

        expect(response.status).toEqual(200)
        expect(response.body.length).toEqual(totalUsuarios)
    })
})