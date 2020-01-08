const express = require('express')
const labels = express.Router()
const Label = require("./../../../../models/article_label");

/**
 * GET: api path to get list of labels from the database.
 */
labels.get('/', (req, res) => {
    Label.findAll()
           .then((data) => {
               if(data.length > 0){
                console.log(`fetched ${data.length} labels`);
                res.status(200).send(data);
               }else{
                    console.log('no data exists in the label table');
                    res.status(404).send({status: 404,
                                          message: `No Label data available`});
            }
           })
           .catch((err) => {
                console.log("ERROR :");
                console.log(err.stack);
                res.status(500).send(err)
           })
})

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

/**
 * POST: api path to create bulk create article label  record to the database.
 */
labels.post('/', (req, res) => {
    console.log(req.body.labels);
    const data = {

    };
    Label.create(data)
           .then((resp) => {
                console.log(resp)
                res.status(200).send(resp)
               })
          .catch((err)=>{
                console.log("ERROR :");
                console.log(err.stack);
                res.status(500).send(err);
          })
})

module.exports = labels;