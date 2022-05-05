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

const displayCars = `SELECT * FROM Cars`;

db.all(displayCars, [], (err, rows) => {
    if (err) return console.error(err.message);

    console.log(rows[0]);
});

app.listen(PORT, () => {
    console.log(`PORT ${PORT}`);
});

app.get("/", (req, res) => {
    db.serialize(() => {
        db.each(
            "SELECT name NAME FROM Cars WHERE Car_ID = ?",
            [1],
            (err, rows) => {
                if (err) {
                    res.send("Error while displaying");
                }
                res.json(rows);
            }
        );
    });
});

app.get("/all", (req, res) => {
    db.serialize(() => {
        db.all(displayCars,[],(err, rows) => {
                if (err) {
                    res.send("Error while displaying");
                }
                res.json(rows);
            }
        );
    });
});

/*
db.close((err) => {
    if (err) return console.error(err.message);
});*/