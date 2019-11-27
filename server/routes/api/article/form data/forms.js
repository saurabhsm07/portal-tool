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
    const data = req.body;
    console.log(data);

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
    const form_id = req.body.id;
    const updateObj = {
                       name: req.body.form.name,
                       article_fields: req.body.form.article_fields,
                       updated_at: req.body.form.updated_at}
    

                Form.update(updateObj, { where : {id: form_id} } )
                    .then((data) =>{
                        console.log("update successfull")
                        res.send({id : form_id})
                    })
                    .catch((err)=> {
                        console.log(err)
                        res.status(500).send(err)
                    })
            })

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