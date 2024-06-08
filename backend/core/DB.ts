import { Pool } from "mysql2/promise"

const mysql = require('mysql2')

export class DB {
    connection: Pool;
    constructor() {
        this.connection = mysql.createPool({
            host: 'localhost',
            database: 'WebApp',
            user: 'root',
            password: ''
        }).promise()
    }
}