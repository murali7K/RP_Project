const express = require('express');
const router = express.Router();
const controller = require('../Controllers/Controller');

router.post('/signUp', controller.register);
router.post('/signIn', controller.login);
router.post('/create-checkout-session', controller.session);
router.put('/UpdateUser', controller.UpdateUser);

module.exports = router;
