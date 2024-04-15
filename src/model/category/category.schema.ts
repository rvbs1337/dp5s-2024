import { Schema, model } from 'mongoose'

const categorySchema = new Schema({
    nome: String,
    cor: String,
},{
    timestamps: true,
})

export default model("category", categorySchema)