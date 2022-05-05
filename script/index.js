const express = require('express')
const app = express()
const PORT = 8080
const sqlite3 = require("sqlite3").verbose();

const db = new sqlite3.Database("./lab2.db", sqlite3.OPEN_READWRITE, (err) => {
    if (err) return console.error(err.message);
    console.log("Successfully opened database");
});

const insertCars = `INSERT INTO Cars(Timestamp, Email, Name, Year, Make, Model, Car_ID, Judge_ids)
                VALUES(?,?,?,?,?,?,?,?)`;

const updateCars = `UPDATE Cars SET Timestamp = ?, Email = ?, Name = ?, Year = ?, Make = ?, Model = ?, Judge_ids = ? WHERE car_id = ?`;

db.all(`SELECT * FROM Judges`, [], (err, rows) => {
    if (err) return console.error(err.message);

    console.log(rows[0]);
});

app.get("/car", (req, res) => {
    db.serialize(() => {
        db.all(`SELECT * FROM Cars ORDER BY Car_ID`,[],(err, rows) => {
                if (err) {
                    res.send("Error while displaying");
                }
                res.json(rows);
            }
        );
    });
});

app.get("/car/:id", (req, res) => {
    const id = req.params.id
    db.serialize(() => {
        db.each(
            "SELECT * FROM Cars WHERE Car_ID = ?",
            [id],
            (err, rows) => {
                if (err) {
                    res.send("Error while displaying");
                }
                res.json(rows);
            }
        );
    });
});

app.get('/judge',(req,res) => {
    db.serialize(()=>{
        db.all(`SELECT * FROM Judges ORDER BY Judge_ID`,[],(err,rows)=>{
            if(err) 
                res.send("Error while displaying judge")
            res.json(rows)
        })
    })
})

app.get('/judge/:id',(req,res)=>{
    const id = req.params.id
    db.serialize(() => {
        db.each(
            "SELECT * FROM Judges WHERE Judge_ID = ?",
            [id],
            (err, rows) => {
                if (err) {
                    res.send("Error while displaying");
                }
                res.json(rows);
            }
        );
    });
})

app.listen(PORT, () => {
    console.log(`PORT ${PORT}`);
});

//  db.close((err) => {
//      if (err) return console.error(err.message);
//  });