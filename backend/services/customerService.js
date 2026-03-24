const model = require('../models/customerModel');

const validate = (data) => {
  if (!data.name) return "Name is required";
  if (!/^\d{10}$/.test(data.mobile)) return "Mobile must be 10 digits";
  return null;
};

exports.createCustomer = async (data) => {
  const error = validate(data);
  if (error) return { status: 400, success: false, message: error };

  const result = await model.create(data);
  return { status: 201, success: true, message: "Customer created", id: result.insertId };
};

exports.searchCustomers = async (query) => {
  if (!query || !query.trim()) {
    return { status: 400, success: false, message: "Search query is required" };
  }
  const data = await model.search(query.trim());
  return { status: 200, success: true, data };
};

exports.getAllCustomers = async () => {
  const data = await model.getAll();
  return { status: 200, success: true, data };
};

exports.getCustomerById = async (id) => {
  const data = await model.getById(id);
  if (!data) return { status: 404, success: false, message: "Not found" };
  return { status: 200, success: true, data };
};

exports.updateCustomer = async (id, data) => {
  const updated = await model.update(id, data);
  if (!updated) return { status: 404, success: false, message: "Not found" };
  return { status: 200, success: true, message: "Updated" };
};

exports.deleteCustomer = async (id) => {
  const deleted = await model.delete(id);
  if (!deleted) return { status: 404, success: false, message: "Not found" };
  return { status: 200, success: true, message: "Deleted" };
};