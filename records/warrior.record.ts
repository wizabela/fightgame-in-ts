import {ValidationError} from "../utlis/errors";
import {v4 as uuid} from 'uuid';
import {pool} from "../utlis/db";
import {FieldPacket} from "mysql2";

type WarriorRecordResults = [WarriorRecord[], FieldPacket[]];

export class WarriorRecord {
    public id?: string;
    public readonly name: string;
    public readonly power: number;
    public readonly defence: number
    public readonly resilience: number;
    public readonly agility: number;
    public readonly wins?: number;

    constructor(obj: Omit<WarriorRecord, 'insert' | 'update'>) {
        const {id, name, power, defence, resilience, agility, wins} = obj;

        const stats = [power, defence, resilience, agility];

        const sumOfSkills = stats.reduce((prev, curr) => prev + curr, 0);

        if (sumOfSkills !== 10) {
            throw new ValidationError(`Suma wszystkich statystyk musi wynosić 10'. Aktualnie jest to ${sumOfSkills}.`);
        }

        for (const stat of stats) {
            if (stat < 1) {
                throw new ValidationError(`Każda ze statystyk musi wynosić co najmniej 1.`);
            }
        }
        if (name.length < 3 || name.length > 50) {
            throw new ValidationError(`Imię powinno być w przedziale od 3 do 50 znaków.`);
        }
        this.id = id ?? uuid();
        this.name = name;
        this.power = power;
        this.defence = defence;
        this.resilience = resilience;
        this.agility = agility;
        this.wins = wins ?? 0;
    }
    async insert(): Promise<string> {
        await pool.execute("INSERT INTO `warriors`(`id`, `name`, `power`, `defence`, `resilience`, `agility`, `wins`) VALUES (:id, :name, :power, :defence, :resilience, :agility, :wins)", {
            id: this.id,
            name: this.name,
            power: this.power,
            defence: this.defence,
            resilience: this.resilience,
            agility: this.agility,
            wins: this.wins,
        });
        return this.id;
    }

    async update(): Promise<void> {
        await pool.execute("UPDATE `warriors` SET `wins` = :wins", {
            wins: this.wins,
        });
    }

    static async getOne(id: string): Promise<WarriorRecord | null> {
        const [results] = await pool.execute("SELECT * FROM `warrior` WHERE `id` = :id", {
            id: id,
        }) as WarriorRecordResults;

        return results.length === 0 ? null : results[0];
    }

    static async listAll(): Promise<WarriorRecord[]> {
        const [results] = await pool.execute("SELECT * FROM `warrior`") as WarriorRecordResults;

        return results.map(obj => new WarriorRecord(obj));
    }

    static async listTop(topCount: number): Promise<WarriorRecord[]> {
        const [results] = await pool.execute("SELECT * FROM `warrior` ORDER BY `wins` DESC LIMIT :topcount", {
            topCount,
        }) as WarriorRecordResults;

        return results.map(obj => new WarriorRecord(obj));
    }
}