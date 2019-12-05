const express = require('express');
const Form = require('./../../../../models/article_form');
const forms = express.Router();

/**
 * GET: api path to get list of categories from the database.
 */
forms.get('/', (req, res) =>{
    Form.findAll()
        .then((data) =>{
            if(data.length > 0){
                console.log(`${data.length} article forms fetched`);
                res.status(200).send(data);
        }else{
            console.log('no data exists in the article forms table');
            res.status(404).send({status: 404,
                                    message: `No Article Forms data available`});
        }
        })
        .catch((err) =>{
            console.log("ERROR :");
            console.log(err.stack);
            res.status(500).send(err);
          })

})

/**
 * GET: api path to get article form record with id.
 */
forms.get('/id/:id', (req, res) =>{
    Form.findAll({where : {'id': req.params.id}})
         .then((data) => {
            if(data.length == 1){
                console.log(`fetched article form with id : ${data[0].id}`);
                res.send(data[0]);
            }
            else{
                console.log(`article form with id : ${req.params.id} does not exist`);
                res.status(404).send({status: 404,
                                    message: `Article Form with id = ${req.params.id} does not exist`})
            }
         })
         .catch((err) => {
            console.log("ERROR :");
            console.log(err.stack);
            res.status(500).send(err);
         })
})

/**
 * POST: api path to create a article form record to the database.
 */
forms.post('/', (req, res) =>{
    const data = req.body;
    console.log(data);

    Form.create(data)
              .then((resp) => {
                  console.log(resp)
                  res.send(resp)
              })
              .catch((err) =>{
                console.log("ERROR :");
                console.log(err.stack);
                res.status(500).send(err);
              })
} )

/**
 * PUT: api path to update a article form record with specific i.d
 */
forms.put('/', (req, res) =>{
    const form_id = req.body.id;
    const updateObj = {
                       name: req.body.form.name,
                       article_fields: req.body.form.article_fields,
                       updated_at: req.body.form.updated_at}
    

                Form.update(updateObj, { where : {id: form_id} } )
                    .then((data) =>{
                        if(data == 1){
                            console.log('update successfull');
                            res.send({  status: 200,
                                        message:`Article Form with id ${form_id} updated successfully`});
                          }else{
                            console.log(`article form with id : ${form_id} does not exist`);
                            res.status(404).send({status: 404,
                                                message: `Article Form with id = ${form_id} does not exist`})
                          }
                    })
                    .catch((err)=> {
                        console.log("ERROR :");
                        console.log(err.stack);
                        res.status(500).send(err);
                    })
            })

/**
 * DELETE: api path to delete article form with specific i.d 
 */
forms.delete('/id/:id', (req, res) =>{
    Form.destroy({where: {id : req.params.id}})
              .then((data) => {
                if(data == 1){
                    console.log(`article form with ${req.params.id} deleted successfully`);
                    res.send({status: 200,
                            message: `Article Form with ${req.params.id} deleted successfully`});
                  }else{
                    console.log(`Article Form with id ${req.params.id} does not exist`);
                    res.status(404).send({status: 404,
                                          message: `Article Form with id = ${req.params.id} does not exist`});
                  }
              })
              .catch((err)=> {
                console.log("ERROR :");
                console.log(err.stack);
                res.status(500).send(err);
              })
} )

module.exports = forms; // exporting article forms api module