import express from "express"
import productRoutes from "./routes/product.js"
import cors from "cors"

const app = express()

app.use(express.json())
app.use(cors())

app.use("/", productRoutes)

app.listen(3000)