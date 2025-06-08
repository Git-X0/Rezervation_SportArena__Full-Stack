import express from "express";
import sequelize from "../config/db";
import reservationRoutes from "./reservation.routes";

const app = express();
const PORT = 3000;

app.use(express.json());
app.use("/api/reservations", reservationRoutes);

sequelize.sync().then(() => {
    app.listen(PORT, () => {
        console.log(`Server běží na http://localhost:${PORT}`);
    });
});
