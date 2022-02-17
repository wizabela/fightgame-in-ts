import {WarriorRecord} from "../records/warrior.record";

export const fight = (warrior1: WarriorRecord, warrior2: WarriorRecord): string[] => {
    const log: string[] = [];

    const warrior1Obj = {
        hp: warrior1.stamina * 10,
        dp: warrior1.defence,
        warrior: warrior1,
    };
    const warrior2Obj = {
        hp: warrior2.stamina * 10,
        dp: warrior2.defence,
        warrior: warrior1,
    };

    let attacker = warrior1Obj;
    let defender = warrior2Obj;

    do {
        const attackerPower = attacker.warrior.power;
        if (defender.dp + defender.warrior.agility > attackerPower) {
            defender.dp -= attackerPower;

            if (defender.dp < 0) {
                defender.hp += defender.dp;
            }
        }
        //obracanie zmiennych, zamiana defendera z attackerem:
        [defender, attacker] = [attacker, defender];

    } while (defender.hp > 0);

    return log;
};