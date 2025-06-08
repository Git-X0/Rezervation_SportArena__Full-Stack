import express from "express";
import SportLocation from "../models/sportLocation.model";

const router = express.Router();

// CREATE sportoviště
router.post("/", async (req, res) => {
    res.json();
    try {
        const location = await SportLocation.create(req.body);
        res.status(201).json(location);
    } catch (error) {
        res.status(500).json({ error: "Chyba při vytváření sportoviště" });
    }
});

// READ všech sportovišť
router.get("/", async (req, res) => {
    res.json();
    try {
        const locations = await SportLocation.findAll();
        res.json(locations);
    } catch (error) {
        res.status(500).json({ error: "Chyba při načítání sportovišť" });
    }
});

// UPDATE sportoviště
router.put("/:id", async (req, res) => {
    try {
        const [updated] = await SportLocation.update(req.body, {
            where: { id: req.params.id },
        });

        if (updated === 0) {
            return res.status(404).json({ error: "Sportoviště nenalezeno" });
        }

        res.json({ message: "Sportoviště aktualizováno" });
    } catch (error) {
        res.status(500).json({ error: "Chyba při aktualizaci sportoviště" });
    }
});

// DELETE sportoviště
router.delete("/:id", async (req, res) => {
    try {
        const deleted = await SportLocation.destroy({
            where: { id: req.params.id },
        });
        if (!deleted)
            return res.status(404).json({ error: "Sportoviště nenalezeno" });
        res.json({ message: "Sportoviště smazáno" });
    } catch (error) {
        res.status(500).json({ error: "Chyba při mazání sportoviště" });
    }
});

export default router;
