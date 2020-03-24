const Organization_products = require("./../models/organization.products");


module.exports = {

    getProducts: (req, res, next) =>{
        const organization_ids = req.organization_ids;
        Organization_products.findAll({attributes: ['product_id'],
                                    where: {organization_id: organization_ids}})
                         .then((data) =>{
                             req.product_ids = data.map(val => val.dataValues.product_id);
                             next()
                         })
                         .catch((error) => {
                            console.log(error);
                         })
    },

    getOrgProducts: (req, res, next) => {
        const organization_ids = req.params.organizationids;
        Organization_products.findAll({where: {organization_id: organization_ids}})
                         .then((data) =>{
                             req.org_products = data.map((val) => { return {product_ids: val.dataValues.product_id, organization_ids: val.dataValues.organization_id}});
                             next()
                         })
                         .catch((error) => {
                            console.log(error);
                         })
    }
}