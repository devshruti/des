const express = require("express")
const { userRouter } = require("./router/userRouter")
const { productRouter } = require("./router/productRouter")
const { authMiddleware } = require("./middleware/authenticate")
const { connectedDB } = require("./db")

const app = express()
require("dotenv").config()



app.use(express.json())
app.use(express.urlencoded({ extended: true }));

app.get("/", async (req, res) => {
    try {
        res.send("Home-Page")
    }
    catch (error) {
        console.log(`Error:${error}`)
    }
})

app.use("/user", userRouter)
app.use(authMiddleware)
app.use("/product", productRouter)


/* listen the server code present here */
const port = process.env.port || 5000
app.listen(port, async () => {
    try {
        //connected db
        await connectedDB
        console.log("Database connected Successfully")
    }
    catch (err) {
        console.log(err.message)
    }
    console.log(`server is running on port ${port}`)
})
