import { Component, OnInit, Input, NgModule, NgModuleFactory, Compiler} from '@angular/core';
import {FormBuilder, Validators} from '@angular/forms';
import { Article } from './../../../classes/article';
import { Section } from './../../../../Section-module/classes/section';
import { Article_Form } from './../../../classes/article_form';
import { ArticleService } from './../../../services/article-service/article.service';
import { ArticleAttachmentsService} from './../../../services/article-attachments-service/article-attachments.service';
import { ArticleFormsService } from './../../../services/article-forms-service/article-forms.service';
import { SectionService } from './../../../../Section-module/services/section-service/section.service';
import { Router } from '@angular/router';

import { MaterialModule } from './../../../../imports/material-module';
import { EditorModule } from '@tinymce/tinymce-angular';

import { FieldComponentCreators } from './../../../../imports/field-component-creators';


@Component({
  selector: 'app-article-fields',
  templateUrl: './create-article.component.html',
  styleUrls: ['./create-article.component.scss']
})
export class CreateArticleComponent implements OnInit {

  sectionList: Section[]; //list of section available to select
  formList: Article_Form[]; //list of forms available to create article
  operatingSystemList = ['windows', 'linux', 'hp-ux', 'aix', 'sun-solaris'];  //list of operating systems
  versions = ['radia-1', 'radia-2', 'radia-3', 'radia-4', 'radia-5'];
                             
  /**
   *  dynamically created form components
   */
  dynamicFormComponent;                       // component for the dynamic form
  dynamicFormModule: NgModuleFactory<any>;    // module for the dynamic form

  @Input()
  dynamicFormTemplate: string;    // the template string which will contain angular form components to be rendered later
                             

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

get formId(){ return this.article_form.value.article_header.form;}  //return current form selected in the article form

constructor(private fb: FormBuilder,
            private articleService: ArticleService,
            private articleAttachmentService: ArticleAttachmentsService,
            private sectionService: SectionService,
            private articleFormsService: ArticleFormsService,
            private router: Router,
            private compiler: Compiler) { }



ngOnInit() {
    /**
     * gets a list of article forms from the database
     */
    this.articleFormsService.getArticleForm()
                            .subscribe((forms) => {
                              console.log(forms);
                              this.formList = forms;
                            },
                            (error) => {
                              console.log(error);
                            })

    /**
     * gets a list of sections from the database
     */
    this.sectionService.listSections()
                       .subscribe((sections) => {
                          console.log(sections);
                          this.sectionList = sections;
                       },
                        (error) => {
                          console.log(error);
                        })           
}

  /**
   * Event function called once the create article form is submitted ,
   * Saves the article object to the database
   */
  onSubmit() {

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
                           console.log("succesfully created the article");
                           this.router.navigate(['/articles/list']);
                         },
                        (error) => {
                          console.log(error.error_on_req);
                          console.log(error.error);
                        })
    }

/**
 * Event function : called when user selects a form from the select form dropdown menu,
 *                  in create_article form 
 */
protected renderArticleForm(){
  const selectedForm = this.formList.filter((form) => form.id == this.formId)[0];
  
  let formBodyTemplate = FieldComponentCreators.createFieldComponent(JSON.parse(selectedForm.article_fields));
  console.log(formBodyTemplate);
  this.dynamicFormTemplate = formBodyTemplate;
  this.dynamicFormComponent = this.createNewComponent(this.dynamicFormTemplate);
  this.dynamicFormModule = this.compiler.compileModuleSync(this.createComponentModule(this.dynamicFormComponent));
}

/**
 * Creates a dynamic module to be injected in ngModuleFactory
 * @param componentType : dynamic component to be created appended added in entry components array of the dynamic Module
 */
protected createComponentModule (componentType: any) {
  @NgModule({
    imports: [ MaterialModule, EditorModule],
    declarations: [
      componentType
    ],
    entryComponents: [componentType]
  })
  class RuntimeComponentModule
  {
  }
  // a module for just this Type
  return RuntimeComponentModule;
}

/**
 * dynamically creates the required angular component
 * @param template : the template containing angular specific components to be rendered at runtime
 */
protected createNewComponent (template: string) {
  let formTemplate = template;

  @Component({
    selector: 'dynamic-form-component',
    template: formTemplate
  })
  class DynamicFormComponent implements OnInit{
     template: any;

     ngOnInit() {
     this.template = template;
     }
  }
  return DynamicFormComponent;
}
}