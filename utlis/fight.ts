import {WarriorRecord} from "../records/warrior.record";

export const fight = (warrior1: WarriorRecord, warrior2: WarriorRecord): {
    log: string[],
    winner: WarriorRecord,
} => {
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

        log.push(`${attacker.warrior.name} zaatakuje ${defender.warrior.name} z siłą ${attackerPower}.`);


        if (defender.dp + defender.warrior.agility > attackerPower) {
            log.push(`${defender.warrior.name} broni się przed ${attacker.warrior.name}.`);

            defender.dp -= attackerPower;

            if (defender.dp < 0) {
                log.push(`${attacker.warrior.name} przełamał obronę ${defender.warrior.name} zadając mu ${-defender.dp} obrażeń.`);

                defender.hp += defender.dp;
            } else {
                log.push(`${attacker.warrior.name} zadał ${attackerPower} obrażeń ${defender.warrior.name}.`);

                defender.hp -= attackerPower;
            }
        }
        //obracanie zmiennych, zamiana defendera z attackerem:
        [defender, attacker] = [attacker, defender];

    } while (defender.hp > 0);

    const winner = defender.warrior;
    log.push(`${winner.name} zwyciężył!`);

    return {
        log,
        winner,
    }
};