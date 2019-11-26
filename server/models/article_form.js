const client = require('./../config/connections').client;
const Sequelize = require('Sequelize');

const Form = client.define('Article_form',{
                                                        id: {
                                                            type : Sequelize.BIGINT,
                                                            primaryKey: true,
                                                            autoIncrement: true
                                                        },
                                                        active: {
                                                            type: Sequelize.BOOLEAN,
                                                        },
                                                        name:{
                                                            type: Sequelize.TEXT,
                                                        },
                                                        article_fields:{
                                                            type: Sequelize.TEXT,
                                                        },
                                                        default_form: {
                                                            type: Sequelize.BOOLEAN
                                                        },
                                                        created_at: {
                                                            type: Sequelize.DATE,
                                                        },
                                                        updated_at: {
                                                            type: Sequelize.DATE,
                                                        }

                                    }, { 
                                        timestamps: false
                                    })

module.exports = Form