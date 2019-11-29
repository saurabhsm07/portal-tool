const express = require('express')
const articles = express.Router()
const client = require("./../../../config/connections").client_sequelize
const Article = require("./../../../models/Article")

const attachments = require('./attachments/attachments')
const comments = require('./comments/comments')
const fields = require('./form data/fields')
const forms = require('./form data/forms')

articles.get('/', (req, res) => {
    Article.findAll()
           .then((data) => {
               console.log("test")
               console.log(data[0].dataValues)
               res.status(200).send(data)
           })
           .catch((err) => {
               console.log(err.stack)
           })
})

articles.get('/id/:id', (req, res) => {
    Article.findAll({where : {id : req.params.id}})
           .then((data) => {
                if(data){
                    console.log(`fetched article with id : ${data[0].id}`)
                    res.send(data[0])
                }
                else{
                    console.log(`article with id : ${req.params.id} does not exist`)
                    res.status(404).send(`article with id : ${req.params.id} does not exist`)
                }
           })
           .catch((err) => {
                    console.log(err)
                    res.status(500).send(err)
           })
})

articles.post('/', (req, res) => {
    
    const data = {
        url: 'http://localhost:4200/article/',
        html_url: 'http://localhost:5000/api/article/',
        title: req.body.article.title,
        body: req.body.article.body,
        header: req.body.article.header,
        locale:'en-us',
        author: req.body.article.author,
        draft: req.body.article.draft,
        comment_disabled: true,
        promoted: true,
        position: 0,
        up_vote: 0,
        down_vote: 0,
        section: req.body.article.section,
        user_segment_id: 624226,
        permission_group_id: 1526652,
        created_at: req.body.article.createdAt,
        updated_at: req.body.article.updatedAt,
        edited_at:  req.body.article.updatedAt,
        review_state: req.body.article.review_state,
        label_names: req.body.label_names
    }
    console.log(data)
    Article.create(data)
           .then((resp) => {
               
                   console.log(resp)
                   res.send(resp)
               
           })
          .catch((err)=>{
              console.log(err)
              res.status(400).send('bad request')
          })
})

articles.put('/', (req, res) => {
    console.log(req.body.article)
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
        user_segment_id: 624226,
        permission_group_id: 1526652,
        updated_at: req.body.article.updatedAt,
        edited_at:  req.body.article.updatedAt,
        review_state: req.body.article.review_state
    }

    Article.findAll({where : {id: req.body.article.id}})
           .then( (article_obj)=> {
               if(article_obj){
                   if(updateData.label_names){
                     updateData.label_names = Array.from(new Set (updateData.label_names.concat(article_obj[0].dataValues.label_names)))
                   }
                   Article.update(updateData, {where : {id: req.body.article.id}})
                          .then((data) => {
                            console.log("update successfull")
                            Article.findAll({where : {id : req.body.article.id}})
                                   .then((resp) => {
                                       res.send(resp[0])
                                    })
                                   .catch((err)=>{
                                       console.log("Successfull Update, Fetch Failed")
                                       res.status(500).send(err)
                                   })
                            
                          })
                          .catch((err) => {
                            console.log(err)
                            res.status(500).send(err)
                        })
               }
               else{
                res.send(`article with id ${req.body.article.id} does not exist`);
               }
           })
           .catch( (err) => {
                console.log(err)
                res.status(500).send(err)
           })
})

articles.delete('/id/:id', (req, res) => {
    Article.destroy({where: { id: req.params.id}})
           .then((data) =>{
               if(data == 1){
                    console.log(`successfully deleted article with id = ${req.params.id}`)
                    res.status(200).send(`successfully deleted article with id = ${req.params.id}`)
               }
               else{
                   console.log(`article with id ${req.params.id} does not exist`)
                   res.status(404).send(`article with id ${req.params.id} does not exist`)
               }
               
           })
           .catch((err) =>{
               console.log(err)
               res.status(404).send(err)
           })
})


articles.use('/:id/attachments/', attachments)
articles.use('/:id/comments/', comments)
articles.use('/fields', fields)
articles.use('/forms', forms)

module.exports = articles