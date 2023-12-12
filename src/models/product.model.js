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
    const [rows] = await connection.query(
      'SELECT * FROM product, license, category WHERE product_id = ? AND product.license_id = license.license_id AND product.category_id = category.category_id;',
      id
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
}

const createProduct = async (body) => {
  try {
    const {
      product_name,
      product_description,
      price,
      stock,
      discount,
      sku,
      dues,
      image_front,
      image_back,
      category_id,
      license_id
    } = body;

    const create_time = new Date();

    const [row] = await connection.query(
      'INSERT INTO product' +
      '(product_name,' +
      'product_description,' +
      'price,' +
      'stock,' +
      'discount,' +
      'sku,' +
      'dues,' +
      'image_front,' +
      'image_back,' +
      'create_time,' +
      'category_id,' +
      'license_id) ' +
      'VALUES(?,?,?,?,?,?,?,?,?,?,?,?);',
      [
        product_name,
        product_description,
        price,
        stock,
        discount,
        sku,
        dues,
        image_front,
        image_back,
        create_time,
        category_id,
        license_id
      ]
    );

    const itemCreated = await connection.query(
      'SELECT * FROM product, license, category WHERE product_id = ? AND product.license_id = license.license_id AND product.category_id = category.category_id;',
      row.insertId
    );
    
    return itemCreated;
  } catch (err) {
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
  getOne,
  createProduct
};