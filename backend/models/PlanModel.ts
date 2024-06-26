import { DB } from '../core/DB'
import { IPlan } from './IPlan'

export class PlanModel extends DB {

    async getAllPlans(): Promise<IPlan[]> {
        try {
            const [rows] = await this.connection.query<IPlan[]>('SELECT * from plans', [])
            return rows
        }
        catch (err) {
            console.error((err as Error).message);
            throw new Error('Database error at getAllDocuments')
        }
    }

    async getPlan(id: number): Promise<IPlan> {
        try {
            const [rows] = await this.connection.query<IPlan[]>('SELECT * from plans where id=? limit 1', [id])
            return rows[0] as IPlan
        }
        catch (err) {
            console.error((err as Error).message);
            throw new Error('Database error at getAllDocuments')
        }
    }
}