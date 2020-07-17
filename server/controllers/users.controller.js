const md5 = require('md5');
const User = require("./../models/user");
const UserOrganizations = require("./../models/user.organizations");
const jwt_token = require('./../helpers/encoders/token_generator');
const preprocessor = require('./../helpers/preprocessors/users.preprocessors');
module.exports = {

    load: (req, res, next) => {
        const id = req.params.id;
        console.log(id);
        User.findAll({ attributes: ['created_at', 'updated_at', 'last_login_at', 'name', 'email', 'id'],
                        where: { id: id } })
            .then((data) => {
                if (data.length == 1) {
                    const user = data[0];
                    console.log(user);
                    console.log(`fetched user with id = ${user.id}`);
                    res.status(200).send({ user });
                } else {
                    res.status(404).send({ message: 'user does not exist' });
                }
            })
            .catch((err) => {
                console.log("ERROR :");
                console.log(err.stack);
                res.status(500).send(err);
            })
    },


    login: async (req, res, next) => {
        const { email, password } = req.body.user;
        User.findAll({ where: { email: email } })
            .then((data) => {
                if (data.length == 1) {
                    let user = data[0];
                    console.log(`fetched user with id = ${user.id}`);
                    if (user.password == md5(password)) {
                        const token = 'Bearer ' + jwt_token.create_token(user.id);
                        user.remember_token = token;
                        user = preprocessor.clientUserObj(user);
                        res.status(200).send(user);
                    } else {
                        res.status(401).send({ message: 'unauthorized user' });
                    }
                } else {
                    res.status(404).send({ message: 'user does not exist' });
                }
            })
            .catch((err) => {
                console.log("ERROR :");
                console.log(err.stack);
                res.status(500).send(err);
            })
    },

    logout: (req, res) => {
        const {user} = req;
        // console.log(user);
        user.dataValues.last_login_at = new Date(Date.now());
       
        User.update(user.dataValues, {where: { id: user.id}})
            .then((data) =>{
                if(data == 1){
                    res.status(200).send({logoutStatus: true});
                }
            })
            .catch((err) => {
                console.log("ERROR :");
                console.log(err.stack);
                res.status(500).send(err);
            })
    },

    create: async (req, res, next) => {
        User.findAll({ where: { email: req.body.user.email } })
            .then((data) => {
                if (data.length == 1) {
                    res.status(422).send({ message: 'unparessable entity, user already exists' });
                } else {
                 
                    if(preprocessor.verifyUserObj(req.body.user) == true){
                        const user = {
                            name: req.body.user.name,
                            email: req.body.user.email,
                            password: md5(req.body.user.password),
                            created_at: req.body.user.created_at,
                            updated_at: req.body.user.updated_at,
                        }
    
                        User.create(user)
                            .then((resp) => {
                                let userObj = resp
                                const token = 'Bearer ' + jwt_token.create_token(resp)
                                userObj.remember_token = token;
                                userObj = preprocessor.clientUserObj(userObj);
                                res.status(200).send(userObj);
                            })
                            .catch((err) => {
                                console.log("ERROR :");
                                console.log(err.stack);
                                res.status(500).send(err);
                            })
                    }else{
                        res.status(400).send({message: 'improper field values'});
                    }
                
                }
            })
    },

    update: async (req, res, next) => {
        // console.log(req.body.user)
        const userObj = req.body.user;
      
        User.findAll({ where: { id: userObj.id } })
            .then((user) => {
                if (user.length == 1) {
                    User.update(userObj, { where: { id: userObj.id } })
                        .then((data) => {
                            if (data == 1) {
                                console.log(`user with id ${userObj.id} updated successfully`);
                                res.status(200).send(userObj);
                            }

                        })
                        .catch((err) => {
                            console.log("ERROR :");
                            console.log(err.stack);
                            res.status(500).send(err);
                        })
                }
                else {
                    res.status(404).send({
                        status: 404,
                        message: `user with id ${user.id} does not exist`
                    });
                }
            })
            .catch((err) => {
                console.log("ERROR :");
                console.log(err.stack);
                res.status(500).send(err);
            })
    },

    delete: async (req, res, next) => {
        const id = req.params.id
        User.destroy({ where: { id } })
            .then((data) => {
                if (data == 1) {
                    console.log(`successfully deleted user with id = ${id}`);
                    res.status(200).send({
                        status: 200,
                        message: `successfully deleted user with id = ${id}`
                    });
                }
                else {
                    console.log(`user with id ${id} does not exist`);
                    res.status(404).send({
                        status: 404,
                        message: `user with id ${id} does not exist`
                    });
                }

            })
            .catch((err) => {
                console.log("ERROR :");
                console.log(err.stack);
                res.status(500).send(err);
            })
    },

    getOrganizations: (req, res) => {
        // console.log(req.user)
        const user_id = req.user.id
        UserOrganizations.findAll({where: {user_id : user_id}})
                         .then((data) => {
                            if (data.length > 0) {
                                console.log(`user ${user_id} has ${data.length} organizations`);
                                const user_organizations = {
                                    user_id: user_id,
                                    organization_ids : data.map(val => val.organization_id)
                                }
                                res.status(200).send(user_organizations);
                            }
                            else {
                                console.log(`organizations for user id ${user_id} do not exist`);
                                res.status(404).send({
                                    status: 404,
                                    message: `organizations for user id ${user_id} do not exist`
                                });
                            }
            
                        })
                         .catch((err) => {
                            console.log("ERROR :");
                            console.log(err.stack);
                            res.status(500).send(err);
                        })
    },

    getUserOrgProducts: (req, res) => {
        res.send(req.org_products);
    },


    /**
     * Method gets user ids mapped for specific email ids
     * Used IN: create ticket method (cc_email_ids field)
     */
    getIdforemail : (req, res, next) => {
        if(req.body.ticket_object.email_cc_ids.length > 0){
            const email_ids = req.body.ticket_object.email_cc_ids
            User.findAll({attributes : ['id'], where: {email : email_ids}})
                .then((data) => {
                    if(data.length > 0){
                        
                        req.body.ticket_object.email_cc_ids =  data.map((value) => value.dataValues.id);
                        // console.log(req.body.ticket_object.email_cc_ids);
                    }
                        next();

                })
                .catch((err) => {
                    console.log("ERROR :");
                    console.log(err.stack);
                    res.status(500).send(err);
                })
        }
        else{
            next();
        }
    },

    /**
     * Method gets requester, assignee and submitter name and email for a perticular ticket
     */
    getTicketUserInfo: (req, res, next) => {
        let ticket = req.ticket
        User.findAll({attributes: ['id', 'name','email'], where: {id : [ticket.requester_id, ticket.assignee_id, ticket.submitter_id]}})
            .then((data) => {
                if(data.length > 0){
                    ticket = preprocessor.updateRequesterAssigneeInfo(ticket, data);        // update ticket onject with user
                    // console.log(`Ticket requester: ${ticket.requester_name} \n assignee: ${ticket.assignee_name} \n submitter: ${ticket.submitter_name}`)
                    // console.log(ticket.dataValues)
                    res.status(200).send(ticket)
                }else {
                    console.log(`No user data available for requester, submitter and assignee for ticket id = ${ticket.id}`);
                    res.status(200).send({
                        message: `No user data available for requester, submitter and assignee for ticket id = ${ticket.id}`
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
     * Method names, * of people commenting on perticular ticket
     */
    getCommentUserInfo: (req, res, next) => {
        let comments = req.comments;
        
        let authorIds = [... new Set(comments.map((comment) => { return comment.author_id}))];
        User.findAll({attributes: ['id', 'name', 'email'], where: {id : [authorIds]}})
            .then((users) => {
                comments = comments.map((comment) => {
                    comment.dataValues.author_name = users.filter(user => user.id == comment.author_id)[0].name;
                    return comment;
                })
         
                res.status(200).send(comments);

            })
            .catch((err) => {
                console.log("ERROR :");
                console.log(err.stack);
                res.status(500).send(err);
            })
    }
}