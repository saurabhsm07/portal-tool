const client = require('./../config/connections').client;
const Sequelize = require('Sequelize');

const Ticket_form = client.define('Ticket_forms', {
                                            id: {
                                                type : Sequelize.BIGINT,
                                                primaryKey: true,
                                                autoIncrement: true
                                            },
                                            agent_form_name:{
                                                type: Sequelize.TEXT
                                            },
                                            enduser_form_name:{
                                                type: Sequelize.TEXT
                                            },
                                            product_id:{
                                                type: Sequelize.INTEGER
                                            },
                                            position:{
                                                type: Sequelize.INTEGER
                                            },
                                            active:{
                                                type: Sequelize.BOOLEAN
                                            },
                                            end_user_visible:{
                                                type: Sequelize.BOOLEAN
                                            },
                                            default_status:{
                                                type: Sequelize.BOOLEAN
                                            },
                                            ticket_field_ids:{
                                                type: Sequelize.TEXT
                                            },
                                            created_at:{
                                                type: Sequelize.TIME
                                            },
                                            updated_at:{
                                                type: Sequelize.TIME
                                            },
                                            created_by:{
                                                type: Sequelize.BIGINT
                                            },
                                            updated_by:{
                                                type: Sequelize.BIGINT
                                            }
                                        },{
                                            timestamps: false
                                        })

                                        module.exports = Ticket_form