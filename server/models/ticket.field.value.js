const client = require('./../config/connections').client;
const Sequelize = require('Sequelize');

const Ticket_field_value = client.define('ticket_field_values', {
                                        id: {
                                            type: Sequelize.BIGINT,
                                            primaryKey: true,
                                            autoIncrement: true
                                        },
                                        field_id: {
                                            type: Sequelize.BIGINT,
                                        },
                                        field_value: {
                                            type: Sequelize.STRING,
                                        },
                                        order_no: {
                                            type: Sequelize.INTEGER,
                                        },
                                        delete_status: {
                                            type: Sequelize.BOOLEAN,
                                        }
                            }, {
                                timestamps: false
                            });

module.exports = Ticket_field_value;                            