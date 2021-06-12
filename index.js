const express = require('express')
var mysql = require('mysql')
var cors = require('cors')
const routerUser = require('./routers/users.js')
const routerTodo = require('./routers/todos.js')
const auth = require('./middleware/auth.js')

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



app.use('/todo', auth, routerTodo)

app.use('/user', routerUser)

app.listen(3000, () => {
    console.log('server jalan di port 3000')
})