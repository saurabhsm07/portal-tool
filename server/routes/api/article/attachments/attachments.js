const express = require('express');
const multer = require('multer');
const path = require('path');
const upload = multer({dest: path.join(__dirname,'./../../../../assets/files/article_data/')});
const router = express.Router();
const passport = require('passport');
const passportConfig = require('./../../../../auth/passport.config');
const authorize = require('./../../../../auth/autherize.controller');
const attachments = require('./../../../../controllers/article.attachments.controller');
/**
 * GET: api path to get list of article attachments from the database for specific article id.
 */
router.route('/').get(passport.authenticate('jwt', {session: false}),authorize.isAgent, attachments.getAll);

/**
 * POST: api path to create a article attachment record to the database.
 */
router.route('/').post(passport.authenticate('jwt', {session: false}),authorize.isAgent, upload.single('attachment'), attachments.create);

/**
 * PUT: api path to update a article attachment record with specific i.d
 */
router.route('/').put(passport.authenticate('jwt', {session: false}), authorize.isAgent, attachments.update);

/**
 * DELETE: api path to delete article attachment with specific i.d 
 */
router.route('/').delete(passport.authenticate('jwt', {session: false}), authorize.isAgent, attachments.delete);

module.exports = router // exporting attachments APIs module