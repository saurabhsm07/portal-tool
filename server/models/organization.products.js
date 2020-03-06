const client = require('./../config/connections').client;
const Sequelize = require('Sequelize');

const User_organizations = client.define('organizationproducts', {
                                        id: {
                                            type: Sequelize.BIGINT,
                                            primaryKey: true,
                                            autoIncrement: true
                                        },
                                        product_id: {
                                            type: Sequelize.BIGINT,
                                        },
                                        organization_id: {
                                            type: Sequelize.BIGINT,
                                        }
                            }, {
                                timestamps: false
                            });

module.exports = User_organizations;                            