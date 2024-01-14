const express = require('express')
const mysql = require('mysql2/promise')
const cors = require('cors')

//Connect to express app
const app = express()


const db = mysql.createPool({
    user: 'root',
    host: 'localhost',
    password: 'enzzomysql',
    database: 'employee_info',
});


app.listen(3001, ()=>{
    console.log('server is running on port 3001')
})


//middleware
app.use(express.json())
app.use(cors())


//POST REQUEST
app.post('/create', async (req,res)=>{
    const {name, age} = req.body
    try {
        const result = await db.query(
            'INSERT INTO employees (name,age) VALUES (?,?)',
            [name, age]
        )
        res.send('The values were successfully inserted')
    } catch (err) {
        console.log(err)
    }
})


//GET REQUEST
app.get('/employees', async (req,res)=>{
    try {
        const [rows, fields] = await db.query('SELECT * FROM employees')
        res.json(rows)
    } catch (err) {
        console.log(err)
    }
})

//UPDATE REQUEST
app.put('/employees', async (req, res) => {
    const {name, age, id} = req.body;
    let query = 'UPDATE employees SET ';
    let params = [];

    if (name !== undefined) {
        query += 'name = ?, ';
        params.push(name);
    }

    if (age !== undefined) {
        query += 'age = ?, ';
        params.push(age);
    }

     query = query.slice(0, -2); 
     query += ' WHERE id = ?';
     params.push(id);

    try {
        const result = await db.query(query, params)
        res.send(result)
    } catch (err) {
        console.log(err)
    }
})


//DELETE REQUEST
app.delete('/employees/:id', async (req ,res) =>{
    const {id} = req.params
    try {
        const result = await db.query('DELETE FROM employees WHERE id = ?', id)
        res.send(result)
    } catch (err) {
        console.log(err)
    }
})