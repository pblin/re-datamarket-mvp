var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
const pg = require("pg");
const fs = require("fs");
const tls = require("tls");
const config = {
    user: process.env.DB_USER,
    host: process.env.DB_HOST,
    database: process.env.DB_DATABASE,
    password: process.env.DB_PASSWORD,
    port: process.env.DB_PORT,
    // this object will be passed to the TLSSocket constructor
    ssl: {
        rejectUnauthorized: false,
        cert: fs.readFileSync("/Users/bernardlin/Downloads/root.crt").toString()
    }
};
const pool = new pg.Pool(config);
function get(query) {
    return __awaiter(this, void 0, void 0, function* () {
        const res = yield pool.query(query);
        return res.rows;
    });
}
function mutate(query) {
    return __awaiter(this, void 0, void 0, function* () {
        const res = yield pool.query(query);
        console.log("res", res);
        return res.rowCount;
    });
}
module.exports = {
    get,
    mutate
};
//# sourceMappingURL=index.js.map