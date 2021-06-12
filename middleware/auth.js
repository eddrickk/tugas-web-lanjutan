var mysql = require('mysql')
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

    const query = `SELECT * FROM users WHERE username=\'${username}\' AND password=\'${password}\'`
    connection.query(query, (err, table) => {
        if (err){
            console.error(err)
            return
        }
        if (table.length > 0){
            next()
        }
        else{
            res.send(401)
        }
    })
}