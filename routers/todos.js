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

router.get('/', function (req, res) {
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

router.post('/', function (req, res) {
    console.log('Got body:', req.body)
    connection.query(`INSERT INTO item (description) VALUES (\'${req.body.description}\')`, function (err, rows, fields) {
        if (err) throw err
      
        console.log('Data insert successful')
      })
    
    res.sendStatus(200)
})

router.get('/todos', function (req, res) {
    const query = 'SELECT * FROM item'
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

router.delete('/:id', function(req, res){
    const query = `DELETE FROM item WHERE id=\'${req.params.id}\'`
    connection.query(query, (err, table) => {
        if (err){
            console.error(err)
            return
        }
        res.send("Berhasil dihapus")
    })
})

module.exports = router