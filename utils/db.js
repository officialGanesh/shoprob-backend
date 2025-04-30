import mongoose from "mongoose";
import asyncHandler from "express-async-handler"

export const connectDB = asyncHandler(async() => {
    try{

        const conn = await mongoose.connect(process.env.MONGO_URI)
        console.log(`MongoDB Connected: ${conn.connection.host}`)


    }catch(err){
        console.log(`Error while connecting DB - ${err}`)
        process.exit(1)
    }
})