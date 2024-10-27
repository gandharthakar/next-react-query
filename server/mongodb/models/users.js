const mongoose = require("mongoose");
const { Schema, models, model } = mongoose;

const usersSchema = new Schema({
    user_full_name: {
        type: String,
        required: true,
        unique: true,
    },
    user_gender: {
        type: String,
        required: true
    },
}, {
    timestamps: true
});

const UserModel = models.users || model('users', usersSchema);

module.exports = UserModel;