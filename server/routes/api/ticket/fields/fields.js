const express = require('express');
const router = express.Router();
const passport = require('passport');
const passportConfig = require('./../../../../auth/passport.config');
const authorize = require('./../../../../auth/autherize.controller');
const fields = require('./../../../../controllers/ticket.fields.controller');

/**
 * GET: api path to get list of article fields from the database.
 */
router.route('/').post(passport.authenticate('jwt', {session: false}), 
                                authorize.isAgent, 
                                fields.getFieldsList, 
                                fields.fieldValues);

/**
 * GET: api path to get article field record with id.
 */
// router.route('/id/:id').get(passport.authenticate('jwt', {session: false}), authorize.isAgent, fields.getById)



module.exports = router // exporting article fields api module
