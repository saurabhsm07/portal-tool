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
    const data = {
        required: true,
        field_type: 'checkbox',
        field_name: 'field_name_14',
        description: 'field description 12',
        removable: false,
        active: false,
        created_at: new Date().toISOString(),
        updated_at: new Date().toISOString()

    }

    Field.create(data)
              .then((resp) => {
                  console.log('New Field created')
                  res.send(`field name : ${resp.field_name} saved with id: ${resp.id}`)
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