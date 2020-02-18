const express = require('express');
const router = express.Router();
const categories = require('./../../../controllers/categories.controller');
/**
 * GET: api path to get list of categories from the database.
 */
router.route('/').get(categories.getAll);

/**
 * GET: api path to get category record with id.
 */
router.route('/id/:id').get(categories.getById);

/**
 * POST: api path to add a category record to the database.
 */
router.route('/').post(categories.create);

/**
 * PUT: api path to update a category record with specific i.d
 */
router.route('/').put(categories.update);

/**
 * DELETE: api path to delete category with specific i.d 
 */
router.route('/id/:id').delete(categories.delete);

module.exports = router; // exporting category APIs module
