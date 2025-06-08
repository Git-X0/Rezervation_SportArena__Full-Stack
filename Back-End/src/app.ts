import express from "express";
import reservationRoutes from "./routes/reservation.routes";
import sportRoutes from "./routes/sport.routes";
import sportLocationRoutes from "./routes/sportLocation.routes";

const app = express();
app.use(express.json());

app.use("/api/reservations", reservationRoutes);
app.use("/api/sports", sportRoutes);
app.use("/api/sport-locations", sportLocationRoutes);

export default app;
