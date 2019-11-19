const client = require('./../config/connections').client;
const Sequelize = require('Sequelize');

const Field = client.define('Article_fields',{
                                                        id: {
                                                            type : Sequelize.BIGINT,
                                                            primaryKey: true,
                                                            autoIncrement: true
                                                        },
                                                        active: {
                                                            type: Sequelize.BOOLEAN,
                                                        },
                                                        required:{
                                                            type: Sequelize.BOOLEAN,
                                                        },
                                                        field_name:{
                                                            type: Sequelize.TEXT,
                                                        },
                                                        field_value:{
                                                            type: Sequelize.ARRAY(Sequelize.JSON),
                                                        },
                                                        description:{
                                                            type: Sequelize.TEXT
                                                        },
                                                        removable: {
                                                            type: Sequelize.BOOLEAN
                                                        },
                                                        field_type:{
                                                            type: Sequelize.ENUM('text', 'textarea', 'checkbox', 'dropdown', 'multiselect')
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

module.exports = Field