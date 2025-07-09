import mysql from 'mysql2/promise';
import dotenv from 'dotenv';

dotenv.config();

const pool = mysql.createPool({
    host: process.env.MYSQL_ADDON_HOST,
    user: process.env.MYSQL_ADDON_USER,
    password: process.env.MYSQL_ADDON_PASSWORD,
    database: process.env.MYSQL_ADDON_DB,
    port: Number(process.env.MYSQL_ADDON_PORT), // ← MUY IMPORTANTE
    waitForConnections: true,
    connectionLimit: 10,
    queueLimit: 0
});

try {
    await pool.query('SELECT 1');
    console.log('✅ Conexión a MySQL correcta');
} catch (err) {
    console.error('❌ Error de conexión con MySQL:', err.message);
}


export default pool;
