const client = require('./../config/connections').client;
const Sequelize = require('Sequelize');

const Organization = client.define('Organizations', {
                                                id: {
                                                    type: Sequelize.BIGINT,
                                                    primaryKey: true,
                                                    autoIncrement: true
                                                },
                                                name: {
                                                    type: Sequelize.STRING,
                                                },
                                                domain_names: {
                                                    type: Sequelize.STRING,
                                                },
                                                group_id: {
                                                    type: Sequelize.BIGINT,
                                                },
                                                shared_tickets: {
                                                    type: Sequelize.BOOLEAN,
                                                },
                                                shared_comments: {
                                                    type: Sequelize.BOOLEAN,
                                                },
                                                status: {
                                                    type: Sequelize.BOOLEAN,
                                                },
                                                details: {
                                                    type: Sequelize.STRING,
                                                },
                                                notes: {
                                                    type: Sequelize.STRING,
                                                },
                                                created_at: {
                                                    type: Sequelize.BOOLEAN,
                                                },
                                                updated_at: {
                                                    type: Sequelize.DATE,
                                                },
                                                created_by: {
                                                    type: Sequelize.BIGINT,
                                                },
                                                updated_by: {
                                                    type: Sequelize.BIGINT,
                                                }

                            }, {
                                timestamps: false
                            });

module.exports = Organization;                            