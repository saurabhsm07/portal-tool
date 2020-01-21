const client = require('./../config/connections').client;
const Sequelize = require('Sequelize');

const Tag = client.define('tags', {
                                        id: {
                                            type: Sequelize.BIGINT,
                                            primaryKey: true,
                                            autoIncrement: true
                                        },
                                        name: {
                                            type: Sequelize.STRING,
                                        }

                            }, {
                                timestamps: false
                            });

module.exports = Tag;                            