const express = require('express');
const path = require('path');
const multer = require('multer');
const fs = require('fs');
const Comment = require('./../../../../models/article_comment')
const comments = express.Router();

comments.get('/', (req, res) =>{
    Comment.findAll({where : {'source_id': parseInt(req.baseUrl.match(/\d+/)[0])}})
           .then((data) => {
                console.log("successfully fetched data");
                res.send(data);
           })
           .catch((err) => {
                console.log(err);
                res.status(500).send(err)
           })
})

comments.get('/id/:id', (req, res) => {
    Comment.findAll({where : {id : req.params.id}})
            .then((data) => {
                if(data){
                    console.log(`successfully fetched article_comment`)
                    res.send(data)
                }
                else {
                    console.log(data)
                    res.send(`comment does not exist ${req.params.id}`)
                }
            })
            .catch((err) => {
                
            })
})

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
               res.send(resp)
           })
           .catch((err) => {
                console.log(err);
                res.send(err)
           })
} )

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
        if(data != 0){
            console.log(data)
            res.status(200).send(`successfully updated article comment with id ${updateData.id}`)
        }
        else {
            res.send(`comment with ${updateData.id} does not exist`)
        }
        
    })
    .catch((err) =>{
        console.log(err)
        res.status(200).send(err)
    })
} )

comments.delete('/id/:id', (req, res) =>{
    Comment.destroy({where: { id: req.params.id}})
           .then((data) =>{
               res.status(200).send('successfully deleted article comment')
           })
           .catch((err) =>{
               console.log(err)
               res.status(500).send(err)
           })
} )

module.exports = comments