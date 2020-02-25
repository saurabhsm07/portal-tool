const express = require('express');
const router = express.Router();
const passport = require('passport');
const passportConfig = require('./../../../../auth/passport.config');
const authorize = require('./../../../../auth/autherize.controller');
const forms = require('./../../../../controllers/article.forms.controller');

/**
 * GET: api path to get list of categories from the database.
 */
router.route('/').get(passport.authenticate('jwt', {session: false}), forms.getAll);

/**
 * GET: api path to get article form record with id.
 */
router.route('/id/:id').get(passport.authenticate('jwt', {session: false}), forms.getById);

/**
 * POST: api path to create a article form record to the database.
 */
router.route('/').post(passport.authenticate('jwt', {session: false}), forms.create);

/**
 * PUT: api path to update a article form record with specific i.d
 */
router.route('/').put(passport.authenticate('jwt', {session: false}), forms.update);

/**
 * DELETE: api path to delete article form with specific i.d 
 */
router.route('/id/:id').delete(passport.authenticate('jwt', {session: false}), forms.delete);

module.exports = router; // exporting article forms api module