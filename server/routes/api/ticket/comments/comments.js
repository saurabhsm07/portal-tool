const express = require('express');
const router = express.Router();
const passport = require('passport');
const passportConfig = require('./../../../../auth/passport.config');
const authorize = require('./../../../../auth/autherize.controller');
const comments = require('./../../../../controllers/ticket.comments.controller');
/**
 * GET: api path to get list of article comments from the database.
 */
router.route('/').get(passport.authenticate('jwt', {session: false}), authorize.isAgent);

/**
 * GET: api path to get article field record with id.
 */
router.route('/id/:id').get(passport.authenticate('jwt', {session: false}), authorize.isAgent)

/**
 * POST: api path to create a article field record to the database.
 */
router.route('/').post(passport.authenticate('jwt', {session: false}), authorize.isAgent)

module.exports = router // exporting article comments api module