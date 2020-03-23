const client = require('./../config/connections').client;
const Sequelize = require('Sequelize');

const Organization_Products = client.define('organizationproducts', {
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

module.exports = Organization_Products;                            