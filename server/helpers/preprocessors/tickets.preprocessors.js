sequelize = require('Sequelize')

module.exports = {

    /**
     * method to process the POST ticket object to save it into the database
     */
    saveTicketObject: (ticket) => {
        return {
            subject: ticket.subject,
            description: ticket.description,
            requester_id: ticket.requester_id,
            submitter_id: ticket.requester_id,
            created_by: ticket.requester_id,
            updated_by: ticket.requester_id,
            product_id: ticket.product_id,
            organization_id: ticket.organization_id,
            ticket_form_id: ticket.ticket_form_id,
            priority: ticket.priority,
            email_cc_ids: ticket.email_cc_ids.join(),
            created_at: ticket.created_at,
            updated_at: ticket.updated_at
        }
    },

    /**
     * method to process the search tickets request and create a query object for sequelise find all query
     */
    searchQueryObject: (query) => {
        
        // console.log(query);
        query_array_kv = query.split(" ").map((param) => {param_kv = param.split(':'); return {'key':param_kv[0], 'value':param_kv[1]}})
        // console.log(query_array_kv)
        query_object = {}
        query_array_kv.forEach(ele => {
            query_object[ele['key']] = ele['value']
        });
        
        let findQuery = {}
        findQuery.attributes = ['id', 'subject', 'created_at', 'updated_at', 'status'];
        findQuery.where = {};
        // console.log(query_object)
        switch(query_object.type){
            case 'requester':
                 findQuery.where = { requester_id: query_object.id};
                 break;
            case 'cc_requests':
                findQuery.where = { email_cc_ids: {[sequelize.Op.like] :'%'+query_object.id+'%'}};
                break;
            case 'org_requests':
                findQuery.where = { organization_id: query_object.ids.split(',')};
                break;
            default:
                console.log(`CANNOT CREATE query for type = ${findQuery.type}`)

        }

        console.log(findQuery);
        return findQuery;
    },

    /**
     * method formats ticket list data to be sent on API request 
     */

     sendTicketList: (ticketList) => {
        return ticketList;            
        }
}