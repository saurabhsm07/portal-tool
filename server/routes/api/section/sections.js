const express = require('express');
const router = express.Router();
const sections = require('./../../../controllers/sections.controller');
/**
 * GET: api path to get list of sections from the database.
 */
router.route('/').get(sections.getAll);

/**
 * GET: api path to get section record with specific id.
 */
router.route('/id/:id').get(sections.getById);

/**
 * GET: api path to get section record for specific category id.
 */
router.route('/category/id/:id').get(sections.getByCategory);

/**
 * POST: api path to add a section record to the database.
 */
router.route('/').post(sections.create);

/**
 * PUT: api path to update a section record with specific i.d
 */
router.route('/').put(sections.update);

/**
 * DELETE: api path to delete section with specific id 
 */
router.route('/id/:id').delete(sections.delete);

module.exports = router; // exporting sections APIs module