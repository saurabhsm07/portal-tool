const client = require('./../config/connections').client;
const Sequelize = require('Sequelize');

const Category = client.define('Categories', {
                                                id: {
                                                    type: Sequelize.BIGINT,
                                                    primaryKey: true,
                                                    autoIncrement: true
                                                },
                                                name: {
                                                    type: Sequelize.STRING,
                                                },
                                                description: {
                                                    type: Sequelize.TEXT,
                                                },
                                                locale: {
                                                    type: Sequelize.STRING,
                                                },
                                                url: {
                                                    type: Sequelize.TEXT,
                                                },
                                                html_url: {
                                                    type: Sequelize.TEXT,
                                                },
                                                position: {
                                                    type: Sequelize.INTEGER,
                                                },
                                                outdated: {
                                                    type: Sequelize.BOOLEAN,
                                                },
                                                icon_url: {
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
                            });

module.exports = Category;                            