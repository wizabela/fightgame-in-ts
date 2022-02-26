import {fight} from "./fight";
import {Warrior} from "../records/warrior.record";

const warrior1:Warrior = {
    name: 'Adam',
    power: 1,
    defence: 1,
    stamina: 1,
    agility: 1,
}
const warrior2:Warrior = {
    name: 'Bolek',
    power: 1,
    defence: 1,
    stamina: 1,
    agility: 1,
}


test('w1 should win when has power = 4, defence = 3, stamina = 2, agility = 1 but w2 has power = 7, defence = 1, stamina = 1, agility = 1', () => {
    //Arrange
    const w1 = {...warrior1, power:4, defence:3, stamina:2};
    const w2 = {...warrior2, power:7};
    //Act
    const {log, winner} = fight(w1, w2);
    //Assert
    expect(winner.name).toEqual(warrior1.name);
});

test('who should win now????', () => {
    //Arrange
    const w1 = {...warrior1, power:7};
    const w2 = {...warrior2, power:4,defence:3,stamina:2};
    //Act
    const {log, winner} = fight(w1, w2);
    //Assert
    expect(winner.name).toEqual(warrior1.name);
});


test('attacker should win because he has more power', () => {
    //Arrange
    const w1 = {...warrior1, power:7};
    const w2 = {...warrior2, power:1};
    //Act
    const {log, winner} = fight(w1, w2);
    //Assert
    expect(winner.name).toEqual(warrior1.name);
});


test('warrior2 should win when he has more stamina', () => {
    //Arrange
    const w1 = {...warrior1, stamina:1};
    const w2 = {...warrior2, stamina:2};
    //Act
    const {log, winner} = fight(w1, w2);
    //Assert
    expect(winner.name).toEqual(warrior2.name);
});


//
// test('adds 1 + 2 to equal 3', () => {
//     expect(sum(1, 2)).toBe(3);
// });
//
// test('warrior1 should win when has more power', () => {});
//
// test('warrior1 should win when has power=4 and stamina=2 but warrior2 has power=2 and stamina=1', () => {});
//
// test('warrior1 should win when has power=4 and stamina=2 but warrior2 has power=2 and stamina=1', () => {});

