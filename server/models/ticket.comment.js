const client = require('./../config/connections').client;
const Sequelize = require('Sequelize');

const Ticket_comment = client.define('Ticket_comments', {
                                            id: {
                                                type : Sequelize.BIGINT,
                                                primaryKey: true,
                                                autoIncrement: true
                                            },
                                            ticket_id:{
                                                type: Sequelize.BIGINT
                                            },
                                            comment_type:{
                                                type: Sequelize.STRING
                                            },
                                            body:{
                                                type: Sequelize.TEXT
                                            },
                                            html_body:{
                                                type: Sequelize.TEXT
                                            },
                                            plain_body:{
                                                type: Sequelize.TEXT
                                            },
                                            public:{
                                                type: Sequelize.BOOLEAN
                                            },
                                            author_id:{
                                                type: Sequelize.BIGINT
                                            },
                                            attachments:{
                                                type: Sequelize.TEXT
                                            },
                                            audit_id:{
                                                type: Sequelize.BIGINT
                                            },
                                            via:{
                                                type: Sequelize.STRING
                                            },
                                            via_data:{
                                                type: Sequelize.TEXT
                                            },
                                            metadata:{
                                                type: Sequelize.TEXT
                                            },
                                            created_at:{
                                                type: Sequelize.TIME
                                            },
                                        },{
                                            timestamps: false
                                        })

                                        module.exports = Ticket_comment                                        