const express = require('express');
const categories = express.Router();
const Category = require("./../../../models/category");

/**
 * GET: api path to get list of categories from the database.
 */
categories.get('/', (req, res) => {
    Category.findAll()
            .then((data) => {
               if(data.length > 0){
                    console.log(data[0].dataValues);
                    res.status(200).send(data);
               }else{
                   console.log('no data exists in the category table');
                   res.status(404).send('no category data available');
               }
           
           })
            .catch((err) => {
                console.log("ERROR :");
                console.log(err.stack);
           })
})

/**
 * GET: api path to get category record with id.
 */
categories.get('/id/:id', (req, res) => {
    Category.findAll({where : {id : req.params.id}})
           .then((data) => {
                if(data){
                    console.log(`fetched category with id : ${data[0].id}`)
                    res.send(data[0])
                }
                else{
                    console.log(`category with id : ${req.params.id} does not exist`)
                    res.status(404).send(`category with id : ${req.params.id} does not exist`)
                }
           })
           .catch((err) => {
                    console.log(err)
                    res.status(500).send(err)
           })
})

/**
 * POST: api path to create a category record to the database.
 */
categories.post('/', (req, res) => {
    
    const data = {
        url: 'http://localhost:4200/category/id/',
        html_url: 'http://localhost:5000/api/category/id',
        title: req.body.category.title,
        body: req.body.category.body,
        header: req.body.category.header,
        locale:'en-us',
        author: req.body.category.author,
        draft: req.body.category.draft,
        comment_disabled: true,
        promoted: true,
        position: 0,
        up_vote: 0,
        down_vote: 0,
        section: req.body.category.section,
        user_segment_id: 624226,
        permission_group_id: 1526652,
        created_at: req.body.category.createdAt,
        updated_at: req.body.category.updatedAt,
        edited_at:  req.body.category.updatedAt,
        review_state: req.body.category.review_state,
        label_names: req.body.label_names
    }
    console.log(data)
    Category.create(data)
           .then((resp) => {
               
                   console.log(resp)
                   res.send(resp)
               
           })
          .catch((err)=>{
              console.log(err)
              res.status(400).send('bad request')
          })
})

/**
 * PUT: api path to update a category record with specific i.d
 */
categories.put('/', (req, res) => {
    console.log(req.body.category)
    const updateData = {
        title: req.body.category.title,
        body: req.body.category.body,
        header: req.body.category.header,
        locale:'en-us',
        draft: req.body.category.draft,
        comment_disabled: true,
        promoted: true,
        position: 0,
        up_vote: 12,
        down_vote: 0,
        section: req.body.category.section,
        user_segment_id: 624226,
        permission_group_id: 1526652,
        updated_at: req.body.category.updatedAt,
        edited_at:  req.body.category.updatedAt,
        review_state: req.body.category.review_state
    }

    Category.findAll({where : {id: req.body.category.id}})
           .then( (category_obj)=> {
               if(category_obj){
                   if(updateData.label_names){
                     updateData.label_names = Array.from(new Set (updateData.label_names.concat(category_obj[0].dataValues.label_names)))
                   }
                   Category.update(updateData, {where : {id: req.body.category.id}})
                          .then((data) => {
                            console.log("update successfull")
                            Category.findAll({where : {id : req.body.category.id}})
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
                res.send(`category with id ${req.body.category.id} does not exist`);
               }
           })
           .catch( (err) => {
                console.log(err)
                res.status(500).send(err)
           })
})

/**
 * DELETE: api path to delete category with specific i.d 
 */
categories.delete('/id/:id', (req, res) => {
    Category.destroy({where: { id: req.params.id}})
           .then((data) =>{
               if(data == 1){
                    console.log(`successfully deleted category with id = ${req.params.id}`)
                    res.status(200).send(`successfully deleted category with id = ${req.params.id}`)
               }
               else{
                   console.log(`category with id ${req.params.id} does not exist`)
                   res.status(404).send(`category with id ${req.params.id} does not exist`)
               }
               
           })
           .catch((err) =>{
               console.log(err)
               res.status(404).send(err)
           })
})

module.exports = categories; // exporting module to be using for routing
