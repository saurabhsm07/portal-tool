const express = require('express');
const router = express.Router();
const sections = require('./../../../controllers/sections.controller');
const passport = require('passport');
const passportConfig = require('./../../../auth/passport.config');
const authorize = require('./../../../auth/autherize.controller');

/**
 * GET: api path to get list of sections from the database.
 */
router.route('/').get(passport.authenticate('jwt', {session: false}), sections.getAll);

/**
 * GET: api path to get section record with specific id.
 */
router.route('/id/:id').get(passport.authenticate('jwt', {session: false}), sections.getById);

/**
 * GET: api path to get section record for specific category id.
 */
router.route('/category/id/:id').get(passport.authenticate('jwt', {session: false}), sections.getByCategory);

/**
 * POST: api path to add a section record to the database.
 */
router.route('/').post(passport.authenticate('jwt', {session: false}), sections.create);

/**
 * PUT: api path to update a section record with specific i.d
 */
router.route('/').put(passport.authenticate('jwt', {session: false}), sections.update);

/**
 * DELETE: api path to delete section with specific id 
 */
router.route('/id/:id').delete(passport.authenticate('jwt', {session: false}), sections.delete);

module.exports = router; // exporting sections APIs module