const client = require('./../config/connections').client_sequelize;
const Sequelize = require('Sequelize');

const Attachment = client.define('Article_attachments',{
                                                        id: {
                                                            type : Sequelize.BIGINT,
                                                            primaryKey: true,
                                                            autoIncrement: true
                                                        },
                                                        url: {
                                                            type: Sequelize.TEXT,
                                                        },
                                                        article_id:{
                                                            type: Sequelize.BIGINT,
                                                        },
                                                        file_name:{
                                                            type: Sequelize.TEXT,
                                                        },
                                                        content_url:{
                                                            type: Sequelize.TEXT,
                                                        },
                                                        content_type:{
                                                            type: Sequelize.TEXT
                                                        },
                                                        size: {
                                                            type: Sequelize.NUMBER
                                                        },
                                                        inline:{
                                                            type: Sequelize.BOOLEAN
                                                        },
                                                        created_at:{
                                                            type: Sequelize.DATE,
                                                        },
                                                        updated_at: {
                                                            type: Sequelize.DATE
                                                        }

                                    }, { 
                                        timestamps: false
                                    })

module.exports = Attachment