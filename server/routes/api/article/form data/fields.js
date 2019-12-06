const express = require('express');
const Field = require('./../../../../models/article_field');
const fields = express.Router();

/**
 * GET: api path to get list of article fields from the database.
 */
fields.get('/', (req, res) =>{
    Field.findAll()
              .then((data) =>{
                if(data.length > 0){
                    console.log(`${data.length} article fields fetched`);
                    res.status(200).send(data);
               }else{
                   console.log('no data exists in the article fields table');
                   res.status(404).send({status: 404,
                                         message: `No Article Fields data available`});
               }
              })
              .catch((err) =>{
                console.log("ERROR :");
                console.log(err.stack);
                res.status(500).send(err);
              })

})

/**
 * GET: api path to get article field record with id.
 */
fields.get('/id/:id', (req, res) =>{
    Field.findAll({where : {'id': req.params.id}})
         .then((data) => {
                if(data.length == 1){
                    console.log(`fetched article field with id : ${data[0].id}`);
                    res.status(200).send(data[0]);
                }
                else{
                    console.log(`article field with id : ${req.params.id} does not exist`);
                    res.status(404).send({status: 404,
                                        message: `Article Field with id = ${req.params.id} does not exist`})
                }
         })
         .catch((err) => {
            console.log("ERROR :");
            console.log(err.stack);
            res.status(500).send(err);
         })
})

/**
 * POST: api path to create a article field record to the database.
 */
fields.post('/', (req, res) =>{
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
                console.log(resp);
                res.status(200).send(resp);
              })
              .catch((err) =>{
                console.log("ERROR :");
                console.log(err.stack);
                res.status(500).send(err);
              })
} )

/**
 * PUT: api path to update a article field record with specific i.d
 */
fields.put('/', (req, res) =>{
    const field_id = req.body.id;
    const updateObj = {required: req.body.field.required,
                       field_name: req.body.field.field_name,
                       field_value: req.body.field.field_value,
                       updated_at: new Date().toISOString()}
    
    
    Field.update(updateObj,{where: {id: field_id} })
              .then((data) =>{
                if(data == 1){
                    console.log('update successfull');
                    res.status(200).send({  status: 200,
                                message:`Article Field with id ${field_id} updated successfully`});
                  }else{
                    console.log(`article field with id : ${field_id} does not exist`);
                    res.status(404).send({status: 404,
                                        message: `Article Field with id = ${field_id} does not exist`})
                  }
              })
              .catch((err)=>{
                console.log("ERROR :");
                console.log(err.stack);
                res.status(500).send(err);
              })
} )

/**
 * DELETE: api path to delete Article Field with specific i.d 
 */
fields.delete('/id/:id', (req, res) =>{
    Field.destroy({where: {id : req.params.id}})
              .then((data) => {
                  if(data == 1){
                    console.log(`article field with ${req.params.id} deleted successfully`);
                    res.status(200).send({status: 200,
                            message: `Article Field with ${req.params.id} deleted successfully`});
                  }else{
                    console.log(`Article Field with id ${req.params.id} does not exist`);
                    res.status(404).send({status: 404,
                                          message: `Article Field with id = ${req.params.id} does not exist`});
                  }
                  
              })
              .catch((err)=> {
                console.log("ERROR :");
                console.log(err.stack);
                res.status(500).send(err);
              })
} )

module.exports = fields // exporting article fields api module