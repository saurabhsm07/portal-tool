const Comment = require("./../models/ticket.comment");
// const preprocessors = require('./../helpers/preprocessors/articles.preprocessors');

module.exports = {
    /**
     * GET: get list of ticket comments from database based on ticket i.d
     */
    getAll: (req, res, next) => {
        const ticket_id = req.params.ticket_id;
        
        Comment.findAll({where: {ticket_id: ticket_id, public: true}})
               .then((data) => {
                    if(data.length > 0){
                        console.log(`${data.length} comments fetched`);
                        req.comments = data;
                        next();
                    }
                    else{
                        console.log(`comments for ticket id : ${ticket_id} do not exist`);
                        res.status(404).send({status: 404,
                                            message: `comments for ticket id : ${ticket_id} do not exist`})
                    }
               })
               .catch((err) => {
                console.log("ERROR :");
                console.log(err.stack);
                res.status(500).send(err);
               })
    },

    /**
     * getById: get ticket comment by i.d
     */
    getById: (req, res, next) => {
        const id = req.params.id;
        Comment.findAll({where : {id : id}})
        .then((data) => {
             if(data.length == 1){
                 console.log(`fetched comment with id : ${data[0].id}`);
                 res.status(200).send(data[0]);
             }
             else{
                 console.log(`comment with id : ${id} does not exist`);
                 res.status(404).send({status: 404,
                                     message: `Comment with id = ${id} does not exist`})
             }
        })
        .catch((err) => {
             console.log("ERROR :");
             console.log(err.stack);
             res.status(500).send(err);
        })
    },

    /**
     * create: add ticket comment 
     */
    create: (req, res, next) =>{
        const comment_object = req.body.comment;
        console.log(comment_object);
        Comment.create(comment_object)
        .then((resp) => {
             console.log(resp);
             res.status(200).send(resp);
        })
       .catch((err)=>{
             console.log("ERROR :");
             console.log(err.stack);
             res.status(500).send(err);
       })
    }
}

