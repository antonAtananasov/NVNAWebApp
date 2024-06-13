import { QueryResult, RowDataPacket } from "mysql2"
import { IPlan as IPlanDto } from "../controllers/dtos"

export interface IPlan extends RowDataPacket {
    id: number //not using uuid, because it is not unsafe for plans to be visible by an incremented number
    storage: number//in megabytes
    cost: number//in BGN
    planName: string
}

export function convertToDto(obj: any): IPlanDto[] {
    return obj.map((o: any) => ({ ...o, planName: o.plan_name } as IPlanDto))
}