const express = require('express')
const articles = express.Router()
const sequelize = require('sequelize');
const client = require("./../../../config/connections").client;
const Article = require("./../../../models/Article");

const attachments = require('./attachments/attachments');
const comments = require('./comments/comments');
const fields = require('./form data/fields');
const forms = require('./form data/forms');
const labels = require('./labels/labels');

const preprocessors = require('./../../../helpers/preprocessors');


/**
 * GET: api path to get list of articles from the database.
 */
articles.get('/', (req, res) => {
    Article.findAll()
           .then((data) => {
               if(data.length > 0){
                console.log(data[0].dataValues);
                res.status(200).send(data);
               }else{
                    console.log('no data exists in the article table');
                    res.status(404).send({status: 404,
                                          message: `No Article data available`});
            }
           })
           .catch((err) => {
                console.log("ERROR :");
                console.log(err.stack);
                res.status(500).send(err)
           })
})

/**
 * GET: api path to get article record with id.
 */
articles.get('/id/:id', (req, res) => {
    Article.findAll({where : {id : req.params.id}})
           .then((data) => {
                if(data.length == 1){
                    console.log(`fetched Article with id : ${data[0].id}`);
                    const article_obj = preprocessors.processArticleObj(data[0]);
                    res.status(200).send(article_obj);
                }
                else{
                    console.log(`Article with id : ${req.params.id} does not exist`);
                    res.status(404).send({status: 404,
                        message: `Article with id = ${req.params.id} does not exist`});
                }
           })
           .catch((err) => {
                console.log("ERROR :");
                console.log(err.stack);
                res.status(500).send(err);
           })
})

/**
 * GET: api path to get article record with section id.
 */
articles.get('/section/id/:id', (req, res) => {
    Article.findAll({where : { section : { id: req.params.id}}})
           .then((data) => {
                if(data.length > 0){
                    console.log(`fetched Articles with section id : ${req.params.id}`);
                    const articleList = preprocessors.processArticlesList(data);
                    res.status(200).send(articleList);
                }
                else{
                    console.log(`Article with section id = ${req.params.id} does not exist`);
                    res.status(404).send({status: 404,
                        message: `Article with section id = ${req.params.id} does not exist`});
                }
           })
           .catch((err) => {
                console.log("ERROR :");
                console.log(err.stack);
                res.status(500).send(err);
           })
})


/**
 * GET: api path to get latest article id.
 */
articles.get('/max/id', (req, res) => {
    client.query(`SELECT AUTO_INCREMENT
    FROM  INFORMATION_SCHEMA.TABLES
    WHERE TABLE_SCHEMA = 'helpcenter_database'
    AND   TABLE_NAME   = 'articles'`,{})
           .then((data) => {

                    console.log(`last article id : ${data[0][0].AUTO_INCREMENT}`);
                    res.status(200).send({'id': data[0][0].AUTO_INCREMENT});
                
           })
           .catch((err) => {
                console.log("ERROR :");
                console.log(err.stack);
                res.status(500).send(err);
           })
})

/**
 * POST: api path to create a article record to the database.
 */
articles.post('/', (req, res) => {
    console.log(req.body)
    const data = {
        url: 'http://localhost:4200/article/',
        html_url: 'http://localhost:5000/api/article/',
        title: req.body.article.title,
        body: req.body.article.body,
        article_form_id: req.body.article.article_form_id,
        locale:'en-us',
        author: req.body.article.author,
        draft: req.body.article.draft,
        comment_disabled: true,
        promoted: true,
        position: 0,
        up_vote: 0,
        down_vote: 0,
        section: req.body.article.section,
        user_segment_id: req.body.article.user_segment_id,
        label_names: req.body.article.label_names,
        permission_group_id: 1526652,
        created_at: req.body.article.created_at,
        updated_at: req.body.article.updated_at,
        edited_at:  req.body.article.updated_at,
        review_state: req.body.article.review_state,

    };
    Article.create(data)
           .then((resp) => {
                console.log(resp)
                res.status(200).send(resp)
               })
          .catch((err)=>{
                console.log("ERROR :");
                console.log(err.stack);
                res.status(500).send(err);
          })
})

/**
 * PUT: api path to update a article record with specific i.d
 */
articles.put('/', (req, res) => {
    const updateData = {
        title: req.body.article.title,
        body: req.body.article.body,
        header: req.body.article.header,
        locale:'en-us',
        draft: req.body.article.draft,
        comment_disabled: true,
        promoted: true,
        position: 0,
        up_vote: 12,
        down_vote: 0,
        section: req.body.article.section,
        user_segment_id: req.body.article.user_segment_id,
        label_names: req.body.article.label_names,
        permission_group_id: 1526652,
        updated_at: req.body.article.updated_at,
        edited_at:  req.body.article.updated_at,
        review_state: req.body.article.review_state
    }

    Article.findAll({where : {id: req.body.article.id}})
           .then((article_obj)=> {
               if(article_obj.length == 1){
                            Article.update(updateData, {where : {id: req.body.article.id}})
                          .then((data) => {
                            if(data == 1){
                                console.log('update successfull');
                                res.status(200).send({  status: 200,
                                            message:`Article with id ${req.body.article.id} updated successfully`});
                              }
                            
                          })
                          .catch((err) => {
                            console.log("ERROR :");
                            console.log(err.stack);
                            res.status(500).send(err);
                        })
               }
               else{
                res.status(404).send({status: 404,
                          message:`Article with id ${req.body.article.id} does not exist`});
               }
           })
           .catch( (err) => {
                console.log("ERROR :");
                console.log(err.stack);
                res.status(500).send(err);
           })
})

/**
 * DELETE: api path to delete article with specific i.d 
 */
articles.delete('/id/:id', (req, res) => {
    Article.destroy({where: { id: req.params.id}})
           .then((data) =>{
               if(data == 1){
                    console.log(`successfully deleted article with id = ${req.params.id}`)
                    res.status(200).send(`successfully deleted article with id = ${req.params.id}`)
               }
               else{
                   console.log(`article with id ${req.params.id} does not exist`)
                   res.status(404).send({status: 404,
                                         message: `Article with id = ${req.params.id} does not exist`});
               }
               
           })
           .catch((err) =>{
                console.log("ERROR :");
                console.log(err.stack);
                res.status(500).send(err);
           })
})


articles.use('/:id/attachments/', attachments)  // Routes to article attachments APIs
articles.use('/:id/comments/', comments)        // Routes to article comments APIs
articles.use('/fields', fields)                 // Routes to article fields APIs
articles.use('/forms', forms)                   // Routes to article forms APIs
articles.use('/labels', labels)                   // Routes to article forms APIs

module.exports = articles                       // Exporting Article APIs module