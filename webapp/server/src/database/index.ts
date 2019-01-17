const pg = require("pg");
const fs = require("fs")
const tls = require("tls")

interface InsertQuery {
  text: string;
  value: any[];
}

const config = {
  user: process.env.DB_USER,
  host: process.env.DB_HOST,
  database: process.env.DB_DATABASE,
  password: process.env.DB_PASSWORD,
  port: process.env.DB_PORT,
  // this object will be passed to the TLSSocket constructor
  ssl : {
    rejectUnauthorized : false,
    cert  : fs.readFileSync("/Users/bernardlin/Downloads/root.crt").toString()
  }
};

const pool = new pg.Pool(config);

async function get(query: string): Promise<any>  {
  const res = await pool.query(query);
  return res.rows;
}

async function mutate(query: InsertQuery): Promise<any> {
  const res = await pool.query(query);
  console.log("res", res)
  return res.rowCount;
}

module.exports = {
  get,
  mutate
};
