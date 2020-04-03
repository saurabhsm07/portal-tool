const Ticket = require("./../models/ticket");
const preprocessors = require("./../helpers/preprocessors/tickets.preprocessors");
const PHPUnserialize = require('php-unserialize');
const client = require("./../config/connections").client;

module.exports = {
    /**
     * getTicketsByRequester: get list of tickets for perticular requester
     */
    getTicketsByRequester: (req, res, next) => {
        const {id, name} =  req.user.dataValues;
        console.log(id);
        Ticket.findAll({where: { requester_id: id}})
        .then((data) => {
            if (data.length > 0) {
                console.log(`fetched ${data.length} tickets`);
                res.status(200).send({ tickets : data});
            } else {
                console.log(`no ticket data available for requester = ${id}, ${name}`);
                res.status(404).send({
                    status: 404,
                    message: `No ticket data available for requester = ${name}`
                });
            }
        })
        .catch((err) => {
            console.log("ERROR :");
            console.log(err.stack);
            res.status(500).send(err);
        })
    },

    /**
     * getTicketsById: get ticket by i.d
     */
    getById: (req, res, next) => {
        const id =  req.params.id;
        console.log(id)
        Ticket.findAll({where: { id: id}})
        .then((data) => {
            if (data.length == 1) {
                console.log(`fetched ${data[0].id} tickets`);
                res.status(200).send({ ticket : data});
            } else {
                console.log(`no ticket data available for ticket id = ${id}`);
                res.status(404).send({
                    status: 404,
                    message: `No ticket data available for id = ${name}`
                });
            }
        })
        .catch((err) => {
            console.log("ERROR :");
            console.log(err.stack);
            res.status(500).send(err);
        })
    },

    /**
     * create: method to save ticket request data to the database
     */
    create: (req, res, next) => {
        const ticket_object = req.body.ticket_object;                              // ticket data request to be saved in the database

        console.log(`REQUEST TICKET DATA: `,ticket_object)
        console.log('REQUEST TICKET CUSTOM DATA: ', req.body.ticket_custom_fields);
        Ticket.create(preprocessors.saveTicketObject(ticket_object))
        .then((resp) => {
             console.log(resp);
             if(req.body.ticket_custom_fields != null){
                req.ticket_id = resp[0].id                                   // ticket id of the forign key for the ticket custom fields entry
                next()
             }else{
                 console.log(`created ticket with id = ${resp.id}`)
                res.status(200).send({id: resp.id})
             }
             
        })
       .catch((err)=>{
             console.log("ERROR :");
             console.log(err.stack);
             res.status(500).send(err);
       })
    },


    /**
     * update: update ticket update time
     */
    update: () => {

    }

}
