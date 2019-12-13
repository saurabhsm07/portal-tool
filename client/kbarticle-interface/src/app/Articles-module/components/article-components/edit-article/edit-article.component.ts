import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { Router } from '@angular/router'
import {FormBuilder, Validators} from '@angular/forms';
import { ArticleService } from './../../../services/article-service/article.service'
import { ArticleAttachmentsService} from './../../../services/article-attachments-service/article-attachments.service'
import { Article } from './../../../classes/article'

declare var $ : any;   //touse jquery for modal toggle

@Component({
  selector: 'app-edit-article',
  templateUrl: './edit-article.component.html',
  styleUrls: ['./edit-article.component.scss']
})
export class EditArticleComponent implements OnInit {

  @Input() article;
  @Output() articleChange = new EventEmitter()

  tiny_mce_editor_config = {
    base_url: '/assets/', 
    suffix: '.min',
    plugins: ` preview fullpage paste autolink autosave save 
              code  fullscreen image link media template codesample 
              table charmap hr pagebreak nonbreaking anchor toc insertdatetime advlist 
              lists wordcount imagetools textpattern  help  quickbars `,
    toolbar: `undo redo | bold italic underline strikethrough |
              fontselect fontsizeselect formatselect |
              alignleft aligncenter alignright alignjustify | outdent indent |  
              numlist bullist | forecolor backcolor removeformat | pagebreak | 
              charmap emoticons | fullscreen  preview save print 
              | insertfile image media template link anchor codesample | ltr rtl`,
    menubar:  false,
    height: 300,
    max_height: 500,

    images_upload_handler: (blobInfo, success, failure) => {
     
      console.log(blobInfo.blob())
    
      this.articleAttachmentService.postArticleAttachment({ 'file_data' :blobInfo.blob(), 
                                                             'inline': true,
                                                             'article_id' : 155442 })
                                   .subscribe((data) => {
                                     console.log("successfully saved file")
                                     success(data.url)
                                   },
                                   (error) => {
                                     console.log(error)
                                   })
    
    }
}





// reactive article form to create new article
article_form = this.fb.group({
  article_header : this.fb.group({
    title  : [''],
    form : [''],   
    section : [''],                 
  }),

  article_body : this.fb.group({
    operatingSystem : [''],             
    version : [''],
    articleVisibility: [''],
    jiraId: [''],
    ticketId: [''],
    problem : [''],
    prerequisites : [''],
    steps: [''],
    resolution : ['']
  })

});

operatingSystemList = ['windows', 'linux', 'hp-ux', 'aix', 'sun-solaris'];
versions = ['radia-1', 'radia-2', 'radia-3', 'radia-4', 'radia-5'];
sectionList = [{id: 1, name :'section-1'},
{id: 2, name:'section-2'}, 
{id: 3, name:'section-3'}, 
{id: 4, name:'section-4'},
{id: 5, name:'section-5'}];


  constructor(private fb : FormBuilder, 
    private articleService : ArticleService, 
    private articleAttachmentService: ArticleAttachmentsService,
    private router: Router) { }

  ngOnInit() {
    this.updateData()
  }

  public updateData() : void{
    this.article_form.setValue({
      article_header : {
        title  : this.article.title,
        section : JSON.parse(this.article.section).id,
        form: this.article.formId
      },
    
      article_body : {
        version : this.article.body.versions,
        operatingSys: this.article.body.operatingSys,
        articleVisibility: this.article.body.agentFacing,
        jiraId: this.article.body.jiraId,
        ticketId:this.article.body.ticketId,
        problem : this.article.body.filter(x => (x.name == 'problem'))[0]['value'],
        steps : this.article.body.filter(x => (x.name == 'steps'))[0]['value'],
        resolution: this.article.body.filter(x => (x.name == 'resolution'))[0]['value'],
        prerequisites : this.article.body.filter(x => (x.name == 'prerequisites'))[0]['value']
      }


    })
  }

  public updateArticle(){
    console.log(this.article_form.value);
    let articleObj: Article = {
      id: this.article.id,
      title : this.article_form.value.article_header.title,
      section : {id : this.article_form.value.article_header.section,
                 name: this.sectionList.filter(section => section.id == this.article_form.value.article_header.section)[0].name},
      author : {id: 112323, name: 'saurabh'},
      draft: {status :true, type: 'Draft'},
      formId: 1,

        body : [
          {versions : this.article_form.value.article_body.version},
          {operatingSystem : this.article_form.value.article_body.operatingSys},
          {ticketId: this.article_form.value.article_body.ticketId},
          {jiraId: this.article_form.value.article_body.jiraId},
          {agentFacing: this.article_form.value.article_body.articleVisibility},
          {name: 'problem', value: this.article_form.value.article_body.problem},
          {name: 'prerequisites', value: this.article_form.value.article_body.prerequisites},
          {name: 'steps', value: this.article_form.value.article_body.steps},
          {name: 'resolution', value: this.article_form.value.article_body.resolution}
    
        ],
        review_state: {state: 'Technical Review State', value: 1},
        updatedAt: new Date()
        }
    this.articleService.updateArticle({'article': articleObj})
                       .subscribe((data) => {
                        console.log("successfully updated the article");
                        $("#editArticleModal").modal("hide");
                        console.log(data)
                        this.articleChange.emit(data)
                        this.router.navigate(['/article/', articleObj.id]);
                       },
                                  (error) => {
                                    console.log(error)
                        console.log(error.error_on_req)
                        console.log(error.error)
                                  })
  }

  public fiterArticleBody(attribute, name: string)  : Object{
    return attribute.name == name;
  }
}
