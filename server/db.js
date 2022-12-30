// import mysql from 'mysql';

const mysql = require('mysql');
const db = mysql.createConnection({
    host:'localhost',
    user:'root',
    password:'1234',
    port:3306,
    database:'tripleacoffee',
    multipleStatements: true
});
// export default function mysql () {

// }

module.exports = db;