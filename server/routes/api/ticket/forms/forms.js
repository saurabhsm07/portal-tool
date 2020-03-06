const express = require('express');
const router = express.Router();
const passport = require('passport');
const passportConfig = require('./../../../../auth/passport.config');
const authorize = require('./../../../../auth/autherize.controller');
const forms = require('./../../../../controllers/ticket.forms.controller');
const userOrganizations = require('./../../../../controllers/user.organizations.controller');
const organizationProducts = require('./../../../../controllers/organization.products.controller');
/**
 * GET: api path to get list of article fields from the database.
 */
router.route('/').get(
                    passport.authenticate('jwt', { session: false }),
                    authorize.isAgent,
                    userOrganizations.getOranizations,
                    organizationProducts.getProducts,
                    forms.getAll);

/**
 * GET: api path to get article field record with id.
 */
router.route('/id/:id').get(passport.authenticate('jwt', { session: false }), authorize.isAgent)



module.exports = router // exporting article fields api module
