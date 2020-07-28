const express = require('express');
const router = express.Router();
const passport = require('passport');
const passportConfig = require('./../../../auth/passport.config');
const authorize = require('./../../../auth/autherize.controller');
const users = require('./../../../controllers/users.controller');
const organizationProducts = require('./../../../controllers/organization.products.controller');
const userDetails = require('./../../../controllers/user.details.controller');
const userExtraDetails = require('./../../../controllers/user.extra.details.controller');


/**
 * GET: api path to get user record with specific id.
 */
router.route('/id/:id').get(passport.authenticate('jwt', { session: false }), users.load);

/**
 * GET: api path to check if session exists for user.
 */
router.route('/token/valid').get(passport.authenticate('jwt', { session: false }), authorize.sessionExists);

/**
 * POST: api path to log in to the db.
 */
router.route('/login').post(users.login);

/**
 * GET: api path to log out a user.
 */
router.route('/logout').get(passport.authenticate('jwt', { session: false }), users.logout);

/**
 * GET: api path to get all organizations for current logged in user.
 */
router.route('/organizations').get(passport.authenticate('jwt', { session: false }), users.getOrganizations);

 /**
  * PUT: api route to update username and password
  */
 router.route('/password').put(passport.authenticate('jwt', { session: false }), users.updatePassword);



/**
 * GET: get user details
 */
router.route('/details/id/:id').get(passport.authenticate('jwt', { session: false }), userDetails.findByUserId, userExtraDetails.findByUserId);

/**
 * POST: insert a user detail in the db (phone, email)
 */
router.route('/details').post(passport.authenticate('jwt', { session: false }), userDetails.addUserDetail);

/**
 * POST: insert a user extra detail in the db (address, facebookId, skypeId, twitterId etc.)
 */
router.route('/extra/details').post(passport.authenticate('jwt', { session: false }), userExtraDetails.addUserExtraDetail);


/**
 * GET: api path to get all organizations for current logged in user.
 */

 router.route('/products/organizationids/:organizationids').get(passport.authenticate('jwt', { session: false }), organizationProducts.getOrgProducts, users.getUserOrgProducts);

/**
 * GET: check if user is admin authorized
 */
router.route('/auth/admin').get(passport.authenticate('jwt', { session: false }), authorize.isAdmin, authorize.verifyAccess);
/**
 * GET: check if user is agent authorized
 */
router.route('/auth/agent').get(passport.authenticate('jwt', { session: false }), authorize.isAgent, authorize.verifyAccess);
/**
 * GET: check if user is custom role autherized
 */
router.route('/auth/custom').get(passport.authenticate('jwt', { session: false }), authorize.isAdminOrAgent, authorize.verifyAccess);
/**
 * POST: api path to add a user record to the database.
 */
router.route('/').post(users.create);

/**
 * PUT: api path to update a segment record with specific i.d
 */
router.route('/').put(passport.authenticate('jwt', { session: false }), users.update);

/**
 * DELETE: api path to delete segment with specific id 
 */
router.route('/id/:id').delete(passport.authenticate('jwt'), users.delete);

module.exports = router; // exporting users APIs module