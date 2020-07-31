const client = require('./../config/connections').client;
const Sequelize = require('Sequelize');

const Segment = client.define('user_details',{
                                                        id: {
                                                            type : Sequelize.BIGINT,
                                                            primaryKey: true,
                                                            autoIncrement: true
                                                        },
                                                        data_value: {
                                                            type: Sequelize.TEXT,
                                                        },
                                                        field_type:{
                                                            type: Sequelize.TEXT,
                                                        },
                                                        user_id:{
                                                            type: Sequelize.NUMBER,
                                                        }

                                    }, { 
                                        timestamps: false
                                    })

module.exports = Segment