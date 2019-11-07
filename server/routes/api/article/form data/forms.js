const express = require('express');
const path = require('path');
const multer = require('multer');
const fs = require('fs');
const Form = require('./../../../../models/article_form');
const forms = express.Router();

forms.get('/', (req, res) =>{
    Form.findAll()
              .then((data) =>{
                  console.log("data fetched successfully")
                  res.send(data)
              })
              .catch((err) =>{
                  console.log(err)
                  res.status(500).send(err)
              })
})

forms.get('/id/:id', (req, res) =>{
    Form.findAll({where : {'id': req.params.id}})
         .then((data) => {
             console.log("data")
             res.send(data)
         })
         .catch((err) => {
             console.log(err)
             res.status(500).send("internal server error")
         })
})

forms.post('/', (req, res) =>{
    const data = {
        default: true,
        name: 'Form_name_2',
        description: 'Form description 2',
        removable: true,
        active: true,
        created_at: new Date().toISOString(),
        updated_at: new Date().toISOString(),
        article_field_ids: [1,2,3]

    }

    Form.create(data)
              .then((resp) => {
                  console.log(resp)
                  res.send(resp)
              })
              .catch((err) =>{
                  console.log(err)
                  res.status(500).send(err)
              })
} )

forms.put('/', (req, res) =>{
    const updateData = {
        id: 3,
         active: false,
         name: 'updated_name_1',
         article_field_ids : [2, 11],
    }
    Form.findAll({where : {id : updateData.id}})
        .then((form_obj) => {
            if(form_obj){
                console.log(form_obj[0].dataValues.article_field_ids)
                updateData.article_field_ids = updateData.article_field_ids.concat(form_obj[0].dataValues.article_field_ids)
                console.log(updateData)
                Form.update(updateData, { where : {id: updateData.id} } )
                    .then((data) =>{
                        console.log("update successfull")
                        res.send(`updated form with id = ${updateData.id} `)
                    })
                    .catch((err)=> {
                        console.log(err)
                        res.status(500).send(err)
                    })
            }
            else{
                res.send(`form with id ${updateData.id} does not exist`);
            }
        })
        .catch((err) => {
            console.log(err)
            res.status(500).send(err)
        })
} )

forms.delete('/id/:id', (req, res) =>{
    Form.destroy({where: {id : req.params.id}})
              .then((data) => {
                  console.log("article form deleted successfully")
                  console.log(data)
                  res.send(`article form with id = ${req.params.id} deleted successfully`)
              })
              .catch((err)=> {
                  console.log(err);
                  res.status(500).send(err)
              })
} )

module.exports = forms