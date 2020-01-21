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
    if(article.article_form_id != 0){
        article.body = JSON.parse(article.body);
    }

    

    return article;
}

preprocessors.processSegmentObj = (segment) => {

    if((segment.group_ids != null) && (segment.group_ids != "")){
        segment.group_ids = JSON.parse(segment.group_ids);
    }
    if((segment.organization_ids != null) && (segment.organization_ids != '')){
        segment.organization_ids = JSON.parse(segment.organization_ids);
    }
    if((segment.tags != null) && (segment.tags != '')){
        segment.tags = JSON.parse(segment.tags);
    }
    if((segment.or_tags != null) && (segment.or_tags != '')){
        segment.or_tags = JSON.parse(segment.or_tags);
    }
    
    return segment;
}

module.exports = preprocessors;