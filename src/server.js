import connectMongoDB from "./config/mongooseConfig.js"
connectMongoDB()

import express from "express"
import cors from 'cors'
import quoteRouter from "./routes/quoteRoute.js"
import authRouter from "./routes/authRoute.js"
import groupRouter from "./routes/groupRouter.js"
import userRouter from "./routes/userRoute.js"

const app = express()

app.use(cors())
app.use(express.json())

app.get("/api/ping", (req, res) => {
        res.send(
            {
                ok: true,
                message: 'pong'
            }
        )
    }
)

app.use("/api/auth", authRouter)
app.use("/api/quotes", quoteRouter)
app.use("/api/groups", groupRouter)
app.use("/api/user", userRouter)

app.listen(
    8080, 
    () => {
        console.log("Esto esta funcionado")
    }
)

