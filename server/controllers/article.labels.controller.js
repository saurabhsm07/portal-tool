
const Label = require("./../models/article_label");

module.exports = {

    getAll: (req, res, next) => {
        Label.findAll()
        .then((data) => {
            if(data.length > 0){
             console.log(`fetched ${data.length} labels`);
             res.status(200).send(data);
            }else{
                 console.log('no data exists in the label table');
                 res.status(404).send({status: 404,
                                       message: `No Label data available`});
         }
        })
        .catch((err) => {
             console.log("ERROR :");
             console.log(err.stack);
             res.status(500).send(err)
        })
    },

    create: (req, res, next) => {
        const data = {
    
        };
        Label.create(data)
               .then((resp) => {
                    console.log(resp)
                    res.status(200).send(resp)
                   })
              .catch((err)=>{
                    console.log("ERROR :");
                    console.log(err.stack);
                    res.status(500).send(err);
              })
    }
}