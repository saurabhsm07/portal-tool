const preprocessors = {};

/**
 * 
 * @param  article : article object to be processed before returning to the client  
 */
preprocessors.clientArticleObj = (article) => {
    article.author = JSON.parse(article.author);
    article.review_state = JSON.parse(article.review_state);
    article.draft = JSON.parse(article.draft);
    article.section = JSON.parse(article.section);
    article.label_names = JSON.parse(article.label_names);
    if(article.article_form_id != 0){
        article.body = JSON.parse(article.body);
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
        locale:'en-us',
        author: article.author,
        draft:  article.draft,
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
        edited_at:  article.updated_at,
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
        locale:'en-us',
        draft: article.draft,
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
        edited_at:  article.updated_at,
        review_state: article.review_state
    }
}



/**
 * 
 * @param  articles : articles array to be processed before returning to the client  
 */
preprocessors.processArticlesList = (articles) => {
    articles.map((article) => {
        article.author = JSON.parse(article.author);
        if(article.review_state != null){
            article.review_state = JSON.parse(article.review_state);
        }
        if(article.label_names != ''){
            article.label_names = JSON.parse(article.label_names);
        }
    
        if(article.article_form_id != 0){
            article.body = JSON.parse(article.body);
        }
        article.draft = JSON.parse(article.draft);
        article.section = JSON.parse(article.section);
       
    })


    

    return articles;
}


module.exports = preprocessors;