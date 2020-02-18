const express = require('express');
const segments = express.Router();
const Segment = require("./../../../models/user_segment");
const preprocessors = require('./../../../helpers/preprocessors/segments.preprocessors');

/**
 * GET: api path to get list of segments from the database.
 */
segments.get('/', (req, res) => {
    Segment.findAll()
           .then((data) => {
               if(data.length > 0){
                console.log(`${data.length} segments fetched`);
                res.status(200).send(data);
               }else{
                console.log('no data exists in the segments table');
                res.status(404).send({status: 404,
                                      message: `No Segments data available`});
               }

           })
           .catch((err) => {
                console.log("ERROR :");
                console.log(err.stack);
                res.status(500).send(err);
           })
})

/**
 * GET: api path to get segment record with specific id.
 */
segments.get('/id/:id', (req, res) => {
    Segment.findAll({where : {id : req.params.id}})
           .then((data) => {
                if(data.length == 1){
                    console.log(`fetched segment with id : ${data[0].id}`);
                    const segment = preprocessors.clientSegmentObj(data[0]);
                    console.log(segment)
                    res.status(200).send(segment);
                }
                else{
                    console.log(`segment with id : ${req.params.id} does not exist`);
                    res.status(404).send({status: 404,
                                        message: `Segment with id = ${req.params.id} does not exist`})
                }
           })
           .catch((err) => {
                console.log("ERROR :");
                console.log(err.stack);
                res.status(500).send(err);
           })
})

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

/**
 * POST: api path to add a segment record to the database.
 */
segments.post('/', (req, res) => {
    console.log(req.body.segment)
    const data = {
        url: 'http://localhost:4200/segments/id',
        html_url: 'http://localhost:5000/api/segment/',
        name: req.body.segment.name,
        user_type: req.body.segment.user_type,
        group_ids: req.body.segment.group_ids,
        organization_ids: req.body.segment.organization_ids,
        tags: req.body.segment.tags,
        or_tags: req.body.segment.or_tags,
        created_at: req.body.segment.created_at,
        updated_at: req.body.segment.updated_at,
    }
    Segment.create(data)
           .then((resp) => {
                console.log(resp);
                res.status(200).send(resp);
           })
          .catch((err)=>{
                console.log("ERROR :");
                console.log(err.stack);
                res.status(500).send(err);
          })
})

/**
 * PUT: api path to update a segment record with specific i.d
 */
segments.put('/', (req, res) => {
    console.log(req.body.segment)
    const updateData = {
        name: req.body.segment.name,
        user_type: req.body.segment.user_type,
        group_ids: req.body.segment.group_ids,
        organization_ids: req.body.segment.organization_ids,
        tags: req.body.segment.tags,
        or_tags: req.body.segment.or_tags,
        updated_at: req.body.segment.updated_at,
    }

    Segment.findAll({where : {id: req.body.segment.id}})
           .then((segment_obj)=> {
               if(segment_obj.length == 1){
                   Segment.update(updateData, {where : {id: req.body.segment.id}})
                          .then((data) => {
                                if(data == 1){
                                    console.log('update successfull');
                                    res.status(200).send({  status: 200,
                                                message:`segment with id ${req.body.segment.id} updated successfully`});
                                }
                            
                          })
                          .catch((err) => {
                            console.log("ERROR :");
                            console.log(err.stack);
                            res.status(500).send(err);
                        })
               }
               else{
                    res.status(404).send({status: 404,
                                          message:`segment with id ${req.body.category.id} does not exist`});
               }
           })
           .catch((err) => {
                console.log("ERROR :");
                console.log(err.stack);
                res.status(500).send(err);
           })
})

/**
 * DELETE: api path to delete segment with specific id 
 */
segments.delete('/id/:id', (req, res) => {
    Segment.destroy({where: { id: req.params.id}})
           .then((data) =>{
               if(data == 1){
                    console.log(`successfully deleted segment with id = ${req.params.id}`);
                    res.status(200).send({status: 200,
                                          message:`successfully deleted segment with id = ${req.params.id}`});
               }
               else{
                   console.log(`segment with id ${req.params.id} does not exist`);
                   res.status(404).send({status: 404, 
                                         message: `segment with id ${req.params.id} does not exist`});
               }
               
           })
           .catch((err) =>{
                console.log("ERROR :");
                console.log(err.stack);
                res.status(500).send(err);
           })
})

module.exports = segments; // exporting segments APIs module