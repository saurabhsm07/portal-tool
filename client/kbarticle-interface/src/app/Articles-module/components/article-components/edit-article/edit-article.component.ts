import { Component, OnInit, Input, NgModule, NgModuleFactory, Compiler } from '@angular/core';
import { FormBuilder, Validators, ReactiveFormsModule, FormControl, FormGroup } from '@angular/forms';
import { Article } from './../../../classes/article';
import { Section } from './../../../../Section-module/classes/section';
import { Article_Form } from './../../../classes/article_form';
import { ArticleService } from './../../../services/article-service/article.service';
import { ArticleAttachmentsService } from './../../../services/article-attachments-service/article-attachments.service';
import { ArticleFormsService } from './../../../services/article-forms-service/article-forms.service';
import { SectionService } from './../../../../Section-module/services/section-service/section.service';
import { ArticleFieldService } from './../../../services/article-fields-service/article-field-service.service';
import { Router, ActivatedRoute, ParamMap } from '@angular/router';
import { Observable } from 'rxjs';
import { MaterialModule } from './../../../../imports/material-module';
import { EditorModule } from '@tinymce/tinymce-angular';
import { switchMap } from 'rxjs/operators';
import { FieldComponentCreators } from './../../../../imports/field-component-creators';
import { Article_Field } from './../../../classes/article_fields';


@Component({
  selector: 'app-edit-article',
  templateUrl: './edit-article.component.html',
  styleUrls: ['./edit-article.component.scss']
})
export class EditArticleComponent implements OnInit {


  
  /**
   *  dynamically created form components
   */
  dynamicFormComponent;                       // component for the dynamic form
  dynamicFormModule: NgModuleFactory<any>;    // module for the dynamic form

  @Input()
  dynamicFormTemplate: string;    // the template string which will contain angular form components to be rendered later


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

  article$: Observable<Article>;
  @Input()
  articleObj : Article;

  sectionList: Section[]; //list of section available to select
  selectedForm: Article_Form; //selected article form
  // reactive article form to create new article
  article_form = this.fb.group({
    article_header: this.fb.group({
      title: [''],
      form: [{value:'',disabled: true}],
      section: [''],
    }),
    article_body: this.fb.group({

    })

  });

  get formId() { return this.article_form.value.article_header.form; }  //return current form selected in the article form

  constructor(private fb: FormBuilder,
    private articleService: ArticleService,
    private articleAttachmentService: ArticleAttachmentsService,
    private sectionService: SectionService,
    private articleFormsService: ArticleFormsService,
    private articleFieldService: ArticleFieldService,
    private router: Router,
    private route: ActivatedRoute,
    private compiler: Compiler) { }

  ngOnInit() {
    this.article$ = this.route.paramMap.pipe(
      switchMap((params: ParamMap) =>
        this.articleService.getArticle(params.get('id')))
    );
    
    this.article$.subscribe((data : Article) => {
      this.articleObj = data;
      this.articleObj.body = Object.keys(JSON.parse(<string> data.body)).map((key) => { return {key: key, value: JSON.parse(<string> data.body)[key]}});
      this.articleObj.author = JSON.parse(<string> data.author);
      this.articleObj.draft = JSON.parse(<string> data.draft);
      this.articleObj.review_state = JSON.parse(<string> data.review_state);


    this.fetchAllSections();

      console.log(this.articleObj);
      this.updateFormHeader();
      this.renderArticleForm();
      
  })
}

    /**
 * gets a list of sections from the database
 */
  private fetchAllSections() {
    this.sectionService.listSections()
      .subscribe((sections) => {
        console.log(sections);
        this.sectionList = sections;
      }, (error) => {
        console.log(error);
      });
  }

/**
 * Updates form header information
 */
  private updateFormHeader() {
    this.article_form.controls.article_header.patchValue({
      title: this.articleObj.title,
      form: this.articleObj.article_form_id,
      section: JSON.parse(this.articleObj.section).id,
    });
  }

