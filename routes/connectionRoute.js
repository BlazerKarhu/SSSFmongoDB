'use strict';

const express = require('express');
const router = express.Router();
const connectionController = require('../controllers/connectionController');

router.get('/', connectionController.connectiontype_list_get);

router.get('/:id', connectionController.connectiontype_get);

module.exports = router;
