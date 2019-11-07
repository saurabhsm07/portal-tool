const client = require('./../config/connections').client_sequelize;
const Sequelize = require('Sequelize');

const Comment = client.define('Article_comments',{
                                                        id: {
                                                            type : Sequelize.BIGINT,
                                                            primaryKey: true,
                                                            autoIncrement: true
                                                        },
                                                        url: {
                                                            type: Sequelize.TEXT,
                                                        },
                                                        source_id:{
                                                            type: Sequelize.BIGINT,
                                                        },
                                                        author_id:{
                                                            type: Sequelize.BIGINT,
                                                        },
                                                        body:{
                                                            type: Sequelize.TEXT,
                                                        },
                                                        html_url:{
                                                            type: Sequelize.TEXT
                                                        },
                                                        locale: {
                                                            type: Sequelize.TEXT
                                                        },
                                                        up_votes:{
                                                            type: Sequelize.NUMBER
                                                        },
                                                        down_votes:{
                                                            type: Sequelize.NUMBER
                                                        },
                                                        created_at:{
                                                            type: Sequelize.DATE,
                                                        },
                                                        updated_at: {
                                                            type: Sequelize.DATE
                                                        },
                                                        internal: {
                                                            type: Sequelize.BOOLEAN,
                                                        }

                                    }, { 
                                        timestamps: false
                                    })

module.exports = Comment