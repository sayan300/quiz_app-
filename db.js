const { Pool } = require('pg');
require('dotenv').config();

const pool = new Pool({
    user: process.env.PGUSER,
    password: process.env.PGPASSWORD,
    host: process.env.PGHOST,
    port: process.env.PGPORT,
    database: process.env.PGDATABASE,
    // Render's managed PostgreSQL requires SSL, but localhost (your dev machine) does not.
    ssl: process.env.PGHOST === 'localhost' ? false : { rejectUnauthorized: false }
});

module.exports = pool;
