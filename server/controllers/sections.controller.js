const Section = require("./../models/section");
const preprocessors = require("./../helpers/preprocessors/sections.preprocessors");

module.exports = {

    /**
 * getAll: get list of sections from the database.
 */
    getAll: (req, res, next) => {
        Section.findAll()
            .then((data) => {
                if (data.length > 0) {
                    console.log(`${data.length} sections fetched`);
                    res.status(200).send(data);
                } else {
                    console.log('no data exists in the sections table');
                    res.status(404).send({
                        status: 404,
                        message: `No Sections data available`
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
 * getByCategory: get section record for specific category id.
 */
    getByCategory: (req, res, next) => {
        categoryId = req.params.id;
        Section.findAll({ where: { category_id: categoryId } })
            .then((data) => {
                if (data.length > 0) {
                    console.log(`fetched ${data.length} sections from the database`);
                    res.status(200).send(data);
                }
                else {
                    console.log(`sections in category id : ${categoryId} do not exist`);
                    res.status(404).send({
                        status: 404,
                        message: `sections in category id : ${categoryId} do not exist`
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
 * getById:  get section record with specific id.
 */
    getById: (req, res, next) => {
        const sectionId =  req.params.id;
        Section.findAll({where : {id : sectionId}})
        .then((data) => {
             if(data.length == 1){
                 console.log(`fetched section with id : ${data[0].id}`);
                 res.status(200).send(data[0]);
             }
             else{
                 console.log(`section with id : ${sectionId} does not exist`);
                 res.status(404).send({status: 404,
                                     message: `Section with id = ${sectionId} does not exist`})
             }
        })
        .catch((err) => {
             console.log("ERROR :");
             console.log(err.stack);
             res.status(500).send(err);
        })
    },

    /**
 * create:  add a section record to the database.
 */
    create: (req, res, next) => {
        const section_object = preprocessors.saveSectionObj(req.body.section);
        Section.create(section_object)
        .then((resp) => {
             console.log(resp);
             res.status(200).send(resp);
        })
       .catch((err)=>{
             console.log("ERROR :");
             console.log(err.stack);
             res.status(500).send(err);
       })
    },

    /**
 * update:  update a section record with specific i.d
 */
    update: (req, res, next) => {
        const {id} = req.body.section;
        const section_update_object = preprocessors.updateSectionObj(req.body.section);
        Section.findAll({where : {id: id}})
           .then( (section_obj)=> {
               if(section_obj.length == 1){
                   Section.update(updateData, {where : {id: id}})
                          .then((data) => {
                                if(data == 1){
                                    console.log('update successfull');
                                    res.status(200).send({  status: 200,
                                                message:`section with id ${id} updated successfully`});
                                }
                            
                          })
                          .catch((err) => {
                            console.log("ERROR :");
                            console.log(err.stack);
                            res.status(500).send(err);
                        })
               }
               else{
                    res.status(404).send({status: 404,
                                          message:`section with id ${req.body.category.id} does not exist`});
               }
           })
           .catch((err) => {
                console.log("ERROR :");
                console.log(err.stack);
                res.status(500).send(err);
           })
    },

    /**
 * delete:  delete section with specific id 
 */
    delete: (req, res, next) => {
        const id = req.params.id;
        Section.destroy({where: { id: id}})
        .then((data) =>{
            if(data == 1){
                 console.log(`successfully deleted section with id = ${id}`);
                 res.status(200).send({status: 200,
                                       message:`successfully deleted section with id = ${id}`});
            }
            else{
                console.log(`section with id ${id} does not exist`);
                res.status(404).send({status: 404, 
                                      message: `section with id ${id} does not exist`});
            }
            
        })
        .catch((err) =>{
             console.log("ERROR :");
             console.log(err.stack);
             res.status(500).send(err);
        })
    },
}