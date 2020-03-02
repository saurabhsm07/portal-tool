
module.exports = {

    /**
     * process user Obj before sending it to the client app
     */
    clientUserObj : (user) => {
        return {
            id: user.id,
            name: user.name,
            email:user.email,
            remember_token: user.remember_token,
            alias: user.alias,
            signature: user.signature,
            details: user.details,
            is_admin: user.is_admin,
        }
    },

    /**
     * processes to be performed before saving user object to db
     */
    saveUserObj : (user) => {
         
    },

    /**
     * verify user object
     */
    verifyUserObj: (user) => {
        let validity = true;
        console.log("in user object validations");
        console.log(user);
        console.log(Object.keys(user))
        Object.keys(user).forEach(key => {
            if((user[key] == null) || (user[key] == '')){
                validity = false;
            }
                
        });
        console.log(validity);
        return validity;
    }


}