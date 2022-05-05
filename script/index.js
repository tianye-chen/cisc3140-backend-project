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

const insertJudge = `INSERT INTO Judges (Car_ids, Judge_ID, Judge_Name) VALUES(?,?,?)`;

db.all(`SELECT * FROM Cars`, [], (err, rows) => {
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

app.get("/car/add/:newCar", (req, res) => {
    const newCar = JSON.parse(req.params.newCar);
    db.run(insertCars, [
        newCar.Timestamp,
        newCar.Email,
        newCar.Name,
        parseInt(newCar.Year),
        newCar.Make,
        newCar.Model,
        parseInt(newCar.Car_ID),
        newCar.Judge_ids,
    ]);
    res.send(newCar.Car_ID);
});

app.get('/car/update/:id/:updateCar',(req,res)=>{
    const updateCar = JSON.parse(req.params.updateCar)
    const id = req.params.id

    db.run(updateCars,
        [updateCar.Timestamp,
            updateCar.Email,
            updateCar.Name,
            parseInt(updateCar.Year),
            updateCar.Make,
            updateCar.Model,
            updateCar.Judge_ids,
            id])
    res.send(updateCar)
})

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
            [id+" "],
            (err, rows) => {
                if (err) {
                    res.send("Error while displaying");
                }
                res.json(rows);
            }
        );
    });
})

app.get("/judge/add/:newJudge", (req, res) => {
    const newJudge = JSON.parse(req.params.newJudge);
    db.run(insertJudge, [
        parseInt(newJudge.Car_ids),
        newJudge.Judge_ID,
        newJudge.Judge_Name,
    ]);
    res.send(newJudge);
});

app.listen(PORT, () => {
    console.log(`PORT ${PORT}`);
});

//  db.close((err) => {
//      if (err) return console.error(err.message);
//  });