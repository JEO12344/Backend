const express = require('express');
const realtimeController = require('../controllers/realtimeController');

const router = express.Router();

router.get('/', realtimeController.getRealTimeProductsPage);

module.exports = router;