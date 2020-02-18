const express = require('express');
const router = express.Router();
const tags = require('./../../../controllers/tags.controller');
// const client = require("./../../../config/connections").client;




/**
 * GET: api path to get list of tags from the database.
 */
router.route('/').get(tags.getAll);

/**
 * GET: api path to get tag record with id.
 */
router.route('/id/:id').get(tags.getById);

module.exports = router                       // Exporting Tags APIs module