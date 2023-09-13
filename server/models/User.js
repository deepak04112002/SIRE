const mongoose = require("mongoose");
const { ObjectId } = require('mongodb');

const UserSchema = new mongoose.Schema({
    fname: {
        type: String,
        required: true,
        trim: true,
        min: 5,
        max: 20
    },
    lname: {
        type: String,
        required: true,
        trim: true,
        min: 5,
        max: 20
    },
    email: {
        type: String,
        required: true,
        trim: true,
        unique: true,
        lowercase: true
    },
    password: {
        type: String,
        required: true
    },
    reservedCars: [{
        type: ObjectId,       
        ref: 'Car'
    }]
})

module.exports = mongoose.model("User", UserSchema);
