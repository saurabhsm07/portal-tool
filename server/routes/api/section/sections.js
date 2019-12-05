const express = require('express');
const sections = express.Router();
const Section = require("./../../../models/section");

/**
 * GET: api path to get list of sections from the database.
 */
sections.get('/', (req, res) => {
    Section.findAll()
           .then((data) => {
               console.log("test")
               if(data)
               console.log(data[0].dataValues)
               res.status(200).send(data)
           })
           .catch((err) => {
                console.log("ERROR :");
                console.log(err.stack);
                res.status(500).send(err);
           })
})

/**
 * GET: api path to get section record with specific i.d.
 */
sections.get('/id/:id', (req, res) => {
    Section.findAll({where : {id : req.params.id}})
           .then((data) => {
                if(data){
                    console.log(`fetched section with id : ${data[0].id}`)
                    res.send(data[0])
                }
                else{
                    console.log(`section with id : ${req.params.id} does not exist`)
                    res.status(404).send(`section with id : ${req.params.id} does not exist`)
                }
           })
           .catch((err) => {
                console.log("ERROR :");
                console.log(err.stack);
                res.status(500).send(err);
           })
})

/**
 * POST: api path to create a section record to the database.
 */
sections.post('/', (req, res) => {
    
    const data = {
        url: 'http://localhost:4200/section/',
        html_url: 'http://localhost:5000/api/section/',
        title: req.body.section.title,
        body: req.body.section.body,
        header: req.body.section.header,
        locale:'en-us',
        author: req.body.section.author,
        draft: req.body.section.draft,
        comment_disabled: true,
        promoted: true,
        position: 0,
        up_vote: 0,
        down_vote: 0,
        section: req.body.section.section,
        user_segment_id: 624226,
        permission_group_id: 1526652,
        created_at: req.body.section.createdAt,
        updated_at: req.body.section.updatedAt,
        edited_at:  req.body.section.updatedAt,
        review_state: req.body.section.review_state,
        label_names: req.body.label_names
    }
    console.log(data)
    Section.create(data)
           .then((resp) => {
               
                   console.log(resp)
                   res.send(resp)
               
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
        title: req.body.section.title,
        body: req.body.section.body,
        header: req.body.section.header,
        locale:'en-us',
        draft: req.body.section.draft,
        comment_disabled: true,
        promoted: true,
        position: 0,
        up_vote: 12,
        down_vote: 0,
        section: req.body.section.section,
        user_segment_id: 624226,
        permission_group_id: 1526652,
        updated_at: req.body.section.updatedAt,
        edited_at:  req.body.section.updatedAt,
        review_state: req.body.section.review_state
    }

    Section.findAll({where : {id: req.body.section.id}})
           .then( (section_obj)=> {
               if(section_obj){
                   if(updateData.label_names){
                     updateData.label_names = Array.from(new Set (updateData.label_names.concat(section_obj[0].dataValues.label_names)))
                   }
                   Section.update(updateData, {where : {id: req.body.section.id}})
                          .then((data) => {
                            console.log("update successfull")
                            Section.findAll({where : {id : req.body.section.id}})
                                   .then((resp) => {
                                       res.send(resp[0])
                                    })
                                   .catch((err)=>{
                                       console.log("Successfull Update, Fetch Failed")
                                       res.status(500).send(err)
                                   })
                            
                          })
                          .catch((err) => {
                            console.log(err)
                            res.status(500).send(err)
                        })
               }
               else{
                res.send(`section with id ${req.body.section.id} does not exist`);
               }
           })
           .catch( (err) => {
                console.log(err)
                res.status(500).send(err)
           })
})

/**
 * DELETE: api path to delete section with specific i.d 
 */
sections.delete('/id/:id', (req, res) => {
    Section.destroy({where: { id: req.params.id}})
           .then((data) =>{
               if(data == 1){
                    console.log(`successfully deleted section with id = ${req.params.id}`)
                    res.status(200).send(`successfully deleted section with id = ${req.params.id}`)
               }
               else{
                   console.log(`section with id ${req.params.id} does not exist`)
                   res.status(404).send(`section with id ${req.params.id} does not exist`)
               }
               
           })
           .catch((err) =>{
               console.log(err)
               res.status(404).send(err)
           })
})

module.exports = sections; // exporting module to be using for routing
