import {ValidationError} from "../utlis/errors";
import {v4 as uuid} from 'uuid';
import {pool} from "../utlis/db";
import {FieldPacket} from "mysql2";

type WarriorRecordResults = [WarriorRecord[], FieldPacket[]];

export interface Warrior {
    id?: string;
    name: string;
    power: number;
    defence: number
    stamina: number;
    agility: number;
}

export class WarriorRecord implements Warrior {
    public id?: string;
    public readonly name: string;
    public readonly power: number;
    public readonly defence: number
    public readonly stamina: number;
    public readonly agility: number;
    public wins?: number;

    constructor(obj: Omit<WarriorRecord, 'insert' | 'update'>
    ) {
        const {id, name, power, defence, stamina, agility, wins} = obj;

        const stats = [power, defence, stamina, agility];

        const sumOfSkills = stats.reduce((prev, curr) => prev + curr, 0);

        if (sumOfSkills !== 10) {
            throw new ValidationError(`Suma wszystkich statystyk musi wynosić 10. Aktualnie jest to ${sumOfSkills}.`);
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
        this.stamina = stamina;
        this.agility = agility;
        this.wins = wins ?? 0;
    }
    async insert(): Promise<string> {
        await pool.execute("INSERT INTO `warriors`(`id`, `name`, `power`, `defence`, `stamina`, `agility`, `wins`) VALUES (:id, :name, :power, :defence, :stamina, :agility, :wins)", {
            id: this.id,
            name: this.name,
            power: this.power,
            defence: this.defence,
            stamina: this.stamina,
            agility: this.agility,
            wins: this.wins,
        });
        return this.id;
    }

    async update(): Promise<void> {
        await pool.execute("UPDATE `warriors` SET `wins` = :wins WHERE id = :id", {
            id: this.id,
            wins: this.wins,
        });
    }

    static async getOne(id: string): Promise<WarriorRecord | null> {
        const [results] = await pool.execute("SELECT * FROM `warriors` WHERE `id` = :id", {
            id,
        }) as WarriorRecordResults;

        return results.length === 0 ? null : new WarriorRecord(results[0]);
    }

    static async listAll(): Promise<WarriorRecord[]> {
        const [results] = await pool.execute("SELECT * FROM `warriors`") as WarriorRecordResults;

        return results.map(obj => new WarriorRecord(obj));
    }

    static async listTop(topCount: number): Promise<WarriorRecord[]> {
        const [results] = await pool.execute("SELECT * FROM `warriors` ORDER BY `wins` DESC LIMIT :topCount", {
            topCount,
        }) as WarriorRecordResults;

        return results.map(obj => new WarriorRecord(obj));
    }
    static async isNameTaken(name: string): Promise<boolean> {
        const [results] = await pool.execute("SELECT * FROM `warriors` WHERE `name` = :name", {
            name,
        }) as WarriorRecordResults;
        return results.length > 0;
    }
}