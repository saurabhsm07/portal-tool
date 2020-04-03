const CustomFieldValue = require("./../models/ticket.field.value");

module.exports = {

    /**
     * Method to fetch all ticket custom fields data with respect to specific ticket id
     */
    getCustomFieldValues : (req, res, next) => {
        const ticket_id = req.params.ticket_id
        CustomFieldValue.findAll({where: {ticket_id: ticket_id}})
                        .then((data) => {
                            if(data.length > 0){
                                res.status(200).send(data);
                            }
                            else {
                                console.log(`no data exists for ticket id = ${ticket_id}`);
                                res.status(404).send({message: `no data exists for ticket id = ${ticket_id}`});
                            }
                        })
                        .catch((err) => {
                            console.log("ERROR :");
                            console.log(err.stack);
                            res.status(500).send(err)
                        })
    },

    /**
     * Method to store custom fields data with respect to a specific ticket_id
     */
    saveCustomFieldValues : (req, res, next) => {
        const custom_field_data = req.body.custom_field_data;                              //custom form specifc ticket fields to be saved in ticket_custom_fields database                             

        console.log('REQUEST TICKET CUSTOM DATA: ', custom_field_data);
        console.log('TICKET ID FOR CUSTOM FIELDS: ', req.ticket_id)
        // custom_field_data.bulkCreate(custom_field_data)
        //                  .then((data) => {
        //                      console.log(Data)
        //                      res.status(200).send({message: `saved ${data.length} custom fields for ticket id = ${req.ticket_id} `})
        //                  })
        //                  .catch((error) => {
        //                     console.log("ERROR :");
        //                     console.log(err.stack);
        //                     res.status(500).send(err)
        //                  })
    }
}