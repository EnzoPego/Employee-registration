const express = require('express')
const mysql = require('mysql2')
const cors = require('cors')


//connect to express app
const app = express()



const db = mysql.createConnection({
    user: 'root',
    host: 'localhost',
    password: 'enzzomysql',
    database: 'employee_info',
});



app.listen(3001, ()=>{
    console.log('server is running on port 3001')
})


//muddleware
app.use(express.json())
app.use(cors())


//Routes
//POST REQUEST
app.post('/create',(req,res)=>{
    const {name, age} = req.body
    db.query(
        'INSERT INTO employees (name,age) VALUES (?,?)',
        [name, age],
        (err, result)=>{
            if(err) {
                console.log('values where successfully inserted')
            } else {
                res.send('The values where successfuly inserted')
            }
        }
    )
}) 

