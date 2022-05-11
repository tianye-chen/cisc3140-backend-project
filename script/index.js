const express = require("express");
const res = require("express/lib/response");
const app = express();
const PORT = 8080;
const sqlite3 = require("sqlite3").verbose();

const db = new sqlite3.Database("./lab2.db", sqlite3.OPEN_READWRITE, (err) => {
    if (err) return console.error(err.message);
    console.log("Successfully opened database");
});

const insertCars = `INSERT INTO Cars(Timestamp, Email, Name, Year, Make, Model, Car_ID, Judge_ids)
                VALUES(?,?,?,?,?,?,?,?)`;

const updateCars = `UPDATE Cars SET Timestamp = ?, Email = ?, Name = ?, Year = ?, Make = ?, Model = ?, Judge_ids = ? WHERE Car_ID = ?`;

const updateJudges = `UPDATE Judges SET Judge_ID = ?, Judge_Name = ?, Car_Judged = ?, Start_Time = ?, End_Time = ?, Mins_Spent = ?, Avg_Spd = ? WHERE Car_ids = ?`;

const insertJudge = `INSERT INTO Judges (Car_ids, Judge_ID, Judge_Name, Car_Judged, Start_Time, End_Time, Mins_Spent, Avg_Spd) VALUES(?,?,?,?,?,?,?,?)`;

// Display all cars
app.get("/car", (req, res) => {
    db.serialize(() => {
        db.all(`SELECT * FROM Cars ORDER BY Car_ID`, [], (err, rows) => {
            if (err) {
                res.send("Error while displaying");
            }
            res.json(rows);
        });
    });
});

// Search car by id
app.get("/car/:id", (req, res) => {
    const id = req.params.id;
    db.serialize(() => {
        db.each("SELECT * FROM Cars WHERE Car_ID = ?", [id], (err, rows) => {
            if (err) {
                res.send("Error while displaying");
            }
            res.json(rows);
        });
    });
});

// Add car by JSON
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

// Add car by params
app.get(
    "/car/add/:Timestamp/:Email/:Name/:Year/:Make/:Model/:Car_ID/:Judge_ids",
    (req, res) => {
        db.run(insertCars, [
            req.params.Timestamp,
            req.params.Email,
            req.params.Name,
            req.params.Year,
            req.params.Make,
            req.params.Model,
            req.params.Car_ID,
            req.params.Judge_ids,
        ]);
        res.send(req.params.Car_ID);
    }
);

// Add car by query, params must be in array
app.get("/car/add/:query/:param", (req, res) => {
    db.run(req.params.query, req.params.param);
    res.send(req.params.query + " " + param);
});

// Update car by JSON
app.get("/car/update/:id/:updateCar", (req, res) => {
    const updateCar = JSON.parse(req.params.updateCar);
    const id = req.params.id;

    db.run(updateCars, [
        updateCar.Timestamp,
        updateCar.Email,
        updateCar.Name,
        parseInt(updateCar.Year),
        updateCar.Make,
        updateCar.Model,
        updateCar.Judge_ids,
        parseInt(id),
    ]);
    res.send(updateCar);
});

// Update car by params
app.get(
    "/car/update/:Car_ID/:Timestamp/:Email/:Name/:Year/:Make/:Model/:Judge_ids",
    (req, res) => {
        db.run(updateCars, [
            req.params.Timestamp,
            req.params.Email,
            req.params.Name,
            parseInt(req.params.Year),
            req.params.Make,
            req.params.Model,
            req.params.Judge_ids,
            parseInt(req.params.Car_ID),
        ]);
        res.send(req.params.Car_ID);
    }
);

// Add car by query, params must be in array
app.get("/car/update/:query/:param", (req, res) => {
    db.run(req.params.query, req.params.param);
    res.send(req.params.query + " " + param);
});

// Display all judges
app.get("/judge", (req, res) => {
    db.serialize(() => {
        db.all(`SELECT * FROM Judges ORDER BY Judge_ID`, [], (err, rows) => {
            if (err) res.send("Error while displaying judge");
            res.json(rows);
        });
    });
});

// Search judge by id
app.get("/judge/:id", (req, res) => {
    const id = req.params.id;
    db.serialize(() => {
<<<<<<< HEAD
        db.each("SELECT * FROM Judges WHERE Car_ids = ?", [id], (err, rows) => {
            if (err) {
                res.send("Error while displaying");
=======
        db.each(
            "SELECT * FROM Judges WHERE Car_ids = ?",
            [id],
            (err, rows) => {
                if (err) {
                    res.send("Error while displaying");
                }
                try {
                    res.json(rows);
                } catch (err) {}
>>>>>>> 2d0a3c8e45c7f58fb39aa2b52539f54c6b3b0041
            }
            try {
                res.json(rows);
            } catch (err) {}
        });
    });
});

// Add judge by JSON
app.get("/judge/add/:newJudge", (req, res) => {
    const newJudge = JSON.parse(req.params.newJudge);
    db.run(insertJudge, [
        parseInt(newJudge.Car_ids),
        newJudge.Judge_ID,
        newJudge.Judge_Name,
    ]);
    res.send(newJudge);
});

// Add judge by params
app.get(
    "/judge/add/:Car_ids/:Judge_ID/:Judge_Name/:CarsJudged/:starttime/:endtime/:minspent/:avgspd",
    (req, res) => {
        db.run(insertJudge, [
            parseInt(req.params.Car_ids),
            req.params.Judge_ID,
            req.params.Judge_Name,
            req.params.CarsJudged,
            req.params.starttime,
            req.params.minspent,
            req.params.avgspd,
        ]);
        res.send(req.params.Judge_ID);
    }
);

// Add judge by query, param must be array
app.get("/judge/add/query/param", (req, res) => {
    db.run(req.params.query, req.params.param);
    res.send(req.params.query + " " + param);
});

// Update judge by JSON
app.get("/judge/update/:id/:updateJudge", (req, res) => {
    const updateJudge = JSON.parse(req.params.updateJudge);
    const id = req.params.id;

    db.run(updateJudges, [updateJudge.Car_ids, updateJudge.Judge_Name, id]);
    res.send(updateJudge);
});

// Update judge by params
app.get(
    "/judge/update/:Car_ids/:Judge_ID/:Judge_Name/:CarsJudged/:starttime/:endtime/:minspent/:avgspd",
    (req, res) => {
        db.run(updateJudges, [
            req.params.Judge_ID,
            req.params.Judge_Name,
            req.params.CarsJudged,
            req.params.starttime,
            req.params.minspent,
            req.params.avgspd,
            req.params.Car_ids,
        ]);
        res.send(req.params.Judge_ID);
    }
);

// Update judge by query, params must be array
app.get("/judge/update/query/param", (req, res) => {
    db.run(req.params.query, req.params.param);
    res.send(req.params.query + " " + param);
});

app.listen(PORT, () => {
    console.log(`PORT ${PORT}`);
});

app.get("/close", (req, res) => {
    db.close((err) => {
        if (err) return console.error(err.message);
    });
    console.log("Database successfully closed");
});
