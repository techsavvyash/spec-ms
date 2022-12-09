'use strict';
require('dotenv').config();
const {pg, Pool} = require('pg');

let pool;

try {
    let pgConfigTemp = {
        user: process.env.PG_USER,
        password: process.env.PG_PASSWORD,
        database: process.env.PG_DB
    };

    pgConfigTemp.host = process.env.PG_HOST || 'localhost';
    pgConfigTemp.port = (process.env.PG_PORT) ? parseInt(process.env.PG_PORT) : 5432;


    console.log('dbConfig.pool config: ', pgConfigTemp);
    pool = new Pool(pgConfigTemp);

    if (!process.env.JEST_TEST) {
        pool.query('SELECT CURRENT_TIMESTAMP as conTime').then(data => {
            console.log('dbConfig:DB CONNECTION SUCCESSFUL: ', data.rows[0]);
        }).catch(err => {
            console.error('dbConfig:DB Connection FAILED: ', err);
        });
    }


} catch (e) {
    console.error(`dbConfig:: `, e);
    throw e
}


module.exports = {
    query: (text, params) => pool.query(text, params),

    /**
     * IMPORTANT , IF YOU USE POOL DIRECTLY, Compuslory use this format as show below, client should be released
     *  const client = await pool.connect();
     try {
            const result =  await client.query(`SELECT 'Hello client' as client`);
            console.log('bootstrapInit.start: ',result.rows);

        } catch (e) {
            console.log('bootstrapInit.function: ', e);
        } finally {
            client.release();
        }
     */
    pool: pool
};