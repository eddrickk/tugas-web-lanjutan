const express = require('express')
var mysql = require('mysql')
const router = express.Router()

router.use(express.json())
router.use(express.urlencoded())

var connection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '',
    database: 'todo_development'
  })

connection.connect()

router.get('/user', function (req, res) {
    res.send(`
        <html>
            <form action="/user" method="POST">
                <label>Username</label>
                <input name = "username"></input>
                <label>Password</label>
                <input name = "password" type = "password"></input>
                <button>Submit</button>
            </form>
        </html>
    `)
})

router.post('/user', function (req, res) {
    console.log('Got body:', req.body)
    connection.query(`INSERT INTO users (username, password) VALUES (\'${req.body.username}\', \'${req.body.password}\')`, function (err, rows, fields) {
        if (err) throw err
      
        console.log('Data insert successful')
      })
    
    res.sendStatus(200)
})

router.get('/users', function (req, res) {
    const query = 'SELECT * FROM users'
    connection.query(query, (err, table) => {
        if (err){
            console.error(err)
            return
        }
        for (let row of table){
            console.log(row.id)
        }

        res.json(table)
    })
})

router.delete('/user/:id', function(req, res){
    const query = `DELETE FROM users WHERE id=\'${req.params.id}\'`
    connection.query(query, (err, table) => {
        if (err){
            console.error(err)
            return
        }
        res.send("Berhasil dihapus")
    })
})

module.exports = router