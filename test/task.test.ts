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

        expect(response.status).toEqual(200)
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

    it('Deve atualizar uma tarefa existente', async () => {
        const taskMock = {
            titulo: "Tarefa para atualizar",
            descricao: "Descricao da tarefa para atualizar",
            data_criacao: new Date(),
            data_conclusao: new Date(),
            tipo: "Pendente",
            categoria: 2
        };
        const insertResponse = await request.default(app).post('/tarefa').send(taskMock);

        const updatedTaskMock = {
            titulo: "Tarefa atualizada",
            descricao: "Descricao da tarefa atualizada",
            data_criacao: new Date(),
            data_conclusao: new Date(),
            tipo: "Concluída",
            categoria: 3
        };
        const updateResponse = await request.default(app).post(`/tarefa/${insertResponse.body._id}`).send(updatedTaskMock);

        const foundUpdatedTask = await taskModel.findById(insertResponse.body._id);

        expect(updateResponse.status).toBe(200);
        expect(foundUpdatedTask?.titulo).toBe(updatedTaskMock.titulo);
        expect(foundUpdatedTask?.descricao).toBe(updatedTaskMock.descricao);
        expect(foundUpdatedTask?.data_criacao).toStrictEqual(updatedTaskMock.data_criacao);
        expect(foundUpdatedTask?.data_conclusao).toStrictEqual(updatedTaskMock.data_conclusao);
        expect(foundUpdatedTask?.tipo).toBe(updatedTaskMock.tipo);
        expect(foundUpdatedTask?.categoria).toBe(updatedTaskMock.categoria);
    });

    it('Deve deletar uma tarefa existente', async () => {
        const taskMock = {
            titulo: "Tarefa para deletar",
            descricao: "Descricao da tarefa para deletar",
            data_criacao: new Date(),
            data_conclusao: new Date(),
            tipo: "Pendente",
            categoria: 4
        };
        const insertResponse = await request.default(app).post('/tarefa').send(taskMock);

        const deleteResponse = await request.default(app).delete(`/tarefa/${insertResponse.body._id}`);

        const foundDeletedTask = await taskModel.findById(insertResponse.body._id);
        expect(deleteResponse.status).toBe(200);
        expect(foundDeletedTask).toBeNull();
    });
})