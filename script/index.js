const express = require('express')
const app = express()
const PORT = 8080
const sqlite3 = require("sqlite3").verbose();

const db = new sqlite3.Database("./lab2.db", sqlite3.OPEN_READWRITE, (err) => {
    if (err) return console.error(err.message);
    console.log("No errors");
});

const insertCars = `INSERT INTO Cars(Timestamp, Email, Name, Year, Make, Model, Car_ID, Judge_ids)
                VALUES(?,?,?,?,?,?,?,?)`;

const updateCars = `UPDATE Cars SET Timestamp = ?, Email = ?, Name = ?, Year = ?, Make = ?, Model = ?, Judge_ids = ? WHERE car_id = ?`;

const displayCars = `SELECT * FROM Cars`;

db.all(displayCars, [], (err, rows) => {
    if (err) return console.error(err.message);

    rows.forEach((row) => {
        console.log(row);
    });
});

app.listen(PORT,()=>{
        console.log(`PORT ${PORT}`)
    })

app.get('/', (req, res) => {
    db.serialize(()=>{
        db.each(displayCars,(err,row)=>{
            if(err){
                res.send("Error while displaying")
            }
            res.send(`Timestamp: ${row.Timestamp}`)
        })
    })
});

db.close((err) => {
    if (err) return console.error(err.message);
});