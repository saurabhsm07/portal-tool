const express = require('express');
const router = express.Router();
const passport = require('passport');
const passportConfig = require('./../../../auth/passport.config');
const authorize = require('./../../../auth/autherize.controller');
const users = require('./../../../controllers/users.controller');

/**
 * GET: api path to get user record with specific id.
 */
router.route('/id/:id').get(passport.authenticate('jwt', {session: false}), authorize.isAdmin, users.load);

/**
 * POST: api path to log in to the db.
 */
router.route('/login').post(users.login);

/**
 * POST: api path to add a user record to the database.
 */
router.route('/').post(users.create);

/**
 * PUT: api path to update a segment record with specific i.d
 */
router.route('/').put(passport.authenticate('jwt'), users.update);

/**
 * DELETE: api path to delete segment with specific id 
 */
router.route('/id/:id').delete(passport.authenticate('jwt'), users.delete);

module.exports = router; // exporting users APIs module