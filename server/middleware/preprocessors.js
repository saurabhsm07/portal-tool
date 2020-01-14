const preprocessors = {};

/**
 * 
 * @param  article : article object to be processed before returning to the client  
 */
preprocessors.processArticleObj = (article) => {
    article.author = JSON.parse(article.author);
    article.review_state = JSON.parse(article.review_state);
    article.draft = JSON.parse(article.draft);
    article.section = JSON.parse(article.section);
    article.label_names = JSON.parse(article.label_names);
    article.body = JSON.parse(article.body);

    return article;
}

module.exports = preprocessors;