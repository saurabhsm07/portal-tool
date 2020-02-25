const Form = require('./../models/article_form');

module.exports = {

    getAll: (req, res, next) => {
        Form.findAll()
        .then((data) =>{
            if(data.length > 0){
                console.log(`${data.length} article forms fetched`);
                res.status(200).send(data);
        }else{
            console.log('no data exists in the article forms table');
            res.status(404).send({status: 404,
                                    message: `No Article Forms data available`});
        }
        })
        .catch((err) =>{
            console.log("ERROR :");
            console.log(err.stack);
            res.status(500).send(err);
          })
    },

    getById: (req, res, next) => {
        Form.findAll({where : {'id': req.params.id}})
        .then((data) => {
           if(data.length == 1){
               console.log(`fetched article form with id : ${data[0].id}`);
               res.status(200).send(data[0]);
           }
           else{
               console.log(`article form with id : ${req.params.id} does not exist`);
               res.status(404).send({status: 404,
                                   message: `Article Form with id = ${req.params.id} does not exist`});
           }
        })
        .catch((err) => {
           console.log("ERROR :");
           console.log(err.stack);
           res.status(500).send(err);
        })
    },

    create: (req, res, next) => {
        const data = req.body;
        console.log(data);
    
        Form.create(data)
                  .then((resp) => {
                      console.log(resp);
                      res.status(200).send(resp);
                  })
                  .catch((err) =>{
                    console.log("ERROR :");
                    console.log(err.stack);
                    res.status(500).send(err);
                  })
    },

    update: (req, res, next) => {
        const form_id = req.body.id;
 
        const updateObj = {
                           name: req.body.form.name,
                           article_fields: req.body.form.article_fields,
                           updated_at: req.body.form.updated_at};
        
                           console.log(updateObj)
                    Form.update(updateObj, { where : {id: form_id} } )
                        .then((data) =>{
                            console.log(data);
                            if(data == 1){
                                console.log('update successfull');
                                res.status(200).send({  status: 200,
                                            message:`Article Form with id ${form_id} updated successfully`});
                              }else{
                                console.log(`article form with id : ${form_id} does not exist`);
                                res.status(404).send({status: 404,
                                                    message: `Article Form with id = ${form_id} does not exist`})
                              }
                        })
                        .catch((err)=> {
                            console.log("ERROR :");
                            console.log(err.stack);
                            res.status(500).send(err);
                        })
    },

    delete: (req, res, next) => {
        Form.destroy({where: {id : req.params.id}})
        .then((data) => {
          if(data == 1){
              console.log(`article form with ${req.params.id} deleted successfully`);
              res.status(200).send({status: 200,
                      message: `Article Form with ${req.params.id} deleted successfully`});
            }else{
              console.log(`Article Form with id ${req.params.id} does not exist`);
              res.status(404).send({status: 404,
                                    message: `Article Form with id = ${req.params.id} does not exist`});
            }
        })
        .catch((err)=> {
          console.log("ERROR :");
          console.log(err.stack);
          res.status(500).send(err);
        })
    }
}