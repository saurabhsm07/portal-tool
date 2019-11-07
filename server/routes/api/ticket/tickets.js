const express = require('express');
const tickets = express.Router();
const client = require("./../../../config/connections").client
//mock data
let ticketsMock = require('./../../../models/docs/ticketDummy')
const comments = require('./comments/comments')
const attachments = require('./attachments/attachments')


// // get all tickets
// tickets.get('/',(req, res) =>{
//     res.json(ticketsMock)
// })

// get ticket 
tickets.get('/', (req, res) =>{
    client.query('SELECT * from "Tickets" ORDER BY created_at DESC;', (err, data) => {
        if (err) {
            console.log(err)
            res.status(404).send("ERROR fetching the data")
        } else {
            // res.send(data.rows)
            res.render('tickets-list',{'tickets' : data.rows})
        }
      })
})

// get ticket by i.d 
tickets.get('/id/:id', (req, res) =>{
    let query = 'SELECT * from "Tickets" WHERE id = $1'
    let params = [req.params.id]
    client.query(query,params, (err, data) => {
        if (err) {
          console.log(err.stack)
          res.status(404).send("ERROR fetching the data")
        } 
        else {
            if(data.rows.length == 0){
                res.status(403).send("no ticket exists for given i.d")
            }
            else{
                // res.json(data.rows[0])
                res.render('ticket-info',{'ticket' : data.rows[0]})
            }
        }
      })
})

//search tickets with filters
//http://localhost:5000/api/ticket/search?priority=high&status=hold
tickets.get('/search', (req, res) =>{
    let ticket_fields = ['priority', 'status', 'created_at', 'updated_at', 'organization_id', 'group_id']

    // let filters = ``;
    let query = `select * from "Tickets" WHERE`;
    let counter = 1;
    let params = []
    for (const[key, val] of Object.entries(req.query)){
        if( ticket_fields.includes(key)){
            query  = query + ` ${key} = $${counter} AND`;
            counter++;
            params.push(val)
        }
    }
    
    query = query.substring(0, query.length-3)
    client.query(query, params, (err,data) =>{
        if(err){
            console.log(err.stack)
        }
        else{
            if(data.rows.length == 0){
                res.status(204).send("no tickets exists for the given filter conditions")
            }
            else{
                // console.log(data)
                res.render('tickets-list',{'tickets' : data.rows})
            }
        }
    })
    
})


// post ticket
tickets.post('/', (req, res)=>{
    const ticket = req.body.ticket
    console.log(ticket)
    if(!ticket.id || !ticket.subject || !ticket.priority || !ticket.requester){
        res.status(400).send("improper ticket format")
    }
    else{
        query = `insert into "Tickets" 
                (id,subject,description, status, priority, url, type,recipient,requester_id, submitter_id, assignee_id,created_at,updated_at) values($1,$2,$3,$4,$5,$6,$7,$8,$9,$10, $11, $12, $13)`;
        params = [ticket.id, 
                    ticket.subject, 
                    ticket.description, 
                    'new', 
                    ticket.priority, 
                    'http://localhost:5000/api/ticket/id/'+ticket.id, 
                    'problem', 
                    '-', 
                    ticket.requester, 
                    ticket.requester, 
                    111,
                    new Date().toISOString(), 
                    new Date().toISOString()];
        client.query(query, params, (err, data) => {
            if (err) {
              console.log("error")
              console.log(err.stack)
            } else {
                console.log("added ticket")
              res.send(`Added ticket with id : ${ticket.id}`)
            }
          })
           
    }
    
})

// update ticket
tickets.put('/', (req, res)=>{

    const ticket = req.body.ticket
    console.log(ticket)
    if(!ticket.id || !ticket.subject || !ticket.priority || !ticket.requester){
        res.status(400).send("improper ticket format")
    }
    else{
        let collaborators = []
        collaborators.push(ticket.collaborator)

        let query = 'Update "Tickets" SET priority = $1, status = $2, collaborator_ids = $3, organization_id = $4, tags= $5, updated_at = $6 WHERE id = $7'
        let params = [ticket.priority, ticket.status, collaborators, ticket.organization ,[ticket.tags] ,new Date().toISOString() , ticket.id]
        client.query(query, params, (err, data) => {
            if (err) {
              console.log(err.stack)
            } else {
                res.send(`Updated ticket with id : ${req.body.id}`)
            }
          })
    }
})

// delete ticket
tickets.delete('/id/:id', (req, res)=>{
    
    query = 'Delete from "Tickets" where id = $1'
    params = [req.params.id]
    client.query(query, params, (err, data) => {
        if (err) {
              console.log(err.stack)
            } else {
                res.send(`Deleted ticket with id : ${req.params.id}`)
            }
          })
})



