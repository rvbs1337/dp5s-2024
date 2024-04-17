import { Schema, model } from 'mongoose'

const taskSchema = new Schema({
    titulo: String,
    descricao: String,
    data_criacao: Date,
    data_conclusao: Date,
    tipo: String,
    categoria: Number,
    status: String,
    user: String
},{
    timestamps: true,
})

export default model("task", taskSchema)