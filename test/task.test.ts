import app from "../app";
import { describe, it, expect } from "@jest/globals";
import taskModel from '../src/model/task/task.schema'
import * as request from 'supertest'

describe('testando endpoints tarefas', ()=>{
    it('Deve inserir uma tarefa no banco',async () => {
        const dataCriacao = new Date();
        const dataConclusao = new Date(dataCriacao);
        dataConclusao.setDate(dataCriacao.getDate() + 10);

        const taskMock = {
            titulo: "Tarefa teste 1",
            descricao: "teste de insercao 1",
            data_criacao: dataCriacao,
            data_conclusao: dataConclusao,
            tipo: "Concluida",
            categoria: 1
        }

        const response = await request.default(app).post('/tarefa').send(taskMock)
        const foundTask = await taskModel.findById(response.body._id)

        expect(taskMock.titulo).toBe(foundTask?.titulo)
        expect(taskMock.descricao).toBe(foundTask?.descricao)
        expect(taskMock.data_criacao).toStrictEqual(foundTask?.data_criacao)
        expect(taskMock.data_conclusao).toStrictEqual(foundTask?.data_conclusao)
        expect(taskMock.tipo).toBe(foundTask?.tipo)
        expect(taskMock.categoria).toBe(foundTask?.categoria)
    })

    it('Deve contar a quantidade de tarefas', async () => {
        const response = await request.default(app).get('/tarefa')
        const totalTarefas = await taskModel.countDocuments()

        expect(response.status).toEqual(200)
        expect(response.body.length).toEqual(totalTarefas)
    })
})