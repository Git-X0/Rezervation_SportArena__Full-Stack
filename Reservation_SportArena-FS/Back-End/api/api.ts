express = require(`express`);
let db = require(`../database/db.ts`);

const router = express.Router();

router.get(`/reservations`, (req, res) => {
    db.all(`SELECT * FROM reservations`, [], (err, rows) => {
        if (err) {
            res.status(500).json({ error: err.message });
            return;
        }
        res.json(rows);
    });
});

router.post(`/reservations`, (req, res) => {
    const { name, date, time } = req.body;
    db.run(
        `INSERT INTO reservations (name, date_begin, time_begin, time) VALUES (?, ?, ?, ?, ?)`,
        [name, date, time],
        function (err) {
            if (err) {
                res.status(500).json({ error: err.message });
                return;
            }
            res.json({ id: this.lastID });
        }
    );
});

module.exports = router;
