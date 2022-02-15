import {Router} from "express";
import { WarriorRecord } from "../records/warrior.record";

export const warriorRouter = Router();

warriorRouter

    .get('/add-form', (req, res) => {
       res.render('warrior/add-form');
    })
    .post('/', (req, res) => {
        const warrior = new WarriorRecord({
            ...req.body,
            power: Number(req.body.power),
            defence: Number(req.body.defence),
            resilience: Number(req.body.resilience),
            agility: Number(req.body.agility),
        });
        res.render('warrior/warrior-added');
    });