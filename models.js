import mongoose from "mongoose";

const schema = new mongoose.Schema({
    user: {
        type: String,
        require: true,
        unique: true
    },

    username: {
        type: String,
        require: true,
        unique: true
    },

    job: {
        type: String,
        require: true
    },

    balance: {
        type: Number,
        default: 10
    },
    indicator: {
        type: Boolean,
        default: true
    },
    time: {
        type: Number,
        default: 3600000
    },
    roleBool: {
        type: Boolean,
        default: true
    }
})

const model = mongoose.model("game", schema);

export default model;