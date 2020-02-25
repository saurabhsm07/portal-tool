const express = require('express')
const router = express.Router()

const labels = require('./../../../../controllers/article.labels.controller');
/**
 * GET: api path to get list of labels from the database.
 */
router.route('/').get(labels.getAll);

/**
 * POST: api path to create bulk create article label  record to the database.
 */
router.route('/').post(labels.create);



/**
 * GET: api path to get label record with id.
 */
// labels.get('/id/:id', (req, res) => {
//     Label.findAll({where : {id : req.params.id}})
//            .then((data) => {
//                 if(data.length == 1){
//                     console.log(`fetched Label with id : ${data[0].id}`);
//                     res.status(200).send(data[0]);
//                 }
//                 else{
//                     console.log(`Label with id : ${req.params.id} does not exist`);
//                     res.status(404).send({status: 404,
//                         message: `Label with id = ${req.params.id} does not exist`});
//                 }
//            })
//            .catch((err) => {
//                 console.log("ERROR :");
//                 console.log(err.stack);
//                 res.status(500).send(err);
//            })
// })

module.exports = router;