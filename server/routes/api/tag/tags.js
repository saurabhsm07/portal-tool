const express = require('express');
const router = express.Router();
const passport = require('passport');
const passportConfig = require('./../../../auth/passport.config');
const authorize = require('./../../../auth/autherize.controller');

const tags = require('./../../../controllers/tags.controller');





/**
 * GET: api path to get list of tags from the database.
 */
router.route('/').get(passport.authenticate('jwt', {session: false}), authorize.isAgent, tags.getAll);

/**
 * GET: api path to get tag record with id.
 */
router.route('/id/:id').get(passport.authenticate('jwt', {session: false}), authorize.isAgent, tags.getById);

module.exports = router                       // Exporting Tags APIs module