import app from "../app";
import { describe, it, expect } from "@jest/globals";
import categoryModel from '../src/model/category/category.schema'
import * as request from 'supertest'

describe('testando endpoints categoria', ()=>{
    it('Deve inserir uma categoria no banco',async () => {

        const categoryMock = {
            nome: "Teste categoria",
            cor: "Verde"
        }

        const response = await request.default(app).post('/categoria').send(categoryMock)
        const foundCategory = await request.default(app).get(`/categoria/${response.body._id}`)

        expect(response.status).toEqual(200)
        expect(categoryMock.nome).toBe(foundCategory?.body.nome)
        expect(categoryMock.cor).toBe(foundCategory?.body.cor)
    })

    it('Deve contar a quantidade de categorias', async () => {
        const response = await request.default(app).get('/categoria')
        const totalCategorias = await categoryModel.countDocuments()

        expect(response.status).toEqual(200)
        expect(response.body.length).toEqual(totalCategorias)
    })

    it('Deve atualizar uma categoria existente', async () => {
        const newCategoryMock = {
            nome: "Nova categoria",
            cor: "Azul"
        };

        const insertResponse = await request.default(app).post('/categoria').send(newCategoryMock);

        const updatedCategoryMock = {
            nome: "Categoria atualizada",
            cor: "Vermelho"
        };

        const updateResponse = await request.default(app).post(`/categoria/${insertResponse.body._id}`).send(updatedCategoryMock);

        const foundUpdatedCategory = await request.default(app).get(`/categoria/${insertResponse.body._id}`);
        expect(updateResponse.status).toBe(200); 
        expect(foundUpdatedCategory.status).toBe(200); 
        expect(foundUpdatedCategory.body.nome).toBe(updatedCategoryMock.nome); 
        expect(foundUpdatedCategory.body.cor).toBe(updatedCategoryMock.cor); 
    });

    it('Deve deletar uma categoria existente', async () => {
        const newCategoryMock = {
            nome: "Categoria para deletar",
            cor: "Amarelo"
        };
        const insertResponse = await request.default(app).post('/categoria').send(newCategoryMock);

        const deleteResponse = await request.default(app).delete(`/categoria/${insertResponse.body._id}`);

        const foundDeletedCategory = await categoryModel.findById(insertResponse.body._id)
        expect(deleteResponse.status).toBe(200); 
        expect(foundDeletedCategory).toBeNull; 
    });
})