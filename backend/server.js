const express = require('express')
const mysql = require('mysql2')
const cors = require('cors')


//Connect to express app
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


//middleware
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

//GET REQUEST
app.get('/employees' ,(req,res)=>{
    db.query('SELECT * FROM employees',(err ,result)=>{
        if(err){
            console.log(err)
        }else {
            res.json(result)
        }
    })
})

//UPDATE REQUEST
app.put('/employees', (req, res) => {
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

    query = query.slice(0, -2); // Elimina la última coma y espacio
    query += ' WHERE id = ?';
    params.push(id);

    db.query(query, params, (err, result) => {
        if(err){
            console.log(err)
        } else{
            res.send(result)
        }
    })
})


//DELETE REQUEST
app.delete('/employees/:id',(req ,res) =>{
    const {id} = req.params
    db.query('DELETE FROM employees WHERE id = ?',id , (err, result) =>{
       if(err){
        console.log(err)
       } else {
        res.send(result)
       }
    })
})