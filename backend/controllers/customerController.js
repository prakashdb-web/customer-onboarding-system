const service = require('../services/customerService');

exports.createCustomer = async (req, res) => {
  const result = await service.createCustomer(req.body);
  res.status(result.status).json(result);
};

exports.searchCustomers = async (req, res) => {
  const result = await service.searchCustomers(req.query.query);
  res.status(result.status).json(result);
};

exports.getAllCustomers = async (req, res) => {
  const result = await service.getAllCustomers();
  res.status(result.status).json(result);
};

exports.getCustomerById = async (req, res) => {
  const result = await service.getCustomerById(req.params.id);
  res.status(result.status).json(result);
};

exports.updateCustomer = async (req, res) => {
  const result = await service.updateCustomer(req.params.id, req.body);
  res.status(result.status).json(result);
};

exports.deleteCustomer = async (req, res) => {
  const result = await service.deleteCustomer(req.params.id);
  res.status(result.status).json(result);
};