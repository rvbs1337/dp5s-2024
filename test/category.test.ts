import app from "../app";
import { describe, it, expect } from "@jest/globals";
import categoryModel from '../src/model/category/category.schema'
import * as request from 'supertest'

describe('testando endpoints categoria', ()=>{
    it('Deve inserir uma categoria no banco',async () => {

        const categoryMock = {
            nome: "Teste categoria",
            cor: "Vermelho"
        }

        const response = await request.default(app).post('/categoria').send(categoryMock)
        const foundCategory = await request.default(app).get(`/categoria/${response.body._id}`)

        expect(categoryMock.nome).toBe(foundCategory?.body.nome)
        expect(categoryMock.cor).toBe(foundCategory?.body.cor)
    })

    it('Deve contar a quantidade de categorias', async () => {
        const response = await request.default(app).get('/categoria')
        const totalCategorias = await categoryModel.countDocuments()

        expect(response.status).toEqual(200)
        expect(response.body.length).toEqual(totalCategorias)
    })
})