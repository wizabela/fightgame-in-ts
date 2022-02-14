import {Router} from "express";

export const warriorRouter = Router();

warriorRouter

    .get('/add-form', (req, res) => {
       res.send('Form for adding warrior');
    })
    .post('/', (req, res) => {
        res.send('Add warrior');
    });