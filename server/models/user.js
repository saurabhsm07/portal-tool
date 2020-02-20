const client = require('./../config/connections').client;
const Sequelize = require('Sequelize');

const User = client.define('user', {
    id: {
        type: Sequelize.BIGINT,
        primaryKey: true,
        autoIncrement: true
    },
    name: {
        type: Sequelize.TEXT,
    },
    email: {
        type: Sequelize.TEXT,
    },
    email_verified_status: {
        type: Sequelize.BOOLEAN,
    },
    email_verified_at: {
        type: Sequelize.DATE,
    },
    password: {
        type: Sequelize.TEXT,
    },
    temp_password: {
        type: Sequelize.TEXT,
    },
    alias: {
        type: Sequelize.TEXT,
    },
    signature: {
        type: Sequelize.TEXT,
    },
    details: {
        type: Sequelize.TEXT,
    },
    is_admin: {
        type: Sequelize.BOOLEAN,
    },
    remember_token: {
        type: Sequelize.TEXT,
    },
    role_id: {
        type: Sequelize.BOOLEAN,
    },
    ticket_access: {
        type: Sequelize.BOOLEAN,
    },
    language_id: {
        type: Sequelize.INTEGER,
    },
    timezone_id: {
        type: Sequelize.BIGINT,
    },
    suspend_status: {
        type: Sequelize.BOOLEAN,
    },
    delete_status: {
        type: Sequelize.BOOLEAN,
    },
    created_at: {
        type: Sequelize.DATE,
    },
    updated_at: {
        type: Sequelize.DATE,
    },
    status: {
        type: Sequelize.BOOLEAN,
    },
    user_type: {
        type: Sequelize.TEXT,
    },
    last_login_at: {
        type: Sequelize.DATE,
    }

}, {
        timestamps: false
    })

module.exports = User