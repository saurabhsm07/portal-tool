const client = require('./../config/connections').client;
const Sequelize = require('Sequelize');


/**
 * table saves created tickets custom fields values
 */
const Ticket_custom_field = client.define('ticket_custom_fields', {
                                        id: {
                                            type: Sequelize.BIGINT,
                                            primaryKey: true,
                                            autoIncrement: true
                                        },
                                        ticket_id: {
                                            type: Sequelize.BIGINT,
                                        },
                                        field_key: {
                                            type: Sequelize.STRING,
                                        },
                                        field_value: {
                                            type: Sequelize.INTEGER,
                                        },
                                        delete_status: {
                                            type: Sequelize.BOOLEAN,
                                        }
                            }, {
                                timestamps: false
                            });

module.exports = Ticket_custom_field;                            