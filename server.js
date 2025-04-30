import express from "express"
import { config } from "dotenv"
import userRouter from "./routes/userRoute.js"
import { connectDB } from "./utils/db.js"
import errorHandler from "./middleware/errorMiddleware.js"

config()

const PORT = process.env.PORT || 8000

connectDB()

const app = express()


// Middleware
app.use(express.json())
app.use(express.urlencoded({ extended: false }))




// routes
app.use("/api/users", userRouter)



app.use(errorHandler)

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`)
})