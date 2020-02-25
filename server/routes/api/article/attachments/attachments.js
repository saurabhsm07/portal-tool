const express = require('express');
const multer = require('multer');
const path = require('path');
const upload = multer({dest: path.join(__dirname,'./../../../../assets/files/article_data/')});
const router = express.Router();

const attachments = require('./../../../../controllers/article.attachments.controller');
/**
 * GET: api path to get list of article attachments from the database for specific article id.
 */
router.route('/').get(attachments.getAll);

/**
 * POST: api path to create a article attachment record to the database.
 */
router.route('/').post(upload.single('attachment'), attachments.create);

/**
 * PUT: api path to update a article attachment record with specific i.d
 */
router.route('/').put(attachments.update);

/**
 * DELETE: api path to delete article attachment with specific i.d 
 */
router.route('/').delete(attachments.delete);

module.exports = router // exporting attachments APIs module