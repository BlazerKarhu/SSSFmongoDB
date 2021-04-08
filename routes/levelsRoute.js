'use strict';

const express = require('express');
const router = express.Router();
const levelsController = require('../controllers/levelsController');

router.get('/', levelsController.levels_list_get);

router.get('/:id', levelsController.levels_get);

module.exports = router;
