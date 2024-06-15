import { createContext } from "react"
import { IUserSession } from "./dtos"

export enum NotificationVariant {

    primary = 'primary',
    secondary = 'secondary',
    success = 'success',
    danger = 'danger',
    warning = 'warning',
    info = 'info',
    light = 'light',
    dark = 'dark',

}


export interface INotification {
    title: string,
    subtitle: string,
    message: string,
    variant: NotificationVariant
}
export interface INotificationContext {
    notification: INotification | undefined,
    setNotification: React.Dispatch<React.SetStateAction<INotification | undefined>>
}
export const NotificationContext = createContext<INotificationContext | undefined>(undefined)

export interface ISessionContext {
    session: IUserSession | undefined,
    setSession: React.Dispatch<React.SetStateAction<IUserSession | undefined>>
}
export const SessionContext = createContext<ISessionContext | undefined>(undefined)
