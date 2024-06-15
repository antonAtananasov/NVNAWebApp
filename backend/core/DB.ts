import { Pool } from "mysql2/promise"

const mysql = require('mysql2')

export class DB {
    connection: Pool;
    constructor() {
        try {

            this.connection = mysql.createPool({
                host: 'localhost',
                database: 'WebApp',
                user: 'root',
                password: ''
            }).promise()
        }
        catch (err) {
            console.error((err as Error).message)
            throw new Error('Error connecting to the database: ' + (err as Error).message)
        }
    }
}