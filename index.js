const express = require('express')

const app = express()

app.use(express.json())
app.use(express.urlencoded())

app.get('/', function (req, res) {
    res.send(`
        <html>
            <form action="/todo" method="POST">
                <label>nama</label>
                <input name = "description"></input>
                <button>lanjut</lanjut>
            </form>
        </html>
    `)
})

app.post('/todo', function (req, res) {
    console.log('Got body:', req.body)
})

app.listen(3000, () => {
    console.log('server jalan di port 3000')
})