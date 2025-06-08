import express from "express";
import cors from "cors";
import path from "path";
import sequelize from "./config/db";
import reservationRoutes from "./routes/reservation.routes";
import sportRoutes from "./routes/sport.routes";
import sportLocationRoutes from "./routes/sportLocation.routes";

const app = express();
const PORT = 3000;

// Middleware
app.use(cors());
app.use(express.json());

// API Routes
app.use("/api/reservations", reservationRoutes);
app.use("/api/sports", sportRoutes);
app.use("/api/sport-locations", sportLocationRoutes);

// Cesta k Angular buildu
const frontendPath = path.join(
    __dirname,
    "../../Front-End/dist/Front-End/browser"
);

// Kontrola existence buildu
try {
    const fs = require("fs");
    if (!fs.existsSync(frontendPath)) {
        console.error(
            '❌ Angular build nebyl nalezen! Spusťte "ng build" v Front-End složce.'
        );
        console.error(`Hledaná cesta: ${frontendPath}`);
    } else {
        console.log(`✅ Serving frontend from: ${frontendPath}`);
        app.use(express.static(frontendPath));
        app.get("*", (req, res) => {
            res.sendFile(path.join(frontendPath, "index.html"));
        });
    }
} catch (error) {
    console.error("❌ Chyba při hledání Angular buildu:", error);
}

// Základní route pro případ chybějícího buildu
app.get("/", (req, res) => {
    res.send("Rezervační systém - spusťte nejdříve Angular build!");
});

// Start serveru s databází
sequelize
    .sync()
    .then(() => {
        app.listen(PORT, () => {
            console.log(`🚀 Backend běží na http://localhost:${PORT}`);
            console.log(`🌐 API dostupné na http://localhost:${PORT}/api`);
        });
    })
    .catch((error) => {
        console.error("❌ Chyba při připojování k databázi:", error);
    });
