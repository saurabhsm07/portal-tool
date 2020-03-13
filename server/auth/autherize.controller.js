module.exports = {

    isAdmin : (req, res, next) => {
        const {user_type, role_id} = req.user.dataValues;
        if((user_type == "admin") && (role_id == 1)){
            req.accessInfo = true;
            next()
        }else{
            req.accessInfo = false;
            res.status(403).send("Unauthorized request");
        }
    },

    isAdminOrAgent: (req, res, next) => {
        const {user_type, role_id} = req.user.dataValues;
        if((user_type == "admin") && (role_id == 1)){
            req.accessInfo = true;
            console.log("is admin or agent")
            next();
        }
        else if ((user_type == "agent") && (['776500', '884641', '884651'].indexOf(role_id) != -1)){
            req.accessInfo = true;
            next();
        }
        else{
            res.status(403).send("Unauthorized request");
        }
    },

    isAgent: (req, res, next) => {
        const {user_type, role_id} = req.user.dataValues;
        console.log("testing if agent");
        if((user_type == "admin") && (role_id == 1)){
            req.accessInfo = true;
            console.log("is admin or agent");
            next()
        }
        else if((user_type == "agent") && (['776500', '884641', '884651'].indexOf(role_id) != -1)){
            req.accessInfo = true;
            console.log("here")
            next()
        }else{
            res.status(403).send("Unauthorized request");
        }
    },

    verifyAccess: (req, res, next) => {
        res.send(req.accessInfo);
    },

    sessionExists: (req, res, next) => {
        if(req.user != null){
            console.log(`token valid for user ${req.user.dataValues.id}`);
            res.status(200).send(true);
        }else{
            console.log(`token invalid for user ${req.user.dataValues.id}`);
            res.status(401).send(false);
        }
    }
}