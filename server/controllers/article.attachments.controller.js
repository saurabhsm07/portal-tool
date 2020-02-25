

const fs = require('fs');
const Attachment = require('./../models/article_attachments');

module.exports = {

    /**
 * getAll:  get list of article attachments from the database for specific article id.
 */
    getAll : (req, res, next) => {
        const article_id = parseInt(req.baseUrl.match(/\d+/)[0]);
        Attachment.findAll({where : {'article_id': article_id}})
        .then((data) =>{
            if(data.length > 0){
              console.log(`${data.length} article attachments fetched`);
              res.status(200).send(data);
            }else{
              console.log('no data exists in the Attachments table');
              res.status(404).send({status: 404,
                                      message: `No Attachments available`});
            }
        })
        .catch((err) =>{
              console.log("ERROR :");
              console.log(err.stack);
              res.status(500).send(err);
        })
    },

    /**
     * POST: create a article attachment record to the database.
     */
    create: (req, res, next) => {

        const attachement_data = {
            url:'http://localhost:5000/'+req.body.article_id+'/'+req.file.originalname,
            article_id:req.body.article_id,
            file_name: req.file.originalname,
            content_url: 'content/url/',
            content_type: req.file.mimetype,
            size: req.file.size,
            inline: req.body.inline,
            created_at: new Date().toISOString(),
            updated_at: new Date().toISOString()
    
        }
        fs.readFile(req.file.path, (err) => {
            if(!fs.existsSync(req.file.destination+req.body.article_id)){
                fs.mkdir(req.file.destination+req.body.article_id, (err)=>{
                    console.log(err);
                })
            }
            fs.rename(req.file.path, req.file.destination+ req.body.article_id+"/"+ req.file.originalname, (err)=>{
                if(err){
                    console.log(err);
                }
                else{
                    Attachment.create(attachement_data)
                    .then((resp) => {
                        console.log(resp);
                        res.status(200).send(resp);
                    })
                    .catch((err) =>{
                        console.log("ERROR :");
                        console.log(err.stack);
                        res.status(500).send(err);
                    })
                }
            })
        })
    },

    /**
     * update:  update an article attachment record with specific i.d
     */
    update: (req, res, next) => {
        const article_id = parseInt(req.baseUrl.match(/\d+/)[0]);
        Attachment.update({inline: true},{where: {article_id : article_id}})
        .then((data) =>{
            if(data > 0){
              res.status(200).send({status: 200,
                  message:`attachment for article id ${article_id} updated to inline state successfully`});
            }else{
              res.status(404).send({status: 404,
                  message:`attachments for article id ${article_id} does not exist`});
            }
         
        })
        .catch((err)=>{
              console.log("ERROR :");
              console.log(err.stack);
              res.status(500).send(err);
        })
    },

    /**
 * delete: article attachment with specific i.d 
 */
    delete: (req, res, next) => {
        const article_id = parseInt(req.baseUrl.match(/\d+/)[0]);
        Attachment.destroy({where: {article_id : article_id}})
        .then((data) => {
          if(data == 1){
              console.log(`successfully deleted attachments for article id = ${article_id}`);
              res.status(200).send({status: 200,
                                    message: `successfully deleted attachments for article id = ${article_id}`});
         }else{
          console.log(`Attachments with article id ${article_id} do not exist`);
          res.status(404).send({status: 404,
                                message: `Attachments with article id ${article_id} do not exist`});
         }
        })
        .catch((err)=> {
              console.log("ERROR :");
              console.log(err.stack);
              res.status(500).send(err);
        })
    }
}