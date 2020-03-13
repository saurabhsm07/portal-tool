const client = require('./../config/connections').client;
const Sequelize = require('Sequelize');

const Ticket_field = client.define('Ticket_fields', {
                                    id: {
                                        type : Sequelize.BIGINT,
                                        primaryKey: true,
                                        autoIncrement: true
                                    },
                                    field_key:{
                                        type: Sequelize.TEXT
                                    },
                                    field_type:{
                                        type: Sequelize.TEXT
                                    },
                                    status:{
                                        type: Sequelize.BOOLEAN
                                    },
                                    remove_status:{
                                        type: Sequelize.BOOLEAN
                                    },
                                    show_status:{
                                        type: Sequelize.BOOLEAN
                                    },
                                    system_status:{
                                        type: Sequelize.BOOLEAN
                                    },
                                    agent_description:{
                                        type: Sequelize.TEXT
                                    },
                                    permission_id:{
                                        type: Sequelize.BIGINT
                                    },
                                    agent_title:{
                                        type: Sequelize.STRING
                                    },
                                    agent_req_id:{
                                        type: Sequelize.INTEGER
                                    },
                                    user_title:{
                                        type: Sequelize.STRING
                                    },
                                    user_req_id:{
                                        type: Sequelize.INTEGER
                                    },
                                    user_description:{
                                        type: Sequelize.TEXT
                                    },
                                    created_at:{
                                        type: Sequelize.BIGINT
                                    },
                                    updated_at:{
                                        type: Sequelize.BIGINT
                                    }
                                },{
                                    timestamps: false
                                })

                                        module.exports = Ticket_field