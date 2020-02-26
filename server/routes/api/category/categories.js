const express = require('express');
const router = express.Router();

const passport = require('passport');
const passportConfig = require('./../../../auth/passport.config');
const authorize = require('./../../../auth/autherize.controller');

const categories = require('./../../../controllers/categories.controller');
/**
 * GET: api path to get list of categories from the database.
 */
router.route('/').get(passport.authenticate('jwt', {session: false}),authorize.isAgent, categories.getAll);

/**
 * GET: api path to get category record with id.
 */
router.route('/id/:id').get(passport.authenticate('jwt', {session: false}), categories.getById);

/**
 * POST: api path to add a category record to the database.
 */
router.route('/').post(passport.authenticate('jwt', {session: false}),authorize.isAgent, categories.create);

/**
 * PUT: api path to update a category record with specific i.d
 */
router.route('/').put(passport.authenticate('jwt', {session: false}),authorize.isAgent, categories.update);

/**
 * DELETE: api path to delete category with specific i.d 
 */
router.route('/id/:id').delete(passport.authenticate('jwt', {session: false}),authorize.isAgent, categories.delete);

module.exports = router; // exporting category APIs module
