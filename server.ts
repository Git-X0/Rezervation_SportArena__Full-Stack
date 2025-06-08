import express from "express";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();
const app = express();
app.use(express.json());

// CRUD pro rezervace
app.get("/api/reservations", async (req, res) => {
    const reservations = await prisma.reservation.findMany();
    res.json(reservations);
});

app.post("/api/reservations", async (req, res) => {
    const { date, userEmail, placeId } = req.body;
    const reservation = await prisma.reservation.create({
        data: { date: new Date(date), userEmail, placeId },
    });
    res.json(reservation);
});

// Přidej další CRUD operace (PUT, DELETE, GET by ID)

app.listen(3000, () => console.log("Server běží na http://localhost:3000"));

export default app;
