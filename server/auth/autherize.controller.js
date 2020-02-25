module.exports = {

    isAdmin : (req, res, next) => {
        const {user_type, role_id} = req.user.dataValues;
        if((user_type == "admin") && (role_id == 1)){
            console.log("here")
            req.accessInfo = true;
            next();
        }else{
            res.status(403).send(false);
        }
    },

    isAdminOrAgent: (req, res, next) => {
        const {user_type, role_id} = req.user.dataValues;
        if((user_type == "admin") && (role_id == 1)){
            next({accessInfo: {role: 'admin', allowedAccess: true}});
        }
        else if ((user_type == "agent") && (['776500', '884641', '884651'].indexOf(role_id) != -1)){
            next({accessInfo: {role: 'agent', allowedAccess: true}});
        }
        else{
            res.status(403).send("Unauthorized request");
        }
    },

    isAgent: (req, res, next) => {
        const {user_type, role_id} = req.user.dataValues;
        if((user_type == "agent") && (['776500', '884641', '884651'].indexOf(role_id) != -1)){
            next({accessInfo: {role: 'agent', allowedAccess: true}});
        }else{
            res.status(403).send("Unauthorized request");
        }
    },

    verifyAccess: (req, res, next) => {
        res.send(req.accessInfo);
    }
}