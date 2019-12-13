import { Component, OnInit } from '@angular/core';
import { Field } from './field-class';
import {FormBuilder, Validators} from '@angular/forms';
import { Article } from './../../../classes/article';
import { Section } from './../../../../Section-module/classes/section';
import { Article_Form } from './../../../classes/article_form';
import { ArticleService } from './../../../services/article-service/article.service';
import { ArticleAttachmentsService} from './../../../services/article-attachments-service/article-attachments.service';
import { ArticleFormsService } from './../../../services/article-forms-service/article-forms.service';
import { SectionService } from './../../../../Section-module/services/section-service/section.service';
import { Router } from '@angular/router';



@Component({
  selector: 'app-article-fields',
  templateUrl: './create-article.component.html',
  styleUrls: ['./create-article.component.scss']
})
export class CreateArticleComponent implements OnInit {

  article_fields : Field[] = [{name : 'section', type : 'dropdown', values : ['section-1', ' section-2', 'section-3', ' section-4']},
                              {name: 'title' , type : 'text', values : null},
                              {name : 'product', type: 'text', values : null},
                              {name : 'versions ', type: 'multiselect', values: ['9.5', '10.0', '5.4', '6.8']},
                              {name : 'discription', type: 'textarea', values: null }
                             ];


  sectionList: Section[]; //list of section available to select
  formList: Article_Form[]; //list of forms available to create article
  operatingSystemList = ['windows', 'linux', 'hp-ux', 'aix', 'sun-solaris'];  //list of operating systems
  versions = ['radia-1', 'radia-2', 'radia-3', 'radia-4', 'radia-5'];
                             
                             
                             

/**
 * Tiny MCE congiguration object : configuration object for tiny mce rich text editor 
 *  which replaces the normal textarea in angular form component
 **/                             
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


constructor(private fb: FormBuilder,
            private articleService: ArticleService,
            private articleAttachmentService: ArticleAttachmentsService,
            private sectionService: SectionService,
            private articleFormsService: ArticleFormsService,
            private router: Router) { }



ngOnInit() {
    this.articleFormsService.getArticleForm()
                            .subscribe((forms) => {
                              console.log(forms);
                              this.formList = forms;
                            },
                            (error) => {
                              console.log(error);
                            })

    this.sectionService.listSections()
                       .subscribe((sections) => {
                          console.log(sections);
                          this.sectionList = sections;
                       },
                        (error) => {
                          console.log(error);
                        })
                        
}

  updatePartialData() {
    this.article_form.patchValue({
      article_header : {
        title  : 'Default partial title',
        product : 'radia partial',
        section : 'admin partial',
        version : 1011
      }
    })
  }
  onSubmit() {
    // TODO: Use EventEmitter with form value
    console.log(this.article_form.value);

   let articleObj: Article = {
    title : this.article_form.value.article_header.title,
    section : {id : this.article_form.value.article_header.section,
               name: this.sectionList.filter(section => section.id == this.article_form.value.article_header.section)[0].name},
    author : {id: 112323, name: 'saurabh'},
    draft: {status :true, type: 'Draft'},
    formId: this.article_form.value.article_header.form,
    body : [
        {name: 'problem', value: this.article_form.value.article_body.problem},
        {name: 'prerequisites', value: this.article_form.value.article_body.prerequisites},
        {name: 'steps', value: this.article_form.value.article_body.steps},
        {name: 'resolution', value: this.article_form.value.article_body.resolution}
    ],
    review_state: {state: 'Non Technical Review State', value: 1},
    createdAt: new Date(),
    updatedAt: new Date()
    }

  
      this.articleService.postArticle({'article' : articleObj})
                         .subscribe((data) => {
                           console.log("succesfully created the article")
                           this.router.navigate(['/articles/list']);
                         },
                        (error) => {
                          console.log(error.error_on_req)
                          console.log(error.error)
                        })
    
   }

  

  }
  

