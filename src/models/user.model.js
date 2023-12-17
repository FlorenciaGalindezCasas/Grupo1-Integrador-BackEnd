const { connection } = require('../config/connection');
const bcrypt = require('bcrypt');

const createUser = async (userObject) => {
  try {
    const {
      name,
      lastname,
      email,
      password
    } = userObject;
    const create_time = new Date();

    const hash = await bcrypt.hash(password, 10);

    const [user] = await connection.query(
      `INSERT INTO user(name, lastname, email, password, create_time) VALUES(?, ?, ?, ?, ?);`,
      [
        name,
        lastname,
        email,
        hash,
        create_time
      ]
    );

    console.log("Usuario:", user[0]);

    return user;
  } catch (err) {
    return {
      error: true,
      message: `Surgió un error: ${err}`
    }
  } finally {
    connection.releaseConnection();
  }
};

const verifyUser = async (email, password) => {
  try {
    const [userExists] = await connection.query(`SELECT * FROM user WHERE email = ?;`, email);

    return userExists;
  } catch (err) {
    return {
      error: true,
      message: `Surgió un error: ${err}`
    }
  } finally {
    connection.releaseConnection();
  }
}

module.exports = {
  createUser,
  verifyUser
}