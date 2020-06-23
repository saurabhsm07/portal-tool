const express = require('express')
const router = express.Router()
const passport = require('passport');
const passportConfig = require('./../../../auth/passport.config');
const authorize = require('./../../../auth/autherize.controller');
const articles = require('./../../../controllers/articles.controller');
const attachments = require('./attachments/attachments');
const comments = require('./comments/comments');
const fields = require('./form data/fields');
const forms = require('./form data/forms');
const labels = require('./labels/labels');



/**
 * GET: api path to get list of articles from the database.
 */
router.route('/').get(passport.authenticate('jwt', {session: false}), articles.getAll);

/**
 * GET: api path to get article record with id.
 */
router.route('/id/:id').get(passport.authenticate('jwt', {session: false}),articles.getById);

/**
 * GET: api path to get article record with section id.
 */
router.route('/section/id/:id?/:limit?/:offset?').get(passport.authenticate('jwt', {session: false}), articles.getBySection);


/**
 * GET: api path to get latest article id.
 */
router.route('/max/id').get(passport.authenticate('jwt', {session: false}), articles.getLatestId);

/**
 * GET: api path to get latest articles filtered by title.
 */
router.route('/search').get(passport.authenticate('jwt', {session: false}), articles.getArticleWithTitle);

/**
 * POST: api path to create a article record to the database.
 */
router.route('/').post(passport.authenticate('jwt', {session: false}), authorize.isAgent, articles.create);

/**
 * PUT: api path to update a article record with specific i.d
 */
router.route('/').put(passport.authenticate('jwt', {session: false}), authorize.isAgent, articles.update);

/**
 * DELETE: api path to delete article with specific i.d 
 */
router.route('/id/:id').delete(passport.authenticate('jwt', {session: false}), authorize.isAgent, articles.delete);


router.use('/:id/attachments/', attachments)  // Routes to article attachments APIs
router.use('/:id/comments/', comments)        // Routes to article comments APIs
router.use('/fields', fields)                 // Routes to article fields APIs
router.use('/forms', forms)                   // Routes to article forms APIs
router.use('/labels', labels)                   // Routes to article forms APIs

module.exports = router;                       // Exporting Article APIs module