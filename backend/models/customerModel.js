const db = require('../config/db');

exports.create = async (data) => {
  const [result] = await db.execute(
    "INSERT INTO customers (name, mobile, email, city) VALUES (?, ?, ?, ?)",
    [data.name, data.mobile, data.email, data.city]
  );
  return result;
};

exports.search = async (query) => {
  const like = `%${query}%`;
  const [rows] = await db.execute(
    "SELECT * FROM customers WHERE name LIKE ? OR mobile LIKE ? OR email LIKE ?",
    [like, like, like]
  );
  return rows;
};

exports.getAll = async () => {
  const [rows] = await db.execute("SELECT * FROM customers");
  return rows;
};


exports.getById = async (id) => {
  const [rows] = await db.execute("SELECT * FROM customers WHERE id=?", [id]);
  return rows[0];
};

exports.update = async (id, data) => {
  const [result] = await db.execute(
    "UPDATE customers SET name=?, mobile=?, email=?, city=? WHERE id=?",
    [data.name, data.mobile, data.email, data.city, id]
  );
  return result.affectedRows > 0;
};

exports.delete = async (id) => {
  const [result] = await db.execute(
    "DELETE FROM customers WHERE id=?",
    [id]
  );
  return result.affectedRows > 0;
};