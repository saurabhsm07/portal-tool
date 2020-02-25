const express = require('express');
const router = express.Router();
const passport = require('passport');
const passportConfig = require('./../../../auth/passport.config');
const authorize = require('./../../../auth/autherize.controller');
const segments = require('./../../../controllers/segments.controller');

/**
 * GET: api path to get list of segments from the database.
 */
router.route('/').get(passport.authenticate('jwt', {session: false}), segments.getAll)

/**
 * GET: api path to get segment record with specific id.
 */
router.route('/id/:id').get(passport.authenticate('jwt', {session: false}), segments.getById)

/**
 * POST: api path to add a segment record to the database.
 */
router.route('/').post(passport.authenticate('jwt', {session: false}), segments.create)

/**
 * PUT: api path to update a segment record with specific i.d
 */
router.route('/').put(passport.authenticate('jwt', {session: false}), segments.update)

/**
 * DELETE: api path to delete segment with specific id 
 */
router.route('/id/:id').delete(passport.authenticate('jwt', {session: false}), segments.delete)


/**
 * GET: api path to get segment record for specific category id.
 */
// segments.get('/category/id/:id', (req, res) => {
//     Segment.findAll({where : {category_id : req.params.id}})
//            .then((data) => {
//                 if(data.length > 0){
//                     console.log(`fetched ${data.length} segments from the database`);
//                     res.status(200).send(data);
//                 }
//                 else{
//                     console.log(`segments in category id : ${req.params.id} do not exist`);
//                     res.status(404).send({status: 404,
//                                           message: `segments in category id : ${req.params.id} do not exist`})
//                 }
//            })
//            .catch((err) => {
//                 console.log("ERROR :");
//                 console.log(err.stack);
//                 res.status(500).send(err);
//            })
// })

module.exports = router; // exporting segments APIs module