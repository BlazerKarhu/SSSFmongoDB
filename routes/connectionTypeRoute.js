'use strict';

const express = require('express');
const router = express.Router();
const connectionTypeController = require('../controllers/connectionTypeController');

router.get('/', connectionTypeController.connectiontype_list_get);

router.get('/:id', connectionTypeController.connectiontype_get);

module.exports = router;
