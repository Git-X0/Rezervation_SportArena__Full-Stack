import { Request, Response } from "express";
import express from "express";
import SportLocation from "../models/sportLocation.model";

const app = express();
const router = express.Router();

app.use((err: Error, req: Request, res: Response, next: Function) => {
    console.error("❌ Unhandled error:", err);
    res.status(500).send("Internal Server Error");
});

// CREATE sportoviště
router.post("/", async (req: Request, res: Response) => {
    try {
        const location = await SportLocation.create(req.body);
        return res.status(201).json(location); // Přidáno RETURN
    } catch (error) {
        return res
            .status(500)
            .json({ error: "Chyba při vytváření sportoviště" }); // Přidáno RETURN
    }
});

// READ všech sportovišť
router.get("/", async (req: Request, res: Response) => {
    try {
        const locations = await SportLocation.findAll();
        return res.json(locations); // Přidáno RETURN
    } catch (error) {
        return res.status(500).json({ error: "Chyba při načítání sportovišť" }); // Přidáno RETURN
    }
});

// UPDATE sportoviště
router.put("/:id", async (req: Request, res: Response) => {
    try {
        const [updated] = await SportLocation.update(req.body, {
            where: { id: req.params.id },
        });

        if (!updated) {
            return res.status(404).json({ error: "Sportoviště nenalezeno" }); // RETURN + status
        }

        return res.json({ message: "Sportoviště aktualizováno" }); // Přidáno RETURN
    } catch (error) {
        return res
            .status(500)
            .json({ error: "Chyba při aktualizaci sportoviště" }); // Přidáno RETURN
    }
});

// DELETE sportoviště
router.delete("/:id", async (req: Request, res: Response) => {
    try {
        const deleted = await SportLocation.destroy({
            where: { id: req.params.id },
        });

        if (!deleted) {
            return res.status(404).json({ error: "Sportoviště nenalezeno" }); // RETURN + status
        }

        return res.json({ message: "Sportoviště smazáno" }); // Přidáno RETURN
    } catch (error) {
        return res.status(500).json({ error: "Chyba při mazání sportoviště" }); // Přidáno RETURN
    }
});

export default router;
