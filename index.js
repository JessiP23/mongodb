import express from 'express';
import router from './users.js';
import routere from './routes/grades.js';
import db from './db/conn.js';
const PORT = 5050;
const app = express();

app.use(express.json());

app.get("/", (req, res) => {
    if (res.headersSent) {
        return res.send(403).send("Headers have already been sent");
    }

  res.send("Welcome to the API.");
});

app.use("/grades", routere);
app.use("/users", router);

// Global error handling
app.use((err, _req, res, next) => {
  res.status(500).send("Seems like we messed up somewhere...");
});

// Start the Express server
app.listen(PORT, () => {
  console.log(`Server is running on port: ${PORT}`);
});
