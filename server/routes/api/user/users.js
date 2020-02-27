const express = require('express');
const router = express.Router();
const passport = require('passport');
const passportConfig = require('./../../../auth/passport.config');
const authorize = require('./../../../auth/autherize.controller');
const users = require('./../../../controllers/users.controller');

/**
 * GET: api path to get user record with specific id.
 */
router.route('/id/:id').get(passport.authenticate('jwt', { session: false }), users.load);

/**
 * POST: api path to log in to the db.
 */
router.route('/login').post(users.login);


/**
 * GET: api path to log out a user.
 */
router.route('/logout').get(passport.authenticate('jwt', { session: false }), users.logout);
/**
 * GET: check if user is admin authorized
 */
router.route('/auth/admin').get(passport.authenticate('jwt', { session: false }), authorize.isAdmin, authorize.verifyAccess);
/**
 * GET: check if user is agent authorized
 */
router.route('/auth/agent').get(passport.authenticate('jwt', { session: false }), authorize.isAgent, authorize.verifyAccess);
/**
 * GET: check if user is custom role autherized
 */
router.route('/auth/custom').get(passport.authenticate('jwt', { session: false }), authorize.isAdminOrAgent, authorize.verifyAccess);
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