const express = require('express')
const organizations = express.Router()
// const client = require("./../../../config/connections").client;
const Organization = require("./../../../models/organization");

/**
 * GET: api path to get list of organizations from the database.
 */
organizations.get('/', (req, res) => {
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
})

/**
 * GET: api path to get organization record with id.
 */
organizations.get('/id/:id', (req, res) => {
    Organization.findAll({where : {id : req.params.id}})
           .then((data) => {
                if(data.length == 1){
                    console.log(`fetched Organization with id : ${data[0].id}`);
                    const organization_obj = data[0];
                    res.status(200).send(organization_obj);
                }
                else{
                    console.log(`Organization with id : ${req.params.id} does not exist`);
                    res.status(404).send({status: 404,
                        message: `Organization with id = ${req.params.id} does not exist`});
                }
           })
           .catch((err) => {
                console.log("ERROR :");
                console.log(err.stack);
                res.status(500).send(err);
           })
})

module.exports = organizations                       // Exporting Organizations APIs module