const client = require('./../config/connections').client;
const Sequelize = require('Sequelize');

const User_organizations = client.define('user_organizations', {
                                        id: {
                                            type: Sequelize.BIGINT,
                                            primaryKey: true,
                                            autoIncrement: true
                                        },
                                        user_id: {
                                            type: Sequelize.BIGINT,
                                        },
                                        organization_id: {
                                            type: Sequelize.BIGINT,
                                        },
                                        default_status: {
                                            type: Sequelize.INTEGER,
                                        }

                            }, {
                                timestamps: false
                            });

module.exports = User_organizations;                            