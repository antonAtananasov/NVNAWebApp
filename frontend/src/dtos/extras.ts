import { createContext } from "react"
import { IUserSession } from "./dtos"

export interface ISessionContext {
    session: IUserSession | undefined,
    setSession: React.Dispatch<React.SetStateAction<IUserSession | undefined>>
}
export const SessionContext = createContext<ISessionContext | undefined>(undefined)

