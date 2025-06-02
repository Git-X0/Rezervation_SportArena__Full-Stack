const sqlite3 = require("sqlite3").verbose();
let fs = require("fs");
path = require("path");

db = new sqlite3.Database(path.join(__dirname, "database.sqlite"));

const schema = fs.readFileSync(path.join(__dirname, "schema.sql"), "utf8");
db.exec(schema, (err) => {
    if (err) console.error("Error initializing schema:", err.message);
    else console.log("Database schema loaded.");
});

module.exports = db;
