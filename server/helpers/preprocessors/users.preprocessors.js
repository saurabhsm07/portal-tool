
module.exports = {

    /**
     * process user Obj before sending it to the client app
     */
    clientUserObj : (user) => {
        return {
            id: user.id,
            name: user.name,
            email:user.email,
            remember_token: user.remember_token,
            alias: user.alias,
            signature: user.signature,
            details: user.details,
            is_admin: user.is_admin,
        }
    },

    /**
     * processes to be performed before saving user object to db
     */
    saveUserObj : (user) => {
         
    },

    /**
     * verify user object
     */
    verifyUserObj: (user) => {
        let validity = true;
        console.log("in user object validations");
        // console.log(user);
        // console.log(Object.keys(user))
        Object.keys(user).forEach(key => {
            if((user[key] == null) || (user[key] == '')){
                validity = false;
            }
                
        });
        console.log(validity);
        return validity;
    },

    /**
     * Method updates ticket object with requester and assignee information
     */

    updateRequesterAssigneeInfo: (ticket, user_info) => {
        user_info.forEach((user) => {
            if(user.id == ticket.requester_id){
                ticket.dataValues.requester_name = user.name;
                ticket.dataValues.requester_email = user.email;
            }
            if (user.id == ticket.assignee_id){
                ticket.dataValues.assignee_name = user.name;
                ticket.dataValues.assignee_email = user.email;
            }
            if (user.id == ticket.submitter_id){ // for submitter id 
                ticket.dataValues.submitter_name = user.name;
                ticket.dataValues.submitter_email = user.email;
            }
            // else{
            //     console.log(`invalid user ID = ${user.id} for ticket = ${ticket.id}`)
            // }
        })

        return ticket;
    }


}