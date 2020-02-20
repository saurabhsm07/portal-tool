
module.exports = {

    /**
     * process
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
    }


}