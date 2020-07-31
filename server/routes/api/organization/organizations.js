const express = require('express')
const router = express.Router()
const passport = require('passport');
const passportConfig = require('./../../../auth/passport.config');
const authorize = require('./../../../auth/autherize.controller');


const organizations = require('./../../../controllers/organizations.controller');
/**
 * GET: api path to get list of organizations from the database.
 */
router.route('/').get(passport.authenticate('jwt', {session: false}),authorize.isAgent, organizations.getAll);

/**
 * GET: api path to get list of organizations from the database.
 */
router.route('/show_many').get(passport.authenticate('jwt', {session: false}), organizations.getByIds);

/**
 * GET: api path to get organization record with id.
 */
router.route('/id/:id').get(passport.authenticate('jwt', {session: false}),authorize.isAgent, organizations.getById);

module.exports = router                       // Exporting Organizations APIs module