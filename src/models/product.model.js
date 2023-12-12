const { connection } = require('../config/connection');

const getAll = async () => {
  try {
    const [rows] = await connection.query(
      'SELECT * FROM product, license, category WHERE product.license_id = license.license_id AND product.category_id = category.category_id;'
    );
    
    return rows;
  } catch (err) {
    return {
      error: true,
      message: `'Surgió un error: ${err}`
    }
  } finally {
    connection.releaseConnection();
  }
};

const getOne = async (id) => {
  try {
    const [rows] = await connection.query('SELECT * FROM product WHERE product_id = ?;', id);

    return rows;
  } catch (error) {
    return {
      error: true,
      message: `'Surgió un error: ${err}`
    }
  } finally {
    connection.releaseConnection();
  }
}

module.exports = {
  getAll,
  getOne
}