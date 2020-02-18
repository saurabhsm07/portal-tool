const Category = require("./../models/category");
const preprocessors = require("./../helpers/preprocessors/category.preprocessors");


module.exports = {
    /**
 * GET: list of categories from the database.
 */
    getAll: (req, res, next) => {
        Category.findAll()
            .then((data) => {
                if (data.length > 0) {
                    console.log(`${data.length} categories fetched`);
                    res.status(200).send(data);
                } else {
                    console.log('no data exists in the category table');
                    res.status(404).send({
                        status: 404,
                        message: `No Category data available`
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
 * GET: category record with id.
 */
    getById: (req, res, next) => {
        const id = req.params.id;
        Category.findAll({ where: { id: id } })
            .then((data) => {
                if (data.length == 1) {
                    console.log(`fetched category with id : ${data[0].id}`);
                    res.status(200).send(data[0]);
                }
                else {
                    console.log(`category with id : ${id} does not exist`);
                    res.status(404).send({
                        status: 404,
                        message: `Category with id = ${id} does not exist`
                    })
                }
            })
            .catch((err) => {
                console.log("ERROR :");
                console.log(err.stack);
                res.status(500).send(err);
            })
    },

    /**
 * POST:  add a category record to the database.
 */
    create: (req, res, next) => {
        const category_object = preprocessors.saveCategoryObj(req.body.category);
        Category.create(category_object)
            .then((resp) => {
                console.log(resp);
                res.status(200).send(resp);
            })
            .catch((err) => {
                console.log("ERROR :");
                console.log(err.stack);
                res.status(500).send(err);

            })
    },

    /**
 * PUT:update a category record with specific i.d
 */
    update: (req, res, next) => {
        const category = req.body.category;
        const category_update_object = preprocessors.updateCategoryObj(category);

        Category.findAll({ where: { id: category.id } })
            .then((category_obj) => {
                if (category_obj.length == 1) {
                    Category.update(category_update_object, { where: { id: category.id } })
                        .then((data) => {
                            if (data == 1) {
                                console.log('update successfull');
                                res.status(200).send({
                                    status: 200,
                                    message: `category with id ${category.id} updated successfully`
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
                        message: `category with id ${category.id} does not exist`
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
 * DELETE: delete category with specific i.d 
 */
    delete: (req, res, next) => {
        const id = req.params.id;
        Category.destroy({where: { id: id}})
        .then((data) =>{
            if(data == 1){
                 console.log(`successfully deleted category with id = ${id}`);
                 res.status(200).send({status: 200,
                                       message: `successfully deleted category with id = ${id}`});
            }
            else{
                console.log(`category with id ${id} does not exist`);
                res.status(404).send({status: 404,
                                      message: `Category with id = ${id} does not exist`});
            }
            
        })
        .catch((err) =>{
             console.log("ERROR :");
             console.log(err.stack);
             res.status(500).send(err);
        })
    }



}