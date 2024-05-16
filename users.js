import express from 'express';
import db from './db/conn.js';

const router = express.Router();

//Create a new user
router.post('/', async (req, res) => {
    const { email, password } = req.body;

    try {
        const alreadyUser = await db.collection('users').findOne({ email });
        if (alreadyUser) {
            return res.send(400).json({ message: "User already exists" });
        }

        //Add new user
        const userAdded = await db.collection('users').insertOne({ email, password });
        res.status(200).json({ message: "User created successfully" });
    } catch ( error) {
        console.error("This is the error: ",error);
        res.status(500).json({ message: "Internal Server Error" });
    }
});

//Get all users
router.get('/', async(_req, res) => {
    try {
        const retrieveUsers = await db.collection('users').find().toArray();
        res.status(200).json(retrieveUsers);
    } catch (error) {
        console.error('This is the error: ', error);
        res.status(500).json({ message: "Internal Server Error" });
    }
});

//find user by id
router.get('/:id', async(req, res) => {
    const userId = req.params.id;
    try {
        const user = await db.collection('users').findOne({ _id: userId });
        if (!user) {
            return res.send(404).json({ message: "User Not Found" });
        } 
    } catch (error) {
        console.error("This is the error: ", error);
        res.status(500).json({ message: "Internal Server Error" });
    }
});


//Update users
router.put("/:id", async(req, res) => {
    const userId = req.params.id;
    const dataOfUser = req.body;

    try {
        const result = await db.collection('users').updateOne({ _id: userId }, {$set: dataOfUser});
        if (result.modifiedCount === 0) { //modifiedCount vs upserCount ???
            return res.status(500).json({ message: "User not found" });
        }
        res.status(200).json({ message: "User Update successfully" })
    } catch(err){
        console.error("This is the error: ", err);
        return res.send(500).json({ message: "internal server error" });
    }
});


export default router;