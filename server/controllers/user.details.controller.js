const userDetails = require('./../models/user.detail');


module.exports = {


    findByUserId: (req, res, next) => {
        const userId = req.params.id;

        userDetails.findAll({ where: { user_id: userId } })
            .then((data) => {
                if (data.length > 0) {
                    console.log(`fetched ${data.length} user fields`);
                    req.userDetails = data;
                    next();
                } else {
                    console.log(`no user data available for user = ${userId}`);
                    res.status(200).send({
                        status: 200,
                        message: `No user details available for user = ${userId}`
                    });
                }
            })
            .catch((err) => {
                console.log("ERROR :");
                console.log(err.stack);
                res.status(500).send(err);
            })
    }
}
