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

var connection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '',
    database: 'todo_development'
  })

connection.connect()
app.get('/', function (req, res) {
    res.send(`
        <html>
            <form action="/todo" method="POST">
                <label>Description</label>
                <input name = "description"></input>
                <button>Submit</button>
            </form>
        </html>
    `)
})

app.post('/todo', function (req, res) {
    console.log('Got body:', req.body)
    connection.query(`INSERT INTO item (description) VALUES (\'${req.body.description}\')`, function (err, rows, fields) {
        if (err) throw err
      
        console.log('Data insert successful')
      })
    
    res.sendStatus(200)
})

app.get('/todo', function (req, res) {
    const query = 'SELECT * FROM item'
    connection.query(query, (err, table) => {
        if (err){
            console.error(err)
            return
        }
        for (let row of table){
            console.log(row.id)
        }

        res.send(table)
    })
})

app.listen(3000, () => {
    console.log('server jalan di port 3000')
})