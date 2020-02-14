const express = require('express');
const users = express.Router();
const md5 = require('md5');
const User = require("./../../../models/user");
const preprocessors = require('./../../../helpers/preprocessors');
const jwt_token = require('./../../../helpers/token_generator');
/**
 * GET: api path to get user record with specific id.
 */
users.get('/id/:id', (req, res) => {
    User.findAll({ where: { id: req.params.id } })
        .then((data) => {
            if (data.length == 1) {
                console.log(`fetched user with id : ${data[0].id}`);
                const user = data[0];
                res.status(200).send(user);
            }
            else {
                console.log(`user with id : ${req.params.id} does not exist`);
                res.status(404).send({
                    status: 404,
                    message: `user with id = ${req.params.id} does not exist`
                })
            }
        })
        .catch((err) => {
            console.log("ERROR :");
            console.log(err.stack);
            res.status(500).send(err);
        })
})

/**
 * POST: api path to log in to the db.
 */
users.post('/login', (req, res) => {
    User.findAll({ where: {email: req.body.user.email} })
        .then((data) => {
            if(data.length == 1){
                const user = data[0];
                console.log(`fetched user with id = ${user.id}`);
                if(user.password == md5(req.body.user.password)){
                    const token = jwt_token.create_token(user.id);
                    res.status(200).send({token});
                }else{
                    res.status(401).send({message: 'unauthorized user'});
                }
            } else {
                res.status(404).send({message: 'user does not exist'});
            }
        })
        .catch((err) => {
            console.log("ERROR :");
            console.log(err.stack);
            res.status(500).send(err);
        })
})

/**
 * POST: api path to add a segment record to the database.
 */
users.post('/', (req, res) => {
    User.findAll({ where: {email: req.body.user.email} })
        .then((data) => {
            if(data.length == 1){
                res.status(422).send({message: 'unparessable entity, user already exists'});
            }else{
                const user = {
                    name: req.body.user.name,
                    email: req.body.user.email,
                    password: md5(req.body.user.password),
                    created_at: req.body.user.created_at,
                    updated_at: req.body.user.updated_at,
                }
            
                User.create(user)
                    .then((resp) => {
                        const token = jwt_token.create_token(resp)

                        console.log(resp);
                        res.status(200).send({token : token});
                    })
                    .catch((err) => {
                        console.log("ERROR :");
                        console.log(err.stack);
                        res.status(500).send(err);
                    })
            }
        })

})

/**
 * PUT: api path to update a segment record with specific i.d
 */
users.put('/', (req, res) => {
    console.log(req.body.segment)
    const updateData = {
        name: req.body.segment.name,
        user_type: req.body.segment.user_type,
        group_ids: req.body.segment.group_ids,
        organization_ids: req.body.segment.organization_ids,
        tags: req.body.segment.tags,
        or_tags: req.body.segment.or_tags,
        updated_at: req.body.segment.updated_at,
    }

    Segment.findAll({ where: { id: req.body.segment.id } })
        .then((segment_obj) => {
            if (segment_obj.length == 1) {
                Segment.update(updateData, { where: { id: req.body.segment.id } })
                    .then((data) => {
                        if (data == 1) {
                            console.log('update successfull');
                            res.status(200).send({
                                status: 200,
                                message: `segment with id ${req.body.segment.id} updated successfully`
                            });
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
                    message: `segment with id ${req.body.category.id} does not exist`
                });
            }
        })
        .catch((err) => {
            console.log("ERROR :");
            console.log(err.stack);
            res.status(500).send(err);
        })
})

/**
 * DELETE: api path to delete segment with specific id 
 */
users.delete('/id/:id', (req, res) => {
    Segment.destroy({ where: { id: req.params.id } })
        .then((data) => {
            if (data == 1) {
                console.log(`successfully deleted segment with id = ${req.params.id}`);
                res.status(200).send({
                    status: 200,
                    message: `successfully deleted segment with id = ${req.params.id}`
                });
            }
            else {
                console.log(`segment with id ${req.params.id} does not exist`);
                res.status(404).send({
                    status: 404,
                    message: `segment with id ${req.params.id} does not exist`
                });
            }

        })
        .catch((err) => {
            console.log("ERROR :");
            console.log(err.stack);
            res.status(500).send(err);
        })
})

module.exports = users; // exporting users APIs module