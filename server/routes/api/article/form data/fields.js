const express = require('express');
const router = express.Router();
const passport = require('passport');
const passportConfig = require('./../../../../auth/passport.config');
const authorize = require('./../../../../auth/autherize.controller');
const fields = require('./../../../../controllers/article.fields.controller');
/**
 * GET: api path to get list of article fields from the database.
 */
router.route('/').get(passport.authenticate('jwt', {session: false}),fields.getAll);

/**
 * GET: api path to get article field record with id.
 */
router.route('/id/:id').get(passport.authenticate('jwt', {session: false}), fields.getById)

/**
 * GET: api path to get article field record with list of ids.
 */
router.route('/list').get(passport.authenticate('jwt', {session: false}), fields.getList)

/**
 * POST: api path to create a article field record to the database.
 */
router.route('/').post(passport.authenticate('jwt', {session: false}), fields.create)

/**
 * PUT: api path to update a article field record with specific i.d
 */
router.route('/').put(passport.authenticate('jwt', {session: false}), fields.update)

/**
 * DELETE: api path to delete Article Field with specific i.d 
 */
router.route('/id/:id').delete(passport.authenticate('jwt', {session: false}), fields.delete)

module.exports = router // exporting article fields api module