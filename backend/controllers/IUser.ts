export interface IUser { // how an object from the model maps to an object in the controller
    uuid?: string
    username: string
    password?: string
    creationDate?: string //dates are received as strings
    planId?: number
    planStartDate?: string //dates are received as strings
}
export interface IUserSession extends IUser {
    expires: Date, //when the session becomes invalid
    id: string //session uuid
}
