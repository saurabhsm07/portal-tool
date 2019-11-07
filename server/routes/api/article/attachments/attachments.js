const express = require('express');
const path = require('path');
const multer = require('multer');
const upload = multer({dest: path.join(__dirname,'./../../../../assets/files/article_data/')});
const fs = require('fs');
const Attachment = require('./../../../../models/article_attachments')
const attachments = express.Router();

attachments.get('/', (req, res) =>{
    Attachment.findAll({where : {'article_id': parseInt(req.baseUrl.match(/\d+/)[0])}})
              .then((data) =>{
                  console.log("data fetched successfully")
                  res.send(data)
              })
              .catch((err) =>{
                  console.log(err)
                  res.status(500).send(err)
              })
})

attachments.post('/', upload.single('attachment'),(req, res) =>{
    console.log("in article attachment")
    const data = {
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
                console.log(err)
            })
        }
        fs.rename(req.file.path, req.file.destination+ req.body.article_id+"/"+ req.file.originalname, (err)=>{
            if(err){
                console.log(err)
            }
            else{
                Attachment.create(data)
                .then((resp) => {
                    console.log(resp)
                    res.send(resp)
                })
                .catch((err) =>{
                    console.log(err)
                    res.status(500).send(err)
                })
            }
        })
    })
   
} )

attachments.put('/', (req, res) =>{
    Attachment.update({inline: true},{where: {article_id : parseInt(req.baseUrl.match(/\d+/)[0])}})
              .then((data) =>{
                  console.log("update successfull")
                  res.send("updated attachement inline state")
              })
              .catch((err)=>{
                  console.log(err)
                  res.status(500).send(err)
              })
} )

attachments.delete('/', (req, res) =>{
    Attachment.destroy({where: {article_id : parseInt(req.baseUrl.match(/\d+/)[0])}})
              .then(() => {
                  console.log("article attachments deleted successfully")
                  res.send("article attachements deleted")
              })
              .catch((err)=> {
                  console.log(err);
                  res.status(500).send(err)
              })
} )

module.exports = attachments