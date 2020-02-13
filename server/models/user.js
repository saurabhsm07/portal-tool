const client = require('./../config/connections').client;
const Sequelize = require('Sequelize');

const User = client.define('user', {
    id: {
        type: Sequelize.BIGINT,
        primaryKey: true,
        autoIncrement: true
    },
    name: {
        type: Sequelize.NUMBER,
    },
    email: {
        type: Sequelize.TEXT,
    },
    email_verified_status: {
        type: Sequelize.TEXT,
    },
    email_verified_at: {
        type: Sequelize.TEXT,
    },
    password: {
        type: Sequelize.TEXT,
    },
    temp_password: {
        type: Sequelize.TEXT,
    },
    alias: {
        type: Sequelize.DATE,
    },
    signature: {
        type: Sequelize.DATE,
    },
    details: {
        type: Sequelize.DATE,
    },
    is_admin: {
        type: Sequelize.DATE,
    },
    remember_token: {
        type: Sequelize.DATE,
    },
    role_id: {
        type: Sequelize.DATE,
    },
    ticket_access: {
        type: Sequelize.DATE,
    },
    language_id: {
        type: Sequelize.DATE,
    },
    timezone_id: {
        type: Sequelize.DATE,
    },
    suspend_status: {
        type: Sequelize.DATE,
    },
    delete_status: {
        type: Sequelize.DATE,
    },
    created_at: {
        type: Sequelize.DATE,
    },
    updated_at: {
        type: Sequelize.DATE,
    },
    status: {
        type: Sequelize.DATE,
    },
    user_type: {
        type: Sequelize.DATE,
    },
    last_login_at: {
        type: Sequelize.DATE,
    }

}, {
        timestamps: false
    })

module.exports = User