module.exports = {

    saveTicketObject: (ticket) => {
        return {
            subject: ticket.subject,
            description: ticket.description,
            requester_id: ticket.requester_id,
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
    }
}