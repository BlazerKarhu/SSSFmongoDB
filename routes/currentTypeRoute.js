'use strict';

const express = require('express');
const router = express.Router();
const currentController = require('../controllers/currentController');

router.get('/', currentController.levels_list_get);

router.get('/:id', currentController.levels_get);

module.exports = router;
