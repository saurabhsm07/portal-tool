const express = require('express')
const router = express.Router()
const passport = require('passport');
const passportConfig = require('./../../../auth/passport.config');
const authorize = require('./../../../auth/autherize.controller');
const tickets = require('./../../../controllers/tickets.controller');
const users = require('./../../../controllers/users.controller');
const attachments = require('./attachments/attachments');
const comments = require('./comments/comments');
const forms = require('./forms/forms');
const fields = require('./fields/fields');


/**
 * Security: very high
 * GET: api path to get list of tickets for perticular requester
 */
router.route('/search').get(passport.authenticate('jwt', {session: false}), tickets.getTickets);

/**
 * Security: very high
 * GET: api path to get ticket data from the database by id 
 */
router.route('/id/:id').get(passport.authenticate('jwt', {session: false}), tickets.getById, users.getTicketUserInfo);

/**
 * Security: very high
 * POST: save 
 */
router.route('/').post(passport.authenticate('jwt', {session: false}),users.getIdforemail, tickets.create);

/**
 * Security: high
 * PUT:
 */
router.route('/').put(passport.authenticate('jwt', {session: false}))

router.use('/forms', forms);
router.use('/fields', fields);
router.use('/comments', comments);

module.exports = router;