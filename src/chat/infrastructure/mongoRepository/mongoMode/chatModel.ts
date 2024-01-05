import mongoose from 'mongoose'

const userSchema = new mongoose.Schema({
    userName: {type: String, required: true, minlength: 3, maxlength: 30},
    userPassword: {type: String, required: true, minlength: 3, maxlength: 1024}
}, {
    timestamps:true,
})

export const userModel = mongoose.model("User", userSchema)
