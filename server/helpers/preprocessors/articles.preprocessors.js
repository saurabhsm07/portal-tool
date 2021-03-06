const { Op } = require("sequelize");


const preprocessors = {};





preprocessors.createListArticlesQuery = (requestParams, queryOn) => {

    let dbQueryParameters = {};
    dbQueryParameters.attributes = ['id', 'title', 'created_at', 'updated_at', 'section', 'author', 'draft'];
    dbQueryParameters.order = [['created_at', 'DESC']];
    if (queryOn == 'section') {
        dbQueryParameters.where = { section: { id: requestParams.id } };
    }
    if (queryOn == 'author') {
        dbQueryParameters.where = {
            author: {
                [Op.substring]: '"id":' + requestParams.id
            }
        }
    }

if (requestParams.offset != undefined) {
    dbQueryParameters.offset = parseInt(requestParams.offset);
}
if (requestParams.limit != undefined) {
    dbQueryParameters.limit = parseInt(requestParams.limit);
}

// console.log(dbQueryParameters)
return dbQueryParameters;
}


/**
 * 
 * @param  article : article object to be processed before returning to the client  
 */
preprocessors.clientArticleObj = (article) => {
    const article_json_fields = ['author', 'review_state', 'draft', 'section', 'label_names'];

    for (let i = 0; i < article_json_fields.length; i++) {
        try {
            if (article[article_json_fields[i]] != undefined)
                if (article[article_json_fields[i]] != null) {
                    article[article_json_fields[i]] = JSON.parse(article[article_json_fields[i]]);
                }

        }
        catch (error) {
            console.log(error);
        }

    }
    if (article.article_form_id != 0) {
        let article_body = JSON.parse(article['body']);
        article.body = Object.keys(article_body).map((key) => { return { key: key, value: article_body[key] } });
    }




    return article;
}

/**
 * 
 * @param  article : article object to be processed before saving to the db  
 */
preprocessors.saveArticleObj = (article) => {
    return {
        url: 'http://localhost:4200/article/',
        html_url: 'http://localhost:5000/api/article/',
        title: article.title,
        body: article.body,
        article_form_id: article.article_form_id,
        locale: 'en-us',
        author: article.author,
        draft: JSON.stringify(article.draft),
        comment_disabled: true,
        promoted: true,
        position: 0,
        up_vote: 0,
        down_vote: 0,
        section: article.section,
        user_segment_id: article.user_segment_id,
        label_names: article.label_names,
        permission_group_id: 10000,
        created_at: article.created_at,
        updated_at: article.updated_at,
        edited_at: article.updated_at,
        review_state: article.review_state,

    };
}

/**
 * 
 * @param  article : article object to be processed before updating db record  
 */
preprocessors.updateArticleObj = (article) => {
    return {
        title: article.title,
        body: article.body,
        header: article.header,
        locale: 'en-us',
        draft: JSON.stringify(article.draft),
        comment_disabled: true,
        promoted: true,
        position: 0,
        up_vote: 0,
        down_vote: 0,
        section: article.section,
        user_segment_id: article.user_segment_id,
        label_names: article.label_names,
        permission_group_id: 1526652,
        updated_at: article.updated_at,
        edited_at: article.updated_at,
        review_state: article.review_state
    }
}



/**
 * 
 * @param  articles : articles array to be processed before returning to the client  
 */
preprocessors.processArticlesList = (articles) => {
    articles.map((article) => {
        const article_json_fields = ['author', 'review_state', 'draft', 'section', 'label_names'];

        for (let i = 0; i < article_json_fields.length; i++) {
            try {
                if (article[article_json_fields[i]] != undefined)
                    if ((article[article_json_fields[i]] != null) || (article[article_json_fields[i]] != '')) {
                        article[article_json_fields[i]] = JSON.parse(article[article_json_fields[i]]);
                    }

            }
            catch (error) {
                console.log(error);
            }

        }

    })




    return articles;
}


module.exports = preprocessors;