const Field = require('./../models/article_field');
//sequelize imports
const sequelize = require('sequelize');
const Op = require('sequelize').Op;

module.exports = {

getAll: (req, res, next) => {
    Field.findAll()
    .then((data) =>{
      if(data.length > 0){
          console.log(`${data.length} article fields fetched`);
          res.status(200).send(data);
     }else{
         console.log('no data exists in the article fields table');
         res.status(404).send({status: 404,
                               message: `No Article Fields data available`});
     }
    })
    .catch((err) =>{
      console.log("ERROR :");
      console.log(err.stack);
      res.status(500).send(err);
    })
},

getById: (req, res, next) => {
    Field.findAll({where : {'id': req.params.id}})
         .then((data) => {
                if(data.length == 1){
                    console.log(`fetched article field with id : ${data[0].id}`);
                    res.status(200).send(data[0]);
                }
                else{
                    console.log(`article field with id : ${req.params.id} does not exist`);
                    res.status(404).send({status: 404,
                                        message: `Article Field with id = ${req.params.id} does not exist`})
                }
         })
         .catch((err) => {
            console.log("ERROR :");
            console.log(err.stack);
            res.status(500).send(err);
         })
},

getList: (req, res, next) => {
    Field.findAll({where :  {
        'id': { 
                [Op.or] : JSON.parse(req.query.ids)
              }
    }
})
.then((fields) => {
console.log("here")
if(fields.length > 0){
    res.send(fields);
}else{
    console.log(`article fields with ids : ${req.query.ids} do not exist`);
    res.status(404).send({status: 404,
                        message: `Article Field with ids = ${req.query.ids} does not exist`})
}
})
.catch((err) => {
console.log("ERROR :");
console.log(err.stack);
res.status(500).send(err);
})
},

create: (req, res, next) => {
    const data = {
        required: req.body.required,
        field_type: req.body.field_type,
        field_name: req.body.field_name,
        field_value: req.body.field_value,
        description: req.body.description,
        removable: true,
        agent_only: req.body.agent_only,
        active: true,
        created_at: req.body.created_at,
        updated_at: req.body.updated_at,

    }

    Field.create(data)
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
    const field_id = req.body.id;
    const updateObj = {required: req.body.field.required,
                       field_name: req.body.field.field_name,
                       field_value: req.body.field.field_value,
                       updated_at: req.body.field.updated_at}
    
    
    Field.update(updateObj,{where: {id: field_id} })
              .then((data) =>{
                if(data == 1){
                    console.log('update successfull');
                    res.status(200).send({  status: 200,
                                message:`Article Field with id ${field_id} updated successfully`});
                  }else{
                    console.log(`article field with id : ${field_id} does not exist`);
                    res.status(404).send({status: 404,
                                        message: `Article Field with id = ${field_id} does not exist`})
                  }
              })
              .catch((err)=>{
                console.log("ERROR :");
                console.log(err.stack);
                res.status(500).send(err);
              })
},

delete: (req, res, next) => {
    Field.destroy({where: {id : req.params.id}})
    .then((data) => {
        if(data == 1){
          console.log(`article field with ${req.params.id} deleted successfully`);
          res.status(200).send({status: 200,
                  message: `Article Field with ${req.params.id} deleted successfully`});
        }else{
          console.log(`Article Field with id ${req.params.id} does not exist`);
          res.status(404).send({status: 404,
                                message: `Article Field with id = ${req.params.id} does not exist`});
        }
        
    })
    .catch((err)=> {
      console.log("ERROR :");
      console.log(err.stack);
      res.status(500).send(err);
    })
}

}