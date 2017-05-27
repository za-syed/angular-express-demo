var express = require('express');
var router = express.Router();
var customerController =require('../controllers/customerController');
var categoryController =require('../controllers/categoryController');
var userController =require('../controllers/userController');

router.post('/createCustomer', customerController.createCustomer);
router.put('/updateCustomer/:id', customerController.updateCustomer);
router.delete('/deleteCustomer/:id', customerController.deleteCustomer);
router.get('/getCustomers', customerController.getCustomers);
router.get('/getCustomer/:id', customerController.getCustomerByID);

//router.put('/updateCustomer2/:id', customerController.updateCustomer2);

//Category API methods
router.delete('/deleteCategory/:id', categoryController.deleteCategory);
router.get('/getCategories', categoryController.getCategories);
router.get('/getCategory/:id', categoryController.getCategory);
router.post('/createCategory', categoryController.createCategory);
router.put('/updateCategory/:id', categoryController.updateCategory);

router.get('/doesUserExist/:Username', userController.doesUserExist);
router.get('/performLogin/:Username/:Password', userController.performLogin);
router.post('/createUser', userController.createUser);
router.get('/getUser/:Username', userController.getUser);
router.get('/getUsers', userController.getUsers);



/* GET home page. */
router.get('/', function(req, res, next) {
  //res.render('index', { title: 'Express' });
  res.render('public/partial/index.html', { title: 'Express' });
});

module.exports = router;
