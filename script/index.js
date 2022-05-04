const sqlite3 = require("sqlite3").verbose();

const db = new sqlite3.Database("./lab2.db", sqlite3.OPEN_READWRITE, (err) => {
    if (err) return console.error(err.message);
    console.log("No errors");
});

const insert = `INSERT INTO Cars(Timestamp, Email, Name, Year, Make, Model, Car_ID, Judge_ids)
                VALUES(?,?,?,?,?,?,?,?)`;

const displayCars = `SELECT * FROM Cars`;

db.all(displayCars, [], (err, rows) => {
    if (err) return console.error(err.message);

    rows.forEach((row) => {
        console.log(row);
    });
});

db.close((err) => {
    if (err) return console.error(err.message);
});