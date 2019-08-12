const express = require('express')
const userRoutes = require("./routers/userRoutes")
const morgan = require("morgan")


const server = express();
server.use(morgan("dev"))
server.use(express.json())
server.use("/users", userRoutes)


const port = 5000;
server.listen(port, () => console.log('api is running, listening on port 5000'));