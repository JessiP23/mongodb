import express from 'express';
import db from '../db/conn'

const router = express.Router();

/*
GET
*/
router.get('/', (req, res) => {
    res.send("Hello from Grades Router")
});


/*
GET /:id
 */
router.get('/:id', (req, res) => {
    res.send(req.params);
    const collection = await db.collection('grades');
});


export default router;