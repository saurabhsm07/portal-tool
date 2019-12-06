const express = require('express');
const Comment = require('./../../../../models/article_comment')
const comments = express.Router();

/**
 * GET: api path to get list of article comments from the database for specific article id.
 */
comments.get('/', (req, res) =>{
    Comment.findAll({where : {'source_id': parseInt(req.baseUrl.match(/\d+/)[0])}})
           .then((data) => {
                if(data.length > 0){
                    console.log(`${data.length} article comments fetched`);
                    res.status(200).send(data);
                }else{
                    console.log('no data exists in the Comments table for the given articl id');
                    res.status(404).send({status: 404,
                                            message: `No Comments available for article id ${parseInt(req.baseUrl.match(/\d+/)[0])}`});
                }
           })
           .catch((err) => {
                console.log("ERROR :");
                console.log(err.stack);
                res.status(500).send(err);
           })
})

/**
 * GET: api path to get article comment record with id.
 */
comments.get('/id/:id', (req, res) => {
    Comment.findAll({where : {id : req.params.id}})
            .then((data) => {
                if(data.length == 1){
                    console.log(`fetched article comment with id : ${data[0].id}`);
                    res.status(200).send(data[0]);
                }
                else{
                    console.log(`article comment with id : ${req.params.id} does not exist`);
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
 * POST: api path to create a article comment record to the database.
 */
comments.post('/', (req, res) =>{
    const data = {
        url:'api/url/1',
        source_id: parseInt(req.baseUrl.match(/\d+/)[0]),
        author_id: 124,
        body: 'this is the comment',
        html_url: 'this/ishtml/url',
        locale: 'en-us',
        up_votes: 23,
        down_votes: 22,
        created_at: new Date().toISOString(),
        updated_at: new Date().toISOString(),
        internal: false

    }
    Comment.create(data)
           .then((resp) => {
               console.log(resp)
               res.status(200).send(resp)
           })
           .catch((err) => {
                console.log("ERROR :");
                console.log(err.stack);
                res.status(500).send(err);
           })
} )

/**
 * PUT: api path to update a article comment record with specific i.d
 */
comments.put('/', (req, res) =>{
    const updateData = {
        id : 1,
        body : 'new body',
        up_votes: 24,
        down_votes: 23,
        updated_at: new Date().toISOString()
    }
    Comment.update(updateData, {where : { id: updateData.id}})
    .then((data) =>{
        if(data == 1){
            res.status(404).send({  status: 200,
                message:`comment with id ${updateData.id} updated successfully`});
        }
        else {
            res.status(404).send({status: 404,
                      message: `comment with ${updateData.id} does not exist`});
        }
        
    })
    .catch((err) =>{
        console.log("ERROR :");
        console.log(err.stack);
        res.status(500).send(err);
    })
} )


/**
 * DELETE: api path to delete Article Comment with specific i.d 
 */
comments.delete('/id/:id', (req, res) =>{
    Comment.destroy({where: { id: req.params.id}})
           .then((data) =>{
               if(data == 1){
                console.log(`successfully deleted Comment with id = ${req.params.id}`);
                res.status(200).send({status: 200,
                                      message: `successfully deleted Article Comment with id = ${req.params.id}`});
               }
               else{
                console.log(`article comment with id = ${req.params.id} does not exist`);
                res.status(404).send({status: 404,
                    message: `article comment with id = ${req.params.id} does not exist`});
               }
           })
           .catch((err) =>{
                console.log("ERROR :");
                console.log(err.stack);
                res.status(500).send(err);
           })
} )

module.exports = comments // exporting comments APIs module