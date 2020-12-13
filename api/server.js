const express = require('express');
const actionsRouter = require("./actions/actions-router")
const projectsRouter = require("./projects/projects-router")

const server = express();

server.use(express.json())

server.use("/api/actions", actionsRouter)
server.use("/api/projects", projectsRouter)
// Complete your server here!
// Do NOT `server.listen()` inside this file!
server.get('/', (req, res, next) => {
    res.status(200).json({
        message: "The server is up and running."
    })

    next()
})

server.use((err, req, res, next) => {
    console.log(err)

    res.status(500).json({
        message: "Something went wrong, please try again later."
    })

    next()
})

module.exports = server;
