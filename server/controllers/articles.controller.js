const Article = require("./../models/article");
const preprocessors = require('./../helpers/preprocessors/articles.preprocessors');
const client = require("./../config/connections").client;

module.exports = {
    /**
     * GET:  get list of articles from the database.
     */
    getAll: (req, res, next) => {


        Article.findAll()
            .then((data) => {
                if (data.length > 0) {
                    console.log(`fetched ${data.length} articles`);
                    res.status(200).send(data);
                } else {
                    console.log('no data exists in the article table');
                    res.status(404).send({
                        status: 404,
                        message: `No Article data available`
                    });
                }
            })
            .catch((err) => {
                console.log("ERROR :");
                console.log(err.stack);
                res.status(500).send(err)
            })
    },

    /**
 * GET:  get article record with section id.
 */
    getBySection: (req, res, next) => {
        const sectionId = req.params.id;
        Article.findAll({ where: { section: { id: sectionId } } })
            .then((data) => {
                if (data.length > 0) {
                    console.log(`fetched Articles with section id : ${sectionId}`);
                    const articleList = preprocessors.processArticlesList(data);
                    res.status(200).send(articleList);
                }
                else {
                    console.log(`Article with section id = ${sectionId} does not exist`);
                    res.status(404).send({
                        status: 404,
                        message: `Article with section id = ${sectionId} does not exist`
                    });
                }
            })
            .catch((err) => {
                console.log("ERROR :");
                console.log(err.stack);
                res.status(500).send(err);
            })

    },

    /**
 * GET:  get article record with id.
 */

    getById: (req, res, next) => {
        const id = req.params.id;
        Article.findAll({ where: { id: id } })
            .then((data) => {
                if (data.length == 1) {
                    console.log(`fetched Article with id : ${data[0].id}`);
                    const article_obj = preprocessors.clientArticleObj(data[0]);
                    res.status(200).send(article_obj);
                }
                else {
                    console.log(`Article with id : ${id} does not exist`);
                    res.status(404).send({
                        status: 404,
                        message: `Article with id = ${id} does not exist`
                    });
                }
            })
            .catch((err) => {
                console.log("ERROR :");
                console.log(err.stack);
                res.status(500).send(err);
            })
    },

    /**
    * GET:  get latest article id.
    */

    getLatestId: (req, res, next) => {
        client.query(`SELECT AUTO_INCREMENT
    FROM  INFORMATION_SCHEMA.TABLES
    WHERE TABLE_SCHEMA = 'helpcenter_database'
    AND   TABLE_NAME   = 'articles'`, {})
            .then((data) => {

                console.log(`last article id : ${data[0][0].AUTO_INCREMENT}`);
                res.status(200).send({ 'id': data[0][0].AUTO_INCREMENT });

            })
            .catch((err) => {
                console.log("ERROR :");
                console.log(err.stack);
                res.status(500).send(err);
            })
    },

    /**
    * Create:  create a article record to the database.
    */
    create: (req, res, next) => {
        const { article } = req.body;
        const article_object = preprocessors.dbArticleObj(article);
        Article.create(article_object)
            .then((resp) => {
                console.log(resp)
                res.status(200).send(resp)
            })
            .catch((err) => {
                console.log("ERROR :");
                console.log(err.stack);
                res.status(500).send(err);
            })
    },


    /**
    * PUT:  update a article record with specific i.d
    */

    update: (req, res, next) => {

        const { article } = req.body;
        const update_article_obj = preprocessors.updateArticleObj(article);
        Article.findAll({ where: { id: article.id } })
            .then((article_obj) => {
                if (article_obj.length == 1) {
                    Article.update(update_article_obj, { where: { id: article.id } })
                        .then((data) => {
                            if (data == 1) {
                                console.log(`successfully updated article with id : ${article.id}`);
                                res.status(200).send({
                                    status: 200,
                                    message: `Article with id ${article.id} updated successfully`
                                });
                            }

                        })
                        .catch((err) => {
                            console.log("ERROR :");
                            console.log(err.stack);
                            res.status(500).send(err);
                        })
                }
                else {
                    res.status(404).send({
                        status: 404,
                        message: `Article with id ${article.id} does not exist`
                    });
                }
            })
            .catch((err) => {
                console.log("ERROR :");
                console.log(err.stack);
                res.status(500).send(err);
            })
    },

    /**
 * DELETE: delete article with specific i.d 
 */

    delete: (req, res, next) => {
        const { id } = req.params;
        Article.destroy({ where: { id: id } })
            .then((data) => {
                if (data == 1) {
                    console.log(`successfully deleted article with id = ${id}`)
                    res.status(200).send(`successfully deleted article with id = ${id}`)
                }
                else {
                    console.log(`article with id ${id} does not exist`)
                    res.status(404).send({
                        status: 404,
                        message: `Article with id = ${id} does not exist`
                    });
                }

            })
            .catch((err) => {
                console.log("ERROR :");
                console.log(err.stack);
                res.status(500).send(err);
            })
    }

}
