import {ValidationError} from "../utlis/errors";
import {v4 as uuid} from 'uuid';

export class WarriorRecord {
    public id?: string;
    public readonly name: string;
    public readonly power: number;
    public readonly defence: number
    public readonly resilience: number;
    public readonly agility: number;
    public readonly wins?: number;

    constructor(obj: WarriorRecord) {
        const {id, name, power, defence, resilience, agility, wins} = obj;

        const sumOfSkills = [power, defence, resilience, agility].reduce((prev, curr) => prev + curr, 0);

        if (sumOfSkills !== 10) {
            throw new ValidationError(`Suma wszystkich statystyk musi wynosić 10'. Aktualnie jest to ${sumOfSkills}.`);
        }
        if (name.length < 3 || name.length > 50) {
            throw new ValidationError(`Imię powinno być w przedziale od 3 do 50 znaków.`);
        }
        this.id = id;
        this.name = name;
        this.power = power;
        this.defence = defence;
        this.resilience = resilience;
        this.agility = agility;
        this.wins = wins;
    }
    async insert(): Promise<string> {
        if (!this.id) {
            this.id = uuid();
        }
        "INSERT INTO"

    }
    async update(): Promise<void> {

    }
    static async getOne(id: string):Promise<WarriorRecord || null> {

    }
    static async listAll(): Promise<WarriorRecord[]> {

    }
    static async listTop(topCount: number)Promise<WarriorRecord[]> {

    }
}