const Form = require("./../models/ticket.form");
// const preprocessors = require('./../helpers/preprocessors/articles.preprocessors');
const PHPUnserialize = require('php-unserialize');
const client = require("./../config/connections").client;


module.exports = {
    /**
     * GET: get list of article forms from database
     */
    getAll: (req, res, next) => {
        const product_ids = req.product_ids
        Form.findAll({where: {product_id: product_ids}})
            .then((data) => {
                if (data.length > 0) {
                    console.log(`fetched ${data.length} ticket forms`);
                    // const form_field_list = Object.values((PHPUnserialize.unserialize(data[0].ticket_field_ids)))
                    // data[0].dataValues.ticket_field_ids = form_field_list;
                    // console.log(data[0].dataValues.ticket_field_ids)
                    res.status(200).send(data);
                } else {
                    console.log(`user is not assigned to any product`);
                    res.status(404).send({
                        status: 404,
                        message: `No Form data available`
                    });
                }
            })
            .catch((err) => {
                console.log("ERROR :");
                console.log(err.stack);
                res.status(500).send(err);
            })
    },

    getById: (req, res, next) => {
        const id = req.params.id
        console.log(id);
        Form.findAll({where: {id: id}})
            .then((data) => {
                if (data.length == 1) {
                    console.log(`fetched ticket form with id = ${data[0].id}`);
                    const form_field_list = Object.values((PHPUnserialize.unserialize(data[0].ticket_field_ids)))
                    data[0].dataValues.ticket_field_ids = form_field_list;
                    console.log(data[0].dataValues.ticket_field_ids)
                    res.status(200).send(data[0]);
                } else {
                    console.log(`user is not assigned to any product`);
                    res.status(404).send({
                        status: 404,
                        message: `No Form data available`
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