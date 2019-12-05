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
                   res.status(404).send({status: 404,
                                         message: `No Category data available`});
               }
           
           })
            .catch((err) => {
                console.log("ERROR :");
                console.log(err.stack);
                res.status(500).send(err)
           })
})

/**
 * GET: api path to get category record with id.
 */
categories.get('/id/:id', (req, res) => {
    Category.findAll({where : {id : req.params.id}})
           .then((data) => {
                if(data){
                    console.log(`fetched category with id : ${data[0].id}`);
                    res.send(data[0]);
                }
                else{
                    console.log(`category with id : ${req.params.id} does not exist`);
                    res.status(404).send({status: 404,
                                          message: `Category with id = ${req.params.id} does not exist`})
                }
           })
           .catch((err) => {
                    console.log("ERROR :");
                    console.log(err.stack);
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
        name: req.body.category.name,
        description: req.body.category.description,
        locale:'en-us',
        position: 10,
        outdated: false,
        icon_url: req.body.category.icon_url,
        created_at: req.body.category.createdAt,
        updated_at: req.body.category.updatedAt,
    }
    Category.create(data)
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
 * PUT: api path to update a category record with specific i.d
 */
categories.put('/', (req, res) => {
    const updateData = {
        name: req.body.category.name,
        req: req.body.category.description,
        position: 0,
        up_vote: 12,
        down_vote: 0,
        updated_at: req.body.category.updatedAt
    }

    Category.findAll({where : {id: req.body.category.id}})
           .then( (category_obj)=> {
               if(category_obj){
                   Category.update(updateData, {where : {id: req.body.category.id}})
                          .then((data) => {
                              if(data == 1){
                                console.log('update successfull');
                                res.send({  status: 200,
                                            message:`category with id ${req.body.category.id} updated successfully`});
                              }
                        })
                          .catch((err) => {
                            console.log(err)
                            res.status(500).send(err)
                        })
               }
               else{
                    res.send({status: 404,
                              message:`category with id ${req.body.category.id} does not exist`});
               }
           })
           .catch((err) => {
                    console.log("ERROR :");
                    console.log(err.stack);
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
                    console.log(`successfully deleted category with id = ${req.params.id}`);
                    res.status(200).send({status: 200,
                                          message: `successfully deleted category with id = ${req.params.id}`});
               }
               else{
                   console.log(`category with id ${req.params.id} does not exist`);
                   res.status(404).send({status: 404,
                                         message: `category with id = ${req.params.id} does not exist`});
               }
               
           })
           .catch((err) =>{
                console.log("ERROR :");
                console.log(err.stack);
                res.status(500).send(err)
           })
})

module.exports = categories; // exporting module to be using for routing
