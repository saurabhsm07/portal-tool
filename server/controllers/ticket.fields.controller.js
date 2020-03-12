const Field = require("./../models/ticket.field");
const FieldValue = require("./../models/ticket.field.value");
module.exports = {
    getFieldsList : (req, res, next) =>{
        const field_ids = req.body.fields;
        Field.findAll({where: {id : field_ids}})
             .then((data) => {
                 if(data.length > 0){
                     console.log(`fetched ${data.length} ticket fields`);
                     req.fields_data = data;
                     next();
                 }
                 else{
                    console.log(`ticket fields with given ids do not exist`);
                    res.status(404).send({
                        status: 404,
                        message: `No Form data available`
                    });
                 }
             })
             .catch((err) =>{
                console.log("ERROR :");
                console.log(err.stack);
                res.status(500).send(err)
             }) 
    },

    fieldValues: (req, res, next) => {
        const field_ids = req.body.fields;
        const fields_data = req.fields_data;
        FieldValue.findAll({where : {
            field_id: field_ids }})
            .then((data) => {
                let fieldValues = {};
                field_ids.forEach(id => {
                    let field_data = fields_data.filter(data => data.id == id)[0].dataValues;
                    fieldValues[id] = {};
                    fieldValues[id].type =  field_data.field_type;
                    fieldValues[id].name =  field_data.user_title;
                    fieldValues[id].values = data.filter((value) => {if(value.field_id == id) return value})
                                          .map((value) => {return {key: value.id, 
                                                                            value: value.field_value}})
                });
                
                res.send({form_fields: fieldValues});
            })
            .catch((err) => {
                console.log("ERROR :");
                console.log(err.stack);
                res.status(500).send(err);
            })
    }
}