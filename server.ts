let express = require(`express`);
let path = require(`path`);

const { initializeDatabase } = require(`./database/db.ts`); // database creation

const app = express();
const port = process.env.PORT || 3000;

app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, `public`)));

// API paths
const apiRoutes = require(`./api/api.ts`);
app.use(`/api`, apiRoutes); // /api/rezervation

app.listen(port, () => {
    console.log(`Server running on port ${port}`);
    console.log(`http://localhost:${port}/`);
});
