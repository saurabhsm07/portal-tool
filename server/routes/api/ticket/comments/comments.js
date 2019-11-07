const express = require('express');
const comments = express.Router();
const client = require("./../../../../config/connections").client



comments.get('/', (req, res) => {
    let query = 'SELECT * from "Ticket_Comments" WHERE ticket_id = $1  ORDER BY created_at DESC'
    let params = [parseInt(req.baseUrl.match(/\d+/)[0])]

    client.query(query,params, (err, data) => {
        if(err){
            console.log(err)
            res.status(404).send("ERROR fetching data")
        } else {
            // res.send(data)
            res.json({'data' :data.rows, 'ticket_id' : req.baseUrl.match(/\d+/)})
        }
    })
    
    // res.json({ 'ticket_id' : req.baseUrl.match(/\d+/)})
})

comments.post('/', (req, res) => {

    const comment = req.body.comment
    
    let query = `insert into "Ticket_Comments"
                 (ticket_id, author_id, body, public, via, created_at, type) 
                 values ($1, $2, $3, $4, $5, $6, $7)`
    
    let params = [req.baseUrl.match(/\d+/)[0],
                 parseInt(comment.author_id),
                 comment.body,
                 (comment.isPublic == "true"),
                 {channel : comment.channel, source : {}},
                 new Date().toISOString(),
                 comment.type]
    
    client.query(query, params, (err, data) => {
        if (err) {
            console.log("error")
            console.log(err.stack)
            res.status(400).send("BAD REQUEST")
        } else {
            console.log("added ticket comment")
            res.send(`Added Comment for ticket : ${req.baseUrl.match(/\d+/)}`)
        }
        })
})
comments.put('/', (req, res) => {
    const visibility = req.body

    let query = 'UPDATE "Ticket_Comments" SET public = $1 WHERE id = $2'
    let params = [visibility.public,
                  visibility.comment_id]

    client.query(query, params, (err, data) =>{
        if(err){
            console.log("error")
            console.log(err.stack)
            res.status(400).send("BAD REQUEST")
        } else{
            console.log("ticket comment visibility updated")
            res.send("Updated ticket visiblility")

        }
    })
})
comments.delete('/id/:id', (req, res) => {
    
    let query = 'DELETE from "Ticket_Comments" WHERE id = $1'
    let params = [req.params.id]
    console.log(params)
    client.query(query, params, (err, data) => {
        if(err){
            console.log(err.stack)
            res.status(400).send("BAD REQUEST")
        } else{
            console.log("comment deleted")
            res.send(`comment with id = ${req.params.id} DELETED`)
        }
    })
})




module.exports = comments