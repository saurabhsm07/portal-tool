const express = require('express');
const path = require('path')
const multer = require('multer');
const fs = require('fs')
const upload = multer({dest: path.join(__dirname,'./../../../../assets/files/')})
const attachments = express.Router();
const client = require("./../../../../config/connections").client



attachments.get('/', (req, res) => {
    

    let query = 'SELECT * from "Ticket_Attachments" WHERE ticket_id = $1  ORDER BY created_at DESC'
    let params = [parseInt(req.baseUrl.match(/\d+/)[0])]
    console.log
    client.query(query,params, (err, data) => {
        if(err){
            console.log(err)
            res.status(404).send("ERROR fetching data")
        } else {
            res.json({'data' :data.rows, 'ticket_id' : req.baseUrl.match(/\d+/)})
        }
    })
})

attachments.post('/',upload.single('attachment'), (req, res) => {
    const attachment_file = req.file;
    const attachment_data = req.body;

    let query = `insert into "Ticket_Attachments"
    (ticket_id, author_id,comment_id, file_name, content_url, content_type, size, inline, location, created_at) 
    values ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10)`

    let params = [req.baseUrl.match(/\d+/)[0],
        parseInt(attachment_data.author_id),
        parseInt(attachment_data.comment_id),
        attachment_file.originalname,
        attachment_file.path,
        attachment_file.mimetype,
        attachment_file.size,
        (attachment_data.inline == "true"),
        attachment_file.destination,
        new Date().toISOString()
        ]
    
    fs.readFile(attachment_file.path, (err, data)=>{
        fs.rename(attachment_file.path, attachment_file.destination+ attachment_file.originalname, (err)=>{
            if(err){
                console.log(err)
            }
            else{
                client.query(query, params, (err, data) => {
                    if (err) {
                        console.log("error")
                        console.log(err.stack)
                        res.status(400).send("BAD REQUEST")
                    } else {
                        console.log("added ticket Attachment")
                        res.send(`Added Attachment for ticket : ${req.baseUrl.match(/\d+/)}`)
                    }
                    })
            }
        })
    })
})

attachments.put('/', (req, res) => {
    const inline = req.body.inline
    console.log(inline)
    let query = 'UPDATE "Ticket_Attachments" SET inline = $1 WHERE id = $2'
    let params = [inline.inline,
                  inline.id]

    client.query(query, params, (err, data) =>{
        if(err){
            console.log("error")
            console.log(err.stack)
            res.status(400).send("BAD REQUEST")
        } else{
            console.log("ticket Attachment INLINE updated")
            res.send("Updated ticket attachment")

        }
    })
})

attachments.delete('/id/:id', (req, res) => {
    let query = 'UPDATE "Ticket_Attachments" SET deleted = $1 WHERE id = $2'
    let params = [true, req.params.id]
  
    client.query(query, params, (err, data) => {
        if(err){
            console.log(err.stack)
            res.status(400).send("BAD REQUEST")
        } else{
            console.log("Attachment deleted")
            res.send(`Attachment with id = ${req.params.id} DELETED`)
        }
    })
})




module.exports = attachments