const express = require('express');
const router = express.Router();
const passport = require('passport');
const passportConfig = require('./../../../../auth/passport.config');
const authorize = require('./../../../../auth/autherize.controller');
const comments = require('./../../../../controllers/ticket.comments.controller');
const users = require('./../../../../controllers/users.controller.js');
const ticket = require('./../../../../controllers/tickets.controller');
/**
 * GET: api path to get list of ticket comments from the database.
 */
router.route('/ticketid/:ticket_id').get(passport.authenticate('jwt', {session: false}), comments.getAll, users.getCommentUserInfo);

/**
 * GET: api path to get ticket comment record with id.
 */
router.route('/id/:id').get(passport.authenticate('jwt', {session: false}), comments.getById);

/**
 * POST: api path to create a ticket field record to the database.
 */
router.route('/').post(passport.authenticate('jwt', {session: false}), comments.create, ticket.getById, ticket.update);

module.exports = router // exporting ticket comments api module