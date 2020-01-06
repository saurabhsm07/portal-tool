const client = require('./../config/connections').client;
const Sequelize = require('Sequelize');

const Label = client.define('Article_form',{
                                                        id: {
                                                            type : Sequelize.BIGINT,
                                                            primaryKey: true,
                                                            autoIncrement: true
                                                        },
                                                        name:{
                                                            type: Sequelize.TEXT,
                                                        }
})

module.exports = Label;