tickets.get('/add-multiple',(req, res)=>{
    let query = `insert into "Tickets"(id,description,external_id,subject,url,type,priority,
                status,recipient,requester_id,submitter_id,assignee_id,
                organization_id,group_id,collaborator_ids,
                email_cc_ids,follower_ids,tags,created_at,updated_at,is_public,
                ticket_form_id,allow_attachments,forum_topic_id,problem_id,has_incidents,
                due_at,sharing_agreement_ids,followup_ids,brand_id,allow_channelback,via,
                custom_fields,satisfaction_rating) 
                values($1,$2,$3,$4,$5,$6,$7,$8,$9,$10,
                       $11,$12,$13,$14,$15,$16,$17,$18,$19,
                       $20,$21,$22,$23,$24,$25,$26,$27,$28,$29,$30,$31,$32,$33,$34)`
                 

    // let params = [223,'test desc','11','test bsub','test/url/1','problem','high','new','ssm@gmail.com',12231,12344,12341,11234,123424,'{}','{}','{}','{\"test tag\", \"test tag 2\"}','2014-10-12','2015-10-12',false,22313,false,null,null,false, null,null,null,null,null,null,null,null]
   
    let begin_transaction = function(){
        return new Promise((resolve, refused) => {
            client.query("BEGIN", (err) =>{
                let result ={};
                    result.err = []
                    result.status_info = []

                    
                if(err){
                    console.log("transaction failed to start")
                    result.err = err;
                    result.current_status = 601
                    result.current_msg = "transaction failed to start"
                    result.status_info.push({step : 'START transaction', status: false, code:601, msg:"transaction failed to start"})
                    resolve(result)
                }
                else{
                    console.log("transaction started successfully")
                    result.current_status = 701
                    result.current_msg = "transaction started successfully"
                    result.status_info.push({step : 'START transaction', status: true, code:701, msg:"transaction started successfully"})
                    resolve(result)

                }
            })

        })
    }

    let execute_queries = function(result){
        return new Promise((resolve, refuse) =>{
            let itemsProcessed = 0
            if(result.current_status == 701){
            ticketsMock.forEach((ticket) =>{
                
                let params = [ticket.id, ticket.description, ticket.external_id, ticket.subject, ticket.url, ticket.type, ticket.priority, 
                              ticket.status, ticket.recipient, ticket.requester_id, ticket.submitter_id, ticket.assignee_id, 
                              ticket.organization_id, ticket.group_id, ticket.collaborator_ids, 
                              ticket.email_cc_ids, ticket.follower_ids, ticket.tags, ticket.created_at, ticket.updated_at, ticket.is_public, 
                              ticket.ticket_form_id, ticket.allow_attachments, ticket.forum_topic_id, ticket.problem_id, ticket.has_incidents, 
                              ticket.due_at, ticket.sharing_agreement_ids, ticket.follower_ids, ticket.brand_id, ticket.allow_channelback, ticket.via, 
                              ticket.custom_fields, ticket.satisfaction_rating]
                
                client.query(query, params, (err,data)=>{
                    if(err){
                        console.log("error executing query")
                        result.err = err;
                        result.current_status = 601
                        result.current_msg = 'error executing query No:'+ itemsProcessed
                        result.status_info.push({step : 'QUERY execution', status: false, code:601, msg:'error executing query No:'+ itemsProcessed})
                        result.ticket_info = {id: ticket.id,
                                              'subject': ticket.subject};
                        resolve(result);
                        return
                    }
                    else{
                        itemsProcessed++
                        if(itemsProcessed == ticketsMock.length){
                            console.log("itemsProcesseds= "+ itemsProcessed)
                            result.current_status = 701
                            result.current_msg = "successfully processed all the queries"
                            result.status_info.push({step : 'QUERY execution', status: true, code:701, msg:"successfully processed all the queries"})
                                result.query_info = {
                                    total_records : itemsProcessed
                                };
            
                                resolve(result);
                                return
                        }
                    }
                })
        })
    }
        else {
            console.log("err while beginning the trasaction")
            resolve(result)
        }

    })
    }

    let commit_transaction = function(result){
        return new Promise ((resolve, refuse) =>{
            if(result.current_status == 701){
                client.query("COMMIT", (err)=>{
                    if(err){
                        result.current_status = 701
                        result.current_msg = "failed to commit the transaction"
                        result.status_info.push({step : 'COMMIT Transaction', status: false, code:601, msg:"failed to commit the transaction"})
                        refuse(result)
                    }
                    else{
                        result.current_status = 701
                        result.current_msg = "transaction successfully completed"
                        result.status_info.push({step : 'COMMIT Transaction', status: true, code:701, msg:"transaction successfully completed"})
                        resolve(result)
                    }
                })
            }
            else{
                console.log("error while executing query")
                refuse(result)
            }

        })
    }

    begin_transaction().then((transaction_start_data) => {
        return execute_queries(transaction_start_data)
    }).then((execute_query_data)=>{
        return commit_transaction(execute_query_data)
    }).then((commit_transaction_data)=>{
        res.status(201).json({result_msg :"transaction completed successfully", result_info : commit_transaction_data})
    }).catch((transaction_failure_data)=>{
        console.log("transaction execution failed:")
        console.log(transaction_failure_data)
        client.query("ROLLBACK", (err)=>{
         if(err){
            console.log(err)   
        }
        else{
            console.log("Rolledback all the changes")
            res.status(400).json({error_msg :"transaction failed", error_info : transaction_failure_data})
        }
            
        })
    })

    process.on('unhandledRejection', (reason, promise) => {
        // console.log(reason)
        console.log('Unhandled Rejection at:', promise, 'reason:', reason);
        // Application specific logging, throwing an error, or other logic here
      });
})

            
tickets.get('/ticket-multiple-insert-test', (req, res) =>{
    let keys = Object.keys(ticketsMock[0])

    let query = `insert into "Tickets"(`+keys.join()+`) Values %L`
    ticketsMock1 = ticketsMock.slice(0,1)
    let tickets_list = ticketsMock1.map(x => Object.values(x))
    let new_query = queryFormat(query, tickets_list)
    new_query = new_query.replace(/::jsonb/g,"")

    // client.query(new_query, (err,data)=>{
    //     if(err){
    //         console.log(err)
    //     }
    //     else{
    //         res.send("data added")
    //     }
    // })   
    // let new_query = queryFormat(query, tickets_list)
    // new_query = new_query.replace(/::jsonb/g,"")
    // res.send(new_query)
    // res.send(tickets_list)
})

tickets.use('/:id/comments/', comments)
tickets.use('/:id/attachments/', attachments)

module.exports = tickets

