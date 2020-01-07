const client = require('./../config/connections').client;
const Sequelize = require('Sequelize');

const Label = client.define('Article_labels',{
                                                        id: {
                                                            type : Sequelize.BIGINT,
                                                            primaryKey: true,
                                                            autoIncrement: true
                                                        },
                                                        name:{
                                                            type: Sequelize.TEXT,
                                                        }
}, { 
    timestamps: false
})

module.exports = Label;