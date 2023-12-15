const { connection } = require('../config/connection');

const getByIdQuery =
  'SELECT * FROM product, license, category ' + 
  'WHERE product_id = ? ' +
  'AND product.license_id = license.license_id ' + 
  'AND product.category_id = category.category_id;';

const getAll = async () => {
  try {
    const [rows] = await connection.query(
      'SELECT * FROM product, license, category WHERE product.license_id = license.license_id AND product.category_id = category.category_id;'
    );
    
    return rows;
  } catch (err) {
    return {
      error: true,
      message: `Surgió un error: ${err}`
    }
  } finally {
    connection.releaseConnection();
  }
};

const getOne = async (id) => {
  try {
    const [rows] = await connection.query(
      getByIdQuery,
      id
    );

    return rows;
  } catch (err) {
    return {
      error: true,
      message: `Surgió un error: ${err}`
    }
  } finally {
    connection.releaseConnection();
  }
};

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

    const [createdItem] = await connection.query(
      getByIdQuery,
      row.insertId
    );
    
    return createdItem;
  } catch (err) {
    return {
      error: true,
      message: `Surgió un error: ${err}`
    }
  } finally {
    connection.releaseConnection();
  }
};

const editProduct = async (id, body) => {
  try {
    const set = Object.keys(body)
      .map(key => `${key} = ?`)
      .join(', ');

    const values = [...Object.values(body), id];

    const [row] = await connection.query(
      `UPDATE product SET ${set} WHERE product_id = ?`,
      values
    );

    if (row.affectedRows === 0) {
      return {
        error: true,
        message: `No se modificó ningún campo`
      };
    }

    const editedItem = connection.query(
      getByIdQuery,
      id
    );

    return editedItem;
  } catch (err) {
    return {
      error: true,
      message: `Surgió un error: ${err}`
    };
  } finally {
    connection.releaseConnection();
  }
};

const deleteProduct = async (id) => {
  try {
    const [row] = await connection.query('DELETE FROM product WHERE product_id = ?', id);

    if (row.affectedRows === 0) {
      return {
        error: true,
        message: `No se modificó ningún campo`
      };
    }

    return row;
  } catch (err) {
    return {
      error: true,
      message: `Surgió un error: ${err}`
    }
  } finally {
    connection.releaseConnection();
  }
};

module.exports = {
  getAll,
  getOne,
  createProduct,
  editProduct,
  deleteProduct
};