const mysql = require('mysql2');
require('dotenv').config();

const connection = mysql.createPool({
  host: process.env.DB_HOST,
  user: process.env.DB_USERNAME,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,  
  port: process.env.DB_PORT,
  waitForConnections: true,
  connectionLimit: 10,  
  queueLimit: 0
});

connection.getConnection((err, conn) => {
  if (err) {
    console.log('Error al conectarse a la DB: ', err);
  } else {
    console.log('Conexión exitosa a la DB!');
    conn.release();
  }
})

module.exports ={
  connection: connection.promise()
};