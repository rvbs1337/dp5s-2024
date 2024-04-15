import app from "../app";
import { describe, it, expect } from "@jest/globals";
import userModel from '../src/model/user/user.schema'
import * as request from 'supertest'

describe('testando endpoints usuario', ()=>{
    it('Deve inserir um usuario no banco',async () => {
        const userMock = {
            username:"rubs1337",
            peso:65,
            senha:"amandinha1234",
            email: "rubenspereira9@hotmail.com"
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