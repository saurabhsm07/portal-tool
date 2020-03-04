const express = require('express')
const router = express.Router()
const passport = require('passport');
const passportConfig = require('./../../../auth/passport.config');
const authorize = require('./../../../auth/autherize.controller');
const tickets = require('./../../../controllers/tickets.controller');
const attachments = require('./attachments/attachments');
const comments = require('./comments/comments');
const fields = require('./form data/fields');
const forms = require('./form data/forms');
const labels = require('./labels/labels');


/**
 * Security: very high
 * GET: api path to get list of tickets for perticular requester
 */
router('/').get(passport.authenticate('jwt', {session: false}), tickets.getAllByRequester);

/**
 * Security: very high
 * GET: api path to get ticket by id and requester 
 */
router('id/:id').get(passport.authenticate('jwt', {session: false}), tickets.getByIdForRequester);

/**
 * Security: very high
 */
router('/').post(passport.authenticate('jwt', {session: false}))

/**
 * Security: high
 * PUT:
 */
router('/').put(passport.authenticate('jwt', {session: false}))