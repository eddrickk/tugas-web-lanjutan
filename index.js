const express = require('express')
var mysql = require('mysql')
var cors = require('cors')

const corsOptions ={
    origin:'*',
    methods: "GET,HEAD,PUT,PATCH,POST,DELETE",
    credentials:true,            //access-control-allow-credentials:true
    optionSuccessStatus:200
}

const app = express()

app.use(cors(corsOptions))
app.use(express.json())
app.use(express.urlencoded())

const routerUser = require('./routers/users.js')
const routerTodo = require('./routers/todos.js')

app.use(routerTodo)

app.use(routerUser)

app.listen(3000, () => {
    console.log('server jalan di port 3000')
})