const client = require('./../config/connections').client;
const Sequelize = require('Sequelize');

const Article = client.define('Articles', {
                                            id: {
                                                type : Sequelize.BIGINT,
                                                primaryKey: true,
                                                autoIncrement: true
                                            },
                                            url: {
                                                type: Sequelize.TEXT
                                            },
                                            html_url: {
                                                type: Sequelize.TEXT
                                            },
                                            title: {
                                                type: Sequelize.TEXT
                                            },
                                            body: {
                                                type: Sequelize.JSON
                                            },
                                            locale: {
                                                type: Sequelize.TEXT
                                            },
                                            author: {
                                                type: Sequelize.JSON
                                            },
                                            comment_disabled: {
                                                type: Sequelize.BOOLEAN
                                            },
                                            outdated_locales: {
                                                type: Sequelize.JSON
                                            },
                                            label_names: {
                                                type: Sequelize.JSON
                                            },
                                            draft: {
                                                type: Sequelize.JSON
                                            },
                                            promoted: {
                                                type: Sequelize.BOOLEAN
                                            },
                                            position: {
                                                type: Sequelize.NUMBER
                                            },
                                            vote_sum: {
                                                type: Sequelize.NUMBER
                                            },
                                            vote_count: {
                                                type: Sequelize.NUMBER
                                            },
                                            section: {
                                                type: Sequelize.JSON
                                            },
                                            user_segment_id: {
                                                type: Sequelize.BIGINT
                                            },
                                            permission_group_id: {
                                                type: Sequelize.BIGINT
                                            },
                                            created_at: {
                                                type: Sequelize.DATE
                                            },
                                            updated_at: {
                                                type: Sequelize.DATE
                                            },
                                            edited_at: {
                                                type: Sequelize.DATE
                                            },
                                            review_state: {
                                                type: Sequelize.JSON
                                            },
                                            article_form_id: {
                                                type: Sequelize.BIGINT
                                            }
                             },{
                                timestamps: false
                            })

module.exports = Article