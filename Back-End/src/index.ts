import express from "express";
import { sequelize } from "./models/index";

const app = express();
const PORT = 3000;

app.use(express.json());

// Testovací route
app.get("/", (req, res) => {
    res.send("Backend funguje!");
});

// Synchronizace DB a start serveru
sequelize.sync().then(() => {
    app.listen(PORT, () => {
        console.log(`Server běží na http://localhost:${PORT}`);
    });
});
