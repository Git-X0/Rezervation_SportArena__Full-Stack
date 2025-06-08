import sequelize from "./src/config/db";
import Sport from "./src/models/sport.model";

const sports = [
    { name: "Fotbal" },
    { name: "Tenis" },
    { name: "Basketbal" },
    { name: "Volejbal" },
    { name: "Badminton" },
];

async function seedSports() {
    try {
        await Sport.bulkCreate(sports);
        console.log("✅ Sporty úspěšně seedovány!");
    } catch (error) {
        console.error("❌ Chyba při seedování sportů:", error);
    } finally {
        await sequelize.close();
    }
}

seedSports();
