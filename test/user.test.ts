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

    it('Deve atualizar um usuario existente', async () => {
        const userMock = {
            username: "usuario_teste",
            peso: 70,
            senha: "senha_teste",
            email: "usuario_teste@example.com"
        };
        const insertResponse = await request.default(app).post('/usuario').send(userMock);

        const updatedUserMock = {
            username: "usuario_atualizado",
            peso: 75,
            senha: "nova_senha",
            email: "usuario_atualizado@example.com"
        };
        const updateResponse = await request.default(app).post(`/usuario/${insertResponse.body._id}`).send(updatedUserMock);

        const foundUpdatedUser = await userModel.findById(insertResponse.body._id);
        expect(updateResponse.status).toBe(200);
        expect(foundUpdatedUser?.username).toBe(updatedUserMock.username);
        expect(foundUpdatedUser?.peso).toBe(updatedUserMock.peso);
        expect(foundUpdatedUser?.senha).toBe(updatedUserMock.senha);
        expect(foundUpdatedUser?.email).toBe(updatedUserMock.email);
    });

    it('Deve deletar um usuario existente', async () => {
        const userMock = {
            username: "usuario_para_deletar",
            peso: 80,
            senha: "senha_deletar",
            email: "usuario_deletar@example.com"
        };
        const insertResponse = await request.default(app).post('/usuario').send(userMock);

        const deleteResponse = await request.default(app).delete(`/usuario/${insertResponse.body._id}`);

        const foundDeletedUser = await userModel.findById(insertResponse.body._id);
        expect(deleteResponse.status).toBe(200);
        expect(foundDeletedUser).toBeNull();
    });
})