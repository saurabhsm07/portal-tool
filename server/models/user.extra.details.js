const client = require('./../config/connections').client;
const Sequelize = require('Sequelize');

const Segment = client.define('user_extra_fields',{
                                                        id: {
                                                            type : Sequelize.BIGINT,
                                                            primaryKey: true,
                                                            autoIncrement: true
                                                        },
                                                        field_key: {
                                                            type: Sequelize.TEXT,
                                                        },
                                                        field_value:{
                                                            type: Sequelize.TEXT,
                                                        },
                                                        user_id:{
                                                            type: Sequelize.NUMBER,
                                                        },
                                                        delete_status:{
                                                            type: Sequelize.BOOLEAN
                                                        }

                                    }, { 
                                        timestamps: false
                                    })

module.exports = Segment