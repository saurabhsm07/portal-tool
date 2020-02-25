module.exports = {

    isAdmin : (req, res, next) => {
        const {user_type, role_id} = req.user.dataValues;
        if((user_type == "admin") && (role_id == 1)){
            next();
        }else{
            res.status(403).send("Unauthorized request");
        }
    },

    isAdminOrAgent: (req, res, next) => {
        const {user_type, role_id} = req.user.dataValues;
        if((user_type == "admin") && (role_id == 2)){
            next();
        }
        else if ((user_type == "agent") && (['776500', '884641', '884651'].indexOf(role_id) != -1)){
            next();
        }
        else{
            res.status(403).send("Unauthorized request");
        }
    },

    isAgent: (req, res, next) => {
        const {user_type, role_id} = req.user.dataValues;
        if((user_type == "agent") && (['776500', '884641', '884651'].indexOf(role_id) != -1)){
            next();
        }else{
            res.status(403).send("Unauthorized request");
        }
    }
}