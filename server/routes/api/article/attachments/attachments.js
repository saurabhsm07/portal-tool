const express = require('express');
const path = require('path');
const multer = require('multer');
const upload = multer({dest: path.join(__dirname,'./../../../../assets/files/article_data/')});
const fs = require('fs');
const Attachment = require('./../../../../models/article_attachments');
const attachments = express.Router();

/**
 * GET: api path to get list of article attachments from the database for specific article id.
 */
attachments.get('/', (req, res) =>{
    Attachment.findAll({where : {'article_id': parseInt(req.baseUrl.match(/\d+/)[0])}})
              .then((data) =>{
                  if(data.length > 0){
                    console.log(`${data.length} article attachments fetched`);
                    res.status(200).send(data);
                  }else{
                    console.log('no data exists in the Attachments table');
                    res.status(404).send({status: 404,
                                            message: `No Attachments available`});
                  }
              })
              .catch((err) =>{
                    console.log("ERROR :");
                    console.log(err.stack);
                    res.status(500).send(err);
              })
})

/**
 * POST: api path to create a article attachment record to the database.
 */
attachments.post('/', upload.single('attachment'),(req, res) =>{
    const attachement_data = {
        url:'http://localhost:5000/'+req.body.article_id+'/'+req.file.originalname,
        article_id:req.body.article_id,
        file_name: req.file.originalname,
        content_url: 'content/url/',
        content_type: req.file.mimetype,
        size: req.file.size,
        inline: req.body.inline,
        created_at: new Date().toISOString(),
        updated_at: new Date().toISOString()

    }
    fs.readFile(req.file.path, (err)=>{
        if(!fs.existsSync(req.file.destination+req.body.article_id)){
            fs.mkdir(req.file.destination+req.body.article_id, (err)=>{
                console.log(err);
            })
        }
        fs.rename(req.file.path, req.file.destination+ req.body.article_id+"/"+ req.file.originalname, (err)=>{
            if(err){
                console.log(err);
            }
            else{
                Attachment.create(attachement_data)
                .then((resp) => {
                    console.log(resp);
                    res.send(resp);
                })
                .catch((err) =>{
                    console.log("ERROR :");
                    console.log(err.stack);
                    res.status(500).send(err);
                })
            }
        })
    })
   
} )

/**
 * PUT: api path to update a article attachment record with specific i.d
 */
attachments.put('/', (req, res) =>{
    Attachment.update({inline: true},{where: {article_id : parseInt(req.baseUrl.match(/\d+/)[0])}})
              .then((data) =>{
                  if(data > 0){
                    res.send({  status: 200,
                        message:`attachment for article id ${parseInt(req.baseUrl.match(/\d+/)[0])} updated to inline state successfully`});
                  }else{
                    res.send({status: 404,
                        message:`attachments for article id ${parseInt(req.baseUrl.match(/\d+/)[0])} does not exist`});
                  }
               
              })
              .catch((err)=>{
                    console.log("ERROR :");
                    console.log(err.stack);
                    res.status(500).send(err);
              })
} )

/**
 * DELETE: api path to delete article attachment with specific i.d 
 */
attachments.delete('/', (req, res) =>{
    Attachment.destroy({where: {article_id : parseInt(req.baseUrl.match(/\d+/)[0])}})
              .then((data) => {
                if(data == 1){
                    console.log(`successfully deleted attachments for article id = ${parseInt(req.baseUrl.match(/\d+/)[0])}`);
                    res.status(200).send({status: 200,
                                          message: `successfully deleted attachments for article id = ${parseInt(req.baseUrl.match(/\d+/)[0])}`});
               }else{
                console.log(`Attachments with article id ${parseInt(req.baseUrl.match(/\d+/)[0])} do not exist`);
                res.status(404).send({status: 404,
                                      message: `Attachments with article id ${parseInt(req.baseUrl.match(/\d+/)[0])} do not exist`});
               }
              })
              .catch((err)=> {
                    console.log("ERROR :");
                    console.log(err.stack);
                    res.status(500).send(err);
              })
} )

module.exports = attachments // exporting attachments APIs module