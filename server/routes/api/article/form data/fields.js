const express = require('express');
const path = require('path');
const multer = require('multer');
const fs = require('fs');
const Field = require('./../../../../models/article_field')
const fields = express.Router();

fields.get('/', (req, res) =>{
    Field.findAll()
              .then((data) =>{
                  console.log("data fetched successfully")
                  res.send(data)
              })
              .catch((err) =>{
                  console.log(err)
                  res.status(500).send(err)
              })

})

fields.get('/id/:id', (req, res) =>{
    Field.findAll({where : {'id': req.params.id}})
         .then((data) => {
             console.log("data")
             res.send(data)
         })
         .catch((err) => {
             console.log(err)
             res.status(500).send("internal server error")
         })
})

fields.post('/', (req, res) =>{
    console.log(req.body)
    const data = {
        required: req.body.required,
        field_type: req.body.field_type,
        field_name: req.body.field_name,
        field_value: req.body.field_value,
        description: req.body.description,
        removable: true,
        agent_only: req.body.agent_only,
        active: true,
        created_at: new Date().toISOString(),
        updated_at: new Date().toISOString()

    }

    Field.create(data)
              .then((resp) => {
                  console.log('New Field created')
                  res.send(resp)
              })
              .catch((err) =>{
                  console.log(err)
                  res.status(500).send(err)
              })
} )

fields.put('/', (req, res) =>{
    const updateObj = {id:1,
                       removable: true, 
                       active: true, 
                       field_name: "dwevr 12",
                       field_type: "multiselect",
                       field_value: [{name :'val3', id: 1},{name :'val4', id: 2}, {name :'val5', id: 3}],
                       updated_at: new Date().toISOString()}
    
    
    Field.update(updateObj,{where: {id: updateObj.id} })
              .then((data) =>{
                  console.log("update successfull")
                  if(data == 0){
                      res.send(`field with id ${updateObj.id} does not exist`)
                  }
                  else{
                    res.send(`field with id ${updateObj.id} updated successfully`)
                  }
              })
              .catch((err)=>{
                  console.log(err)
                  res.status(500).send(err)
              })
} )

fields.delete('/id/:id', (req, res) =>{
    Field.destroy({where: {id : req.params.id}})
              .then(() => {
                  console.log(`article field with ${req.params.id} deleted successfully`)
                  res.send(`article field with ${req.params.id} deleted successfully`)
              })
              .catch((err)=> {
                  console.log(err);
                  res.status(500).send(err)
              })
} )

module.exports = fields