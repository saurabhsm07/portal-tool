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
import { Router } from '@angular/router';

import { MaterialModule } from './../../../../imports/material-module';
import { EditorModule } from '@tinymce/tinymce-angular';

import { FieldComponentCreators } from './../../../../imports/field-component-creators';
import { Article_Field } from './../../../classes/article_fields';
import { CommonModule } from '@angular/common';


@Component({
  selector: 'app-article-fields',
  templateUrl: './create-article.component.html',
  styleUrls: ['./create-article.component.scss']
})
export class CreateArticleComponent implements OnInit {

  sectionList: Section[]; //list of section available to select
  formList: Article_Form[]; //list of forms available to create article


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
    menubar: false,
    height: 300,
    max_height: 500,

    images_upload_handler: (blobInfo, success, failure) => {

      console.log(blobInfo.blob())

      this.articleAttachmentService.postArticleAttachment({
        'file_data': blobInfo.blob(),
        'inline': true,
        'article_id': 155442
      })
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
    article_header: this.fb.group({
      title: ['', [Validators.required]],
      form: ['', [Validators.required]],
      section: ['', [Validators.required]],
    }),
    article_body: this.fb.group({

    })

  });

  get title()   { return this.article_form.get('article_header').get('title'); }
  get section() { return this.article_form.get('article_header').get('section'); }
  get form()    { return this.article_form.get('article_header').get('form'); }  //return current form selected in the article form

  constructor(private fb: FormBuilder,
    private articleService: ArticleService,
    private articleAttachmentService: ArticleAttachmentsService,
    private sectionService: SectionService,
    private articleFormsService: ArticleFormsService,
    private articleFieldService: ArticleFieldService,
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

    // console.log(this.article_form.controls.article_body.value);

    let articleObj: Article = {
      title: this.article_form.value.article_header.title,
      section: JSON.stringify({
        id: this.article_form.value.article_header.section,
        name: this.sectionList.filter(section => section.id == this.article_form.value.article_header.section)[0].name
      }),
      author: { id: 112323, name: 'saurabh' },
      draft: { status: true, type: 'Draft' },
      article_form_id: this.article_form.value.article_header.form,
      body: this.article_form.controls.article_body.value,
      review_state: { state: 'Non Technical Review State', value: 1 },
      createdAt: new Date(),
      updatedAt: new Date()
    }


    this.articleService.postArticle({ 'article': articleObj })
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
  protected renderArticleForm() {
    const selectedForm = this.formList.filter((form) => form.id == this.article_form.value.article_header.form)[0];

    let formFields: Article_Field[];

    console.log(JSON.parse(selectedForm.article_fields));

    this.articleFieldService.listArticleFieldByIds(selectedForm.article_fields)
      .subscribe((data) => {
        formFields = data;
        formFields = this.UpdateFieldSequence(selectedForm, formFields);
        this.renderComponent(formFields);
      }, (error) => {
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
    // console.log(this.article_form.controls);
    let formBodyTemplate = FieldComponentCreators.createFieldComponent(formFields);
    this.dynamicFormTemplate = formBodyTemplate;
    this.dynamicFormComponent = this.createNewComponent(this.dynamicFormTemplate, formFields, <FormGroup>this.article_form.controls['article_body']);
    this.dynamicFormModule = this.compiler.compileModuleSync(this.createComponentModule(this.dynamicFormComponent));
  }



  /**
   * Creates a dynamic module to be injected in ngModuleFactory
   * @param componentType : dynamic component to be created appended added in entry components array of the dynamic Module
   */
  protected createComponentModule(componentType: any) {
    @NgModule({
      imports: [MaterialModule, EditorModule, ReactiveFormsModule, CommonModule],
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
  protected createNewComponent(template: string, fields: Article_Field[], article_body_obj: FormGroup) {
    let formTemplate = template;
    let editorConfig = this.tiny_mce_editor_config;

    @Component({
      selector: 'dynamic-form-component',
      template: formTemplate,
      styles: [`.article-body-attr {
                padding: 10px 0px 10px 0px;
              }`]
    })
    class DynamicFormComponent implements OnInit {
      template: any;
      tiny_mce_editor_config = editorConfig;
      article_body = article_body_obj;


      ngOnInit() {
        this.template = template;
        console.log(fields);
        this.addFieldFormControls();
      }

      private addFieldFormControls() {
        let fieldInformation = {}
        fields.forEach(field => {
         
          if(field.required){
            this.article_body.addControl(field.field_name.replace(/ /g, "_").toLowerCase(), new FormControl('', Validators.required));
          }else{
            this.article_body.addControl(field.field_name.replace(/ /g, "_").toLowerCase(), new FormControl(''));
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

  // validateData(){
  //   console.log(this.article_form.value);
  // }

}