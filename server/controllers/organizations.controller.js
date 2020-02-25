const Organization = require("./../models/organization");
const preprocessors = require("./../helpers/preprocessors/category.preprocessors");


module.exports = {

       /**
 * getAll: list of organizations from the database.
 */
    getAll: (req, res, next) => {
        Organization.findAll({
            attributes: ['id', 'name']
        })
               .then((data) => {
                   if(data.length > 0){
                    console.log(`fetch ${data.length} organization records`);
                    res.status(200).send(data);
                   }else{
                        console.log('no data exists in the organization table');
                        res.status(404).send({status: 404,
                                              message: `No Organization data available`});
                }
               })
               .catch((err) => {
                    console.log("ERROR :");
                    console.log(err.stack);
                    res.status(500).send(err)
               })
    },

     /**
 * GET: organization record with id.
 */
getById: (req, res, next) => {

    const id = req.params.id;
    Organization.findAll({where : {id : id}})
    .then((data) => {
         if(data.length == 1){
             console.log(`fetched Organization with id : ${data[0].id}`);
             const organization_obj = data[0];
             res.status(200).send(organization_obj);
         }
         else{
             console.log(`Organization with id : ${id} does not exist`);
             res.status(404).send({status: 404,
                 message: `Organization with id = ${id} does not exist`});
         }
    })
    .catch((err) => {
         console.log("ERROR :");
         console.log(err.stack);
         res.status(500).send(err);
    })
}
}