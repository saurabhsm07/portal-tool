const md5 = require('md5');
const User = require("./../models/user");
const jwt_token = require('./../helpers/encoders/token_generator');
const preprocessor = require('./../helpers/preprocessors/users.preprocessors');
module.exports = {

    load: (req, res, next) => {
        const id = req.params.id;
        console.log(id);
        User.findAll({ where: { id: id } })
            .then((data) => {
                if (data.length == 1) {
                    const user = data[0];
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

    create: async (req, res, next) => {
        User.findAll({ where: { email: req.body.user.email } })
            .then((data) => {
                if (data.length == 1) {
                    res.status(422).send({ message: 'unparessable entity, user already exists' });
                } else {
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
                            res.status(200).send({ userObj });
                        })
                        .catch((err) => {
                            console.log("ERROR :");
                            console.log(err.stack);
                            res.status(500).send(err);
                        })
                }
            })
    },

    update: async (req, res, next) => {
        console.log(req.body.user)
        const userObj = req.body.user;
        const updateData = {
            name: userObj.name,
            email: userObj.email,
            password: md5(userObj.password),
            updated_at: userObj.updated_at
        }

        User.findAll({ where: { id: userObj.id } })
            .then((user) => {
                if (user.length == 1) {
                    User.update(updateData, { where: { id: user.id } })
                        .then((data) => {
                            if (data == 1) {
                                console.log('update successfull');
                                res.status(200).send({
                                    status: 200,
                                    message: `user with id ${user.id} updated successfully`
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
    }


}