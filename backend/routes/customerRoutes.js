const express = require('express');
const router = express.Router();

const controller = require('../controllers/customerController');

router.post('/', controller.createCustomer);
router.get('/', controller.getAllCustomers);
router.get('/search', controller.searchCustomers);
router.get('/:id', controller.getCustomerById);
router.put('/:id', controller.updateCustomer);
router.delete('/:id', controller.deleteCustomer);

module.exports = router;