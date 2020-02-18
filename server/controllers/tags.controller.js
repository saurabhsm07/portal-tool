const Tag = require("./../models/tag");


module.exports = {
/**
 * getAll:  get list of tags from the database.
 */
    getAll: (req, res, next) => {
        Tag.findAll({
        }).then((data) => {
           if(data.length > 0){
            console.log(`fetched ${data.length} tags`);
            res.status(200).send(data);
           }else{
                console.log('no data exists in the tag table');
                res.status(404).send({status: 404,
                                      message: `No Tag data available`});
        }
       })
       .catch((err) => {
            console.log("ERROR :");
            console.log(err.stack);
            res.status(500).send(err)
       })
    },

    /**
 * getById:  get tag record with id.
 */
    getById: (req, res, next) => {
        Tag.findAll({where : {id : req.params.id}})
        .then((data) => {
             if(data.length == 1){
                 console.log(`fetched Tag with id : ${data[0].id}`);
                 const tag_obj = data[0];
                 res.status(200).send(tag_obj);
             }
             else{
                 console.log(`Tag with id : ${req.params.id} does not exist`);
                 res.status(404).send({status: 404,
                     message: `Tag with id = ${req.params.id} does not exist`});
             }
        })
        .catch((err) => {
             console.log("ERROR :");
             console.log(err.stack);
             res.status(500).send(err);
        })
    }
}