const Segment = require("./../models/user_segment.model");
const preprocessors = require("./../helpers/preprocessors/segments.preprocessors");


module.exports = {
    /**
 * GET: list of segments from the database.
 */
    getAll: (req, res, next) => {
        Segment.findAll()
        .then((data) => {
            if(data.length > 0){
             console.log(`${data.length} segments fetched`);
             res.status(200).send(data);
            }else{
             console.log('no data exists in the segments table');
             res.status(404).send({status: 404,
                                   message: `No Segments data available`});
            }

        })
        .catch((err) => {
             console.log("ERROR :");
             console.log(err.stack);
             res.status(500).send(err);
        })
    },

    /**
 * GET: segment record with id.
 */
    getById: (req, res, next) => {
        const id = req.params.id;
        Segment.findAll({where : {id : id}})
        .then((data) => {
             if(data.length == 1){
                 console.log(`fetched segment with id : ${data[0].id}`);
                 const segment = preprocessors.clientSegmentObj(data[0]);
                 console.log(segment)
                 res.status(200).send(segment);
             }
             else{
                 console.log(`segment with id : ${id} does not exist`);
                 res.status(404).send({status: 404,
                                     message: `Segment with id = ${id} does not exist`})
             }
        })
        .catch((err) => {
             console.log("ERROR :");
             console.log(err.stack);
             res.status(500).send(err);
        })
    },

    /**
 * POST:  add a segment record to the database.
 */
    create: (req, res, next) => {
        const segment_object = preprocessors.saveSegmentObj(req.body.segment);
        Segment.create(segment_object)
               .then((resp) => {
                    console.log(resp);
                    res.status(200).send(resp);
               })
              .catch((err)=>{
                    console.log("ERROR :");
                    console.log(err.stack);
                    res.status(500).send(err);
              })
    },

    /**
 * PUT:update a segment record with specific i.d
 */
    update: (req, res, next) => {
        const segment = req.body.segment;
        const segment_update_object = preprocessors.updateSegmentObj(segment);

        Segment.findAll({ where: { id: segment.id } })
            .then((segment_obj) => {
                if (segment_obj.length == 1) {
                    Segment.update(segment_update_object, { where: { id: segment.id } })
                        .then((data) => {
                            if (data == 1) {
                                console.log('update successfull');
                                res.status(200).send({
                                    status: 200,
                                    message: `segment with id ${segment.id} updated successfully`
                                });
                            }
                        })
                        .catch((err) => {
                            console.log("ERROR :");
                            console.log(err.stack);
                            res.status(500).send(err);
                        })
                }
                else {
                    res.status(404).send({
                        status: 404,
                        message: `segment with id ${segment.id} does not exist`
                    });
                }
            })
            .catch((err) => {
                console.log("ERROR :");
                console.log(err.stack);
                res.status(500).send(err);
            })
    },

    /**
 * DELETE: delete segment with specific i.d 
 */
    delete: (req, res, next) => {
        const id = req.params.id;
        Segment.destroy({where: { id: id}})
        .then((data) =>{
            if(data == 1){
                 console.log(`successfully deleted segment with id = ${id}`);
                 res.status(200).send({status: 200,
                                       message: `successfully deleted segment with id = ${id}`});
            }
            else{
                console.log(`segment with id ${id} does not exist`);
                res.status(404).send({status: 404,
                                      message: `Segment with id = ${id} does not exist`});
            }
            
        })
        .catch((err) =>{
             console.log("ERROR :");
             console.log(err.stack);
             res.status(500).send(err);
        })
    }



}