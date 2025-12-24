import mysql from 'mysql2/promise';
import dotenv from 'dotenv';

dotenv.config();

// Create a pool of connections to the database 
// This is a better way to connect to the database than creating a new connection for each request
// It is more efficient and scalable
// It also helps to avoid the "Too many connections" error
// It is also more secure than creating a new connection for each request
export const pool = mysql.createPool({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
    waitForConnections: true,
    connectionLimit: 10,
    queueLimit: 0
});
