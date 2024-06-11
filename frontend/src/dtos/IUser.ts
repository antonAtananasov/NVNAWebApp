export interface IUser { // how an object from the model maps to an object in the controller
    uuid?: string
    username: string
    password?: string
    creationDate?: string //dates are received as strings
    planId?: number
    planStartDate?: string //dates are received as strings
}
export interface IUserCredentials { // how an object from the model maps to an object in the controller
    username: string
    password: string
}
export interface IUserChangeCredentialsRequest extends IUserCredentials { // how an object from the model maps to an object in the controller
    newUsername?: string
    newPassword?: string
}
export interface IUserSession {
    expires: Date, //when the session becomes invalid
    id: string //session uuid
    uuid: string
    username: string
    creationDate?: string //dates are received as strings
    planId?: number
    planStartDate?: string //dates are received as strings

}
