const client = require('./../config/connections').client;
const Sequelize = require('Sequelize');

const Segment = client.define('user_segment',{
                                                        id: {
                                                            type : Sequelize.BIGINT,
                                                            primaryKey: true,
                                                            autoIncrement: true
                                                        },
                                                        user_type: {
                                                            type: Sequelize.NUMBER,
                                                        },
                                                        name:{
                                                            type: Sequelize.TEXT,
                                                        },
                                                        group_ids:{
                                                            type: Sequelize.TEXT,
                                                        },
                                                        organization_ids:{
                                                            type: Sequelize.TEXT,
                                                        },
                                                        tags:{
                                                            type: Sequelize.TEXT,
                                                        },
                                                        or_tags:{
                                                            type: Sequelize.TEXT,
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

module.exports = Segment