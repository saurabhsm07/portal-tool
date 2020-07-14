const userExtraDetails = require('./../models/user.extra.details');

module.exports = {


    findByUserId: (req, res, next) => {
        const userId = req.params.id;

        userExtraDetails.findAll({ where: { user_id: userId } })
            .then((data) => {
                if (data.length > 0) {
                    console.log(`fetched  extra data ${data.length} `);
                    res.status(200).send({details: req.userDetails, extraDetails: data});
                } else {
                    console.log(`no user extra data available for user = ${userId}`);
                    res.status(200).send({
                        status: 200,
                        message: `No user extra details available for user = ${userId}`
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