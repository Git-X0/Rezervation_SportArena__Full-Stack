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

// Serve Angular frontend (pokud chcete servírovat přes Express)
const frontendPath = path.join(__dirname, "../../Front-End/dist/front-end");
app.use(express.static(frontendPath));
app.get("*", (req, res) => {
    res.sendFile(path.join(frontendPath, "index.html"));
});

// Start server
sequelize.sync().then(() => {
    app.listen(PORT, () => {
        console.log(`🚀 Server běží na http://localhost:${PORT}`);
        console.log(`📁 Servíruje frontend z: ${frontendPath}`);
    });
});
