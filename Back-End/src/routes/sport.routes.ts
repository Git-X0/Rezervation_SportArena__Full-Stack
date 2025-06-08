import express from "express";
import Sport from "../models/sport.model";

const router = express.Router();

// GET všech sportů (READ)
router.get("/", async (req, res) => {
    try {
        const sports = await Sport.findAll();
        res.json(sports);
    } catch (error) {
        res.status(500).json({ error: "Chyba při načítání sportů" });
    }
});

// GET jednoho sportu (READ)
router.get("/:id", async (req, res) => {
    try {
        const sport = await Sport.findByPk(req.params.id);
        if (!sport) return res.status(404).json({ error: "Sport nenalezen" });
        res.json(sport);
    } catch (error) {
        res.status(500).json({ error: "Chyba při načítání sportu" });
    }
});

export default router;
