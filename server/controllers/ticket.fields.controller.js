const Field = require("./../models/ticket.field");
const FieldValue = require("./../models/ticket.field.value");

module.exports = {
    getFieldsList : (req, res, next) =>{
        
        const field_ids = req.query.ids.split(',');
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
        const field_ids = req.query.ids.split(',');
        const fields_data = req.fields_data;
        FieldValue.findAll({where : {
            field_id: field_ids }})
            .then((data) => {
                let fieldValues = [];
                field_ids.forEach(id => {
                    let field_data = fields_data.filter(data => data.id == id)[0].dataValues;
                    if(field_data.show_status == true){
                    fieldValues.push({id: id, 
                                      type:field_data.field_type, 
                                      name: field_data.user_title,
                                      key: field_data.field_key,
                                      description: field_data.user_description,
                                      required: field_data.user_req_id, 
                                      values: data.filter((value) => {if(value.field_id == id) return value})
                                                  .map((value) => {return {key: value.id, 
                                                                 value: value.field_value}})});
                                                                }
                });
                
                res.send(fieldValues);
            })
            .catch((err) => {
                console.log("ERROR :");
                console.log(err.stack);
                res.status(500).send(err);
            })
    }
}