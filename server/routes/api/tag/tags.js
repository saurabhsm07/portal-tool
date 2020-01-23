const express = require('express')
const tags = express.Router()
// const client = require("./../../../config/connections").client;
const Tag = require("./../../../models/tag");

const preprocessors = require('./../../../middleware/preprocessors');


/**
 * GET: api path to get list of tags from the database.
 */
tags.get('/', (req, res) => {
    Tag.findAll({
            }).then((data) => {
               if(data.length > 0){
                console.log(`fetched ${data.length} tags`);
                res.status(200).send(data);
               }else{
                    console.log('no data exists in the tag table');
                    res.status(404).send({status: 404,
                                          message: `No Tag data available`});
            }
           })
           .catch((err) => {
                console.log("ERROR :");
                console.log(err.stack);
                res.status(500).send(err)
           })
})

/**
 * GET: api path to get tag record with id.
 */
tags.get('/id/:id', (req, res) => {
    Tag.findAll({where : {id : req.params.id}})
           .then((data) => {
                if(data.length == 1){
                    console.log(`fetched Tag with id : ${data[0].id}`);
                    const tag_obj = data[0];
                    res.status(200).send(tag_obj);
                }
                else{
                    console.log(`Tag with id : ${req.params.id} does not exist`);
                    res.status(404).send({status: 404,
                        message: `Tag with id = ${req.params.id} does not exist`});
                }
           })
           .catch((err) => {
                console.log("ERROR :");
                console.log(err.stack);
                res.status(500).send(err);
           })
})

module.exports = tags                       // Exporting Tags APIs module