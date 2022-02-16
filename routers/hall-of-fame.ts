import {Router} from "express";
import { WarriorRecord } from "../records/warrior.record";

export const hallOfFameRouter = Router();

hallOfFameRouter

    .get('/', async (req, res) => {
        const warriors = (await WarriorRecord.listTop(10) //pobieramy 10topowych warriors
        ).map((warrior, index) => { //i zmieniamy je mapą tak, by dostać obiekt, w którym oprócz warrior mamy place zwiększone o 1
            return {
                place: index + 1,
                warrior,
            };
        });

       res.render('hall-of-fame/list', {
           warriors,
       });
    });