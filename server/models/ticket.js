const client = require('./../config/connections').client;
const Sequelize = require('Sequelize');

const Ticket = client.define('Tickets', {
    id: {
        type : Sequelize.BIGINT,
        primaryKey: true,
        autoIncrement: true
    },
    subject: {
        type: Sequelize.TEXT,
    },
    description: {
        type: Sequelize.TEXT,
    },
    priority:{
        type: Sequelize.INTEGER,
    },
    status: {
        type: Sequelize.INTEGER,
    },
    recipient: {
        type: Sequelize.INTEGER,
    },
    requester_id:{
        type: Sequelize.BIGINT,
    },
    submitter_id :{
        type: Sequelize.BIGINT,
    },
    assignee_id:{
        type: Sequelize.BIGINT,
    },
    organization_id:{
        type: Sequelize.BIGINT,
    },
    group_id:{
        type: Sequelize.BIGINT,
    },
    collaborator_ids:{
        type: Sequelize.TEXT,
    },
    email_cc_ids: {
        type: Sequelize.TEXT,
    },
    follower_ids:{
        type: Sequelize.TEXT,
    },
    via:{
        type: Sequelize.TEXT,
    },
    satisfaction_rating:{
        type: Sequelize.INTEGER,
    },
    satisfaction_id:{
        type: Sequelize.INTEGER,
    },
    sharing_agreement_ids:{
        type: Sequelize.TEXT,
    },
    followup_ids:{
        type: Sequelize.TEXT,
    },
    macro_ids:{
        type: Sequelize.TEXT,
    },
    ticket_form_id:{
        type: Sequelize.BIGINT,
    },
    tag_ids:{
        type: Sequelize.TEXT,
    },
    product_id:{
        type: Sequelize.BIGINT,

    },
    schedule_id:{
        type: Sequelize.BIGINT,

    },
    sla_id:{
        type: Sequelize.BIGINT,

    },
    created_by:{
        type: Sequelize.BIGINT,

    },
    updated_by:{
        type: Sequelize.BIGINT,

    },
    created_at:{
        type: Sequelize.TIME,

    },
    updated_at:{
        type: Sequelize.TIME,

    }
},{
    timestamps: false
})

module.exports = Ticket