  public updateArticle(){

    let article: Article = {
      id: this.articleObj.id,
      title: this.article_form.value.article_header.title,
      section: JSON.stringify({
        id: this.article_form.value.article_header.section,
        name: this.sectionList.filter(section => section.id == this.article_form.value.article_header.section)[0].name
      }),
      author: { id: 112323, name: 'saurabh' },
      draft: { status: true, type: 'Draft' },
      body: this.article_form.controls.article_body.value,
      review_state: { state: 'Non Technical Review State', value: 1 },
      updatedAt: new Date()
    }
    this.articleService.updateArticle({'article': article})
                       .subscribe((data) => {
                        console.log(data)
                        this.router.navigate(['/article/', article.id]);
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

    /**
   * Event function : called when user selects a form from the select form dropdown menu,
   *                  in create_article form 
   */
  protected renderArticleForm() {

    
    let formFields: Article_Field[];
    this.articleFormsService.getArticleFormById(this.articleObj.article_form_id.toString())
                            .subscribe((form)=>{
                              this.selectedForm = form;
                              this.articleFieldService.listArticleFieldByIds(this.selectedForm.article_fields)
                              .subscribe((fields) => {
                                formFields = fields;
                                formFields = this.UpdateFieldSequence(this.selectedForm, formFields);
                                this.renderComponent(formFields);
                              }, (error) => {
                                console.log(error);
                              })
                            },(error) => {
                              console.log(error);
                            })

   
}




  /**
   * Function updates the field sequence based on article field ids in selected form object
   * @param selectedForm : form object element from list of available article forms array
   * @param formFields  : list of fields required to render the selected article form
   */
  private UpdateFieldSequence(selectedForm: Article_Form, formFields: Article_Field[]) {
    let formFieldsArranged: Article_Field[] = [];
    JSON.parse(selectedForm.article_fields).forEach(element => {
      formFieldsArranged.push(formFields.filter((field) => {
      if (field.id == element)
        return field;
      })[0]);
    });
    formFields = formFieldsArranged;
    return formFields;
  }

  /**
   * Function renders article body component based on form fields provided.
   * @param formFields : 
   */
  private renderComponent(formFields: Article_Field[]) {
    this.article_form.setControl('article_body', this.fb.group([]));
    console.log(this.article_form.controls);
    let formBodyTemplate = FieldComponentCreators.createFieldComponent(formFields);
    this.dynamicFormTemplate = formBodyTemplate;
    this.dynamicFormComponent = this.createNewComponent(this.dynamicFormTemplate, formFields, <FormGroup>this.article_form.controls['article_body'], this.articleObj);
    this.dynamicFormModule = this.compiler.compileModuleSync(this.createComponentModule(this.dynamicFormComponent));
  }



  /**
   * Creates a dynamic module to be injected in ngModuleFactory
   * @param componentType : dynamic component to be created appended added in entry components array of the dynamic Module
   */
  protected createComponentModule(componentType: any) {
    @NgModule({
      imports: [MaterialModule, EditorModule, ReactiveFormsModule],
      declarations: [
        componentType
      ],
      entryComponents: [componentType]
    })
    class RuntimeComponentModule {
    }
    // a module for just this Type
    return RuntimeComponentModule;
  }

  /**
   * dynamically creates the required angular component
   * @param template : the template containing angular specific components to be rendered at runtime
   */
  protected createNewComponent(template: string, fields: Article_Field[], article_body_obj: FormGroup, articleObj: Article) {
    let formTemplate = template;
    let editorConfig = this.tiny_mce_editor_config;

    @Component({
      selector: 'dynamic-form-component',
      template: formTemplate
    })
    class DynamicFormComponent implements OnInit {
      template: any;
      tiny_mce_editor_config = editorConfig;
      article_body = article_body_obj;
      article = articleObj;

      ngOnInit() {
        this.template = template;
        let fieldInformation = {}
        console.log(fields);
        fields.forEach(field => {
          let field_name = field.field_name.replace(/ /g, "_").toLowerCase();
          if(Array.isArray(this.article.body)){
          this.article_body.addControl(field_name, new FormControl(this.article.body.filter(element => element.key == field_name)[0].value));
         }
          
          fieldInformation[field.field_name.replace(/ /g, "_").toLowerCase()] = { id: field.id, name: field.field_name, type: field.field_type };
        });
        this.article_body.addControl('fieldValues', new FormControl({}));
        this.article_body.addControl('fieldInformation', new FormControl(fieldInformation));
      }

      //  validateVals(){
      //    console.log(this.article_body.value)
      //  }

      updateFieldValueArray(event) {
        let values = {};
        event.source.selected.forEach(element => {
          values[element.value] = element._element.nativeElement.innerText
        })
        this.article_body.patchValue({ 'fieldValues': values });
      }

    }
    return DynamicFormComponent;
  }
}
