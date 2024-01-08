import mongoose from 'mongoose'
import dotenv from 'dotenv'

dotenv.config()

const userSchema = new mongoose.Schema({
    userName: {type: String, required: true, minlength: 3, maxlength: 30},
    userPassword: {type: String, required: true, minlength: 3, maxlength: 1024}
}, {
    timestamps:true,
})

export const userModel = mongoose.model("User", userSchema)

const uri = process.env.MONGO_URI || 'Error uri database'

export const mongoConnection = mongoose
    .connect(uri)
    .then(() => console.log('MongoDB connection established'))
    .catch((error) => console.log('MongoDB connection  failed: ', error.message))
    