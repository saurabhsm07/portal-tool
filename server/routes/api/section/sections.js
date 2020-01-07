const express = require('express');
const sections = express.Router();
const Section = require("./../../../models/section");

/**
 * GET: api path to get list of sections from the database.
 */
sections.get('/', (req, res) => {
    Section.findAll()
           .then((data) => {
               if(data.length > 0){
                console.log(`${data.length} sections fetched`);
                res.status(200).send(data);
               }else{
                console.log('no data exists in the sections table');
                res.status(404).send({status: 404,
                                      message: `No Sections data available`});
               }

           })
           .catch((err) => {
                console.log("ERROR :");
                console.log(err.stack);
                res.status(500).send(err);
           })
})

/**
 * GET: api path to get section record with specific id.
 */
sections.get('/id/:id', (req, res) => {
    Section.findAll({where : {id : req.params.id}})
           .then((data) => {
                if(data.length == 1){
                    console.log(`fetched section with id : ${data[0].id}`);
                    res.status(200).send(data[0]);
                }
                else{
                    console.log(`section with id : ${req.params.id} does not exist`);
                    res.status(404).send({status: 404,
                                        message: `Section with id = ${req.params.id} does not exist`})
                }
           })
           .catch((err) => {
                console.log("ERROR :");
                console.log(err.stack);
                res.status(500).send(err);
           })
})

/**
 * GET: api path to get section record for specific category id.
 */
sections.get('/category/id/:id', (req, res) => {
    Section.findAll({where : {category_id : req.params.id}})
           .then((data) => {
                if(data.length > 0){
                    console.log(`fetched ${data.length} sections from the database`);
                    res.status(200).send(data);
                }
                else{
                    console.log(`sections in category id : ${req.params.id} do not exist`);
                    res.status(404).send({status: 404,
                                          message: `sections in category id : ${req.params.id} do not exist`})
                }
           })
           .catch((err) => {
                console.log("ERROR :");
                console.log(err.stack);
                res.status(500).send(err);
           })
})

/**
 * POST: api path to add a section record to the database.
 */
sections.post('/', (req, res) => {
    console.log(req.body.section)
    const data = {
        url: 'http://localhost:4200/sections/id',
        html_url: 'http://localhost:5000/api/section/',
        name: req.body.section.name,
        locale:'en-us',
        description: req.body.section.description,
        category_id: req.body.section.category_id,
        outdated: false,
        position: 10,
        parent_section_id: req.body.section.parent_section_id,
        created_at: req.body.section.created_at,
        updated_at: req.body.section.updated_at,
    }
    Section.create(data)
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
 * PUT: api path to update a section record with specific i.d
 */
sections.put('/', (req, res) => {
    console.log(req.body.section)
    const updateData = {
        name: req.body.section.name,
        description: req.body.section.description,
        category_id: req.body.section.category_id,
        parent_section_id: req.body.section.parent_section_id,
        updated_at: req.body.section.updatedAt,
    }

    Section.findAll({where : {id: req.body.section.id}})
           .then( (section_obj)=> {
               if(section_obj.length == 1){
                   Section.update(updateData, {where : {id: req.body.section.id}})
                          .then((data) => {
                                if(data == 1){
                                    console.log('update successfull');
                                    res.status(200).send({  status: 200,
                                                message:`section with id ${req.body.section.id} updated successfully`});
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
                                          message:`section with id ${req.body.category.id} does not exist`});
               }
           })
           .catch((err) => {
                console.log("ERROR :");
                console.log(err.stack);
                res.status(500).send(err);
           })
})

/**
 * DELETE: api path to delete section with specific id 
 */
sections.delete('/id/:id', (req, res) => {
    Section.destroy({where: { id: req.params.id}})
           .then((data) =>{
               if(data == 1){
                    console.log(`successfully deleted section with id = ${req.params.id}`);
                    res.status(200).send({status: 200,
                                          message:`successfully deleted section with id = ${req.params.id}`});
               }
               else{
                   console.log(`section with id ${req.params.id} does not exist`);
                   res.status(404).send({status: 404, 
                                         message: `section with id ${req.params.id} does not exist`});
               }
               
           })
           .catch((err) =>{
                console.log("ERROR :");
                console.log(err.stack);
                res.status(500).send(err);
           })
})

module.exports = sections; // exporting sections APIs module