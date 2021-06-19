var mysql = require('mysql')
const bcrypt = require('bcrypt')

var connection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '',
    database: 'todo_development'
  })

connection.connect()

module.exports = function (req, res, next) {
    const username = req.headers.username
    const password = req.headers.password

    const query = `SELECT * FROM users WHERE username=\'${username}\'`
    connection.query(query, async (err, table) => {
        if (err){
            console.error(err)
            return
        }
        if (table.length > 0){
            const compResult = await bcrypt.compare(password, table[0].password)
            if (compResult){
                next()
            }
            else{
                res.send(401)
            }
        }
        else{
            res.send(401)
        }
    })
}