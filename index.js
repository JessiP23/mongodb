import express from 'express';
import dotenv from 'dotenv';
import gradesRouter from "./routes/grades.js";

//inits the dotenv package
dotenv.config();

const PORT = process.env.PORT || 4000;

const app = express();

app.use(express.json());

app.use((req, res, next) => {
    console.log('Request from url: ' + req.url);
    next();
});

app.get('/', (req, res) => {
    console.log(req.body);
    res.send('Welcome to the API');
});

app.use('/grades', gradesRouter);

app.use((err, _req, res, next) => {
    res.status(500).send('Server Error!');
});

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});