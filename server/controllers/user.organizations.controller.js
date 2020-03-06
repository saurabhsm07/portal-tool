const User_organizations = require("./../models/user.organizations");


module.exports = {

    getOranizations: (req, res, next) =>{
        const {id} = req.user.dataValues
        User_organizations.findAll({attributes: ['organization_id'],
                                    where: {user_id: id}})
                         .then((data) =>{
                             let organization_ids = data.map(val => val.dataValues.organization_id)
                             req.organization_ids = organization_ids;


                             next()
                         })
                         .catch((error) => {
                            console.log(error);
                         })
    },

    
}
