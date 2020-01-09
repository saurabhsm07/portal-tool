import { Component, OnInit, Input, NgModule, NgModuleFactory, Compiler, ElementRef, ViewChild } from '@angular/core';
import { FormBuilder, Validators, ReactiveFormsModule, FormControl, FormGroup } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { Observable } from 'rxjs';
import { map, startWith } from 'rxjs/operators';

import {MatChipInputEvent} from '@angular/material/chips';
import {MatAutocompleteSelectedEvent, MatAutocomplete} from '@angular/material/autocomplete';
import {COMMA, ENTER} from '@angular/cdk/keycodes';

import { Article } from './../../../classes/article';
import { Article_Form } from './../../../classes/article_form';
import { Article_Field } from './../../../classes/article_fields'
import { Article_Label } from './../../../classes/article_label';
import { Section } from './../../../../Section-module/classes/section';
import { Segment } from './../../../../Segment-module/classes/segment';

import { ArticleService } from './../../../services/article-service/article.service';
import { ArticleAttachmentsService } from './../../../services/article-attachments-service/article-attachments.service';
import { ArticleFormsService } from './../../../services/article-forms-service/article-forms.service';
import { ArticleLabelsService } from './../../../services/article-labels-service/article-labels.service';
import { SectionService } from './../../../../Section-module/services/section-service/section.service';
import { ArticleFieldService } from './../../../services/article-fields-service/article-field-service.service';
import { SegmentService } from './../../../../Segment-module/services/segment-service/segment.service';
import { Router } from '@angular/router';

import { MaterialModule } from './../../../../imports/material-module';
import { EditorModule } from '@tinymce/tinymce-angular';
import { FieldComponentCreators } from './../../../../imports/field-component-creators';

@Component({
  selector: 'app-article-fields',
  templateUrl: './create-article.component.html',
  styleUrls: ['./create-article.component.scss'],
})
export class CreateArticleComponent implements OnInit {

  sectionList: Section[]; //list of section available to select
  formList: Article_Form[]; //list of forms available to create article
  userSegmentList: Segment[]; //list of user permission segments available 
  labelList: Article_Label[]; //list of article labels available to add to article
  articleAttachmentId: number; // folder Number to save article attachment in


  /**
   *  dynamically created form components
   */
  dynamicFormComponent;                       // component for the dynamic form
  dynamicFormModule: NgModuleFactory<any>;    // module for the dynamic form

  @Input()
  dynamicFormTemplate: string;    // the template string which will contain angular form components to be rendered later

  /**
   * material chip configuration for article labels
   */

  separatorKeysCodes: number[] = [ENTER, COMMA];
  filteredLabels: Observable<string[]>;
  allLabels: string[];
  selectedLabels: string[] = [];

  @ViewChild('labelInput', {static: false}) labelInput: ElementRef<HTMLInputElement>;
  @ViewChild('auto', {static: false}) matAutocomplete: MatAutocomplete;

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
        'article_id': this.articleAttachmentId
      })
        .subscribe((data) => {
          console.log("successfully saved the file")
          success(data.url)
        },
          (error) => {
            console.log(error)
          })

    }
  }

  /**    
   * Reactive article form to create new article
    */
    article_form = this.fb.group({
      article_header: this.fb.group({
        title: ['', [Validators.required]],
        form: ['', [Validators.required]],
        section: ['', [Validators.required]],
      }),
      // article_body: this.fb.group({
  
      // }),
      article_footer: this.fb.group({
        user_segment: ['', [Validators.required]],
        labels: [[]]
      })
  
    });

  constructor(private fb: FormBuilder,
    private articleService: ArticleService,
    private articleAttachmentService: ArticleAttachmentsService,
    private sectionService: SectionService,
    private articleFormsService: ArticleFormsService,
    private articleFieldService: ArticleFieldService,
    private articleLabelsService: ArticleLabelsService,
    private segmentService: SegmentService,
    private router: Router,
    private compiler: Compiler) { 

      this.filteredLabels = this.labels.valueChanges.pipe(
        startWith(null),
        map((label: string | null) => this.filterLabels(label)))
    }

  /**
   * Article form value getters 
   */
  get title()   { return this.article_form.get('article_header').get('title'); }
  get section() { return this.article_form.get('article_header').get('section'); }
  get form()    { return this.article_form.get('article_header').get('form'); }  //return current form selected in the article form
  get segment()    { return this.article_form.get('article_footer').get('user_segment'); }  //return current user segment selected in the article form
  get labels() { return this.article_form.get('article_footer').get('labels'); }



  /**
   *  add a article label to the labels array in article form
   * @param event add chip event object
   */
  addLabel(event: MatChipInputEvent): void {
    // Add label only when MatAutocomplete is not open
    // To make sure this does not conflict with OptionSelected Event
    if (!this.matAutocomplete.isOpen) {

      const input = event.input;
      const value = event.value;
      // Add our label
      if ((value || '').trim())  {
         if((this.selectedLabels.filter( val => val.toLowerCase() == value.trim().toLowerCase()).length == 0)){
          this.selectedLabels.push(value.trim());
         }
         else{
           console.log(`label "${value}" already exists`);
         }
        
      }

      // Reset the input value
      if (input) {
        input.value = '';
      }
    this.labels.setValue('')
    }

  }

  /**
   * removes a label from the article labels list
   * @param label : article label to be removed
   */
  removeLabel(label: string): void {
    const index = this.selectedLabels.indexOf(label);

    if (index >= 0) {
      this.selectedLabels.splice(index, 1);
    }
  }


  selectedLabel(event: MatAutocompleteSelectedEvent): void {
    if (!event.option) { return; }
    const input = event.source;
    const value = event.option.value;

    if ((value || '').trim()) {
      this.selectedLabels.push(value.trim());
      this.labels.setValue('');
    }
  }

  /**
   * function returns list of labels matching the perticular string
   * @param value value used to filter out label value
   */
  filterLabels(val: string | null): string[] {
   
    const matches = typeof val === 'string' ? this.allLabels.filter(label => label.toLowerCase().indexOf(val.toLowerCase())!= -1) : this.allLabels;
    return matches.filter(x => !this.selectedLabels.find(y => y === x));
  }

  /**
   * update field values 
   */
  updateLables(val: string){
    if(this.selectedLabels.length > 0)
      this.article_form.get('article_footer').get('labels').setValue(this.selectedLabels);
  }

  ngOnInit() {
 
    //data initialization steps
    this.fetchArticleLabels();
    this.fetchArticleForms();
    this.fetchSectionsList();
    this.fetchUserSegmentList();
    this.fetchArticleAutoIncrementId();
  
    
  }

  /**
   * Get list of all user article label objects from the database
   */
  private fetchArticleLabels() {
    this.articleLabelsService.getArticleLabels()
      .subscribe((labels) => {
        this.labelList = labels;
        this.allLabels = this.labelList.map(label => label.name);
      }, (error) => {
        console.log(error);
      });
  }

  /**
   * Get list of all user segment objects from the database
   */
  private fetchUserSegmentList() {
    this.segmentService.listSegments()
      .subscribe((segments) => {
        this.userSegmentList = segments;
      }, (error) => {
        console.log(error);
      });
  }

  /**
 * get i.d of the article to be created using auto increment for the Article Table on ID column
 */
  private fetchArticleAutoIncrementId() {
    this.articleService.getLastRecordId()
      .subscribe((data) => {
        console.log(data);
        this.articleAttachmentId = data.id;
      }, (error) => {
        console.log(error);
      });
  }

  /**
 * gets a list of sections from the database
 */
  private fetchSectionsList() {
    this.sectionService.listSections()
      .subscribe((sections) => {
        console.log(sections);
        this.sectionList = sections;
      }, (error) => {
        console.log(error);
      });
  }

  /**
 * gets a list of article forms from the database
 */
  private fetchArticleForms() {
    this.articleFormsService.getArticleForm()
      .subscribe((forms) => {
        console.log(forms);
        this.formList = forms;
      }, (error) => {
        console.log(error);
      });
  }

  /**
   * Event function called once the create article form is submitted ,
   * Saves the article object to the database
   */
  onSubmit() {

    console.log(this.article_form.value);
  
    let articleObj: Article = {
      title: this.article_form.value.article_header.title,
      section: {
        id: this.article_form.value.article_header.section,
        name: this.sectionList.filter(section => section.id == this.article_form.value.article_header.section)[0].name
      },
      author: { id: 112323, name: 'saurabh' },
      draft: { status: true, type: 'Draft' },
      label_names: this.article_form.value.article_footer.labels,
      article_form_id: this.article_form.value.article_header.form,
      user_segment_id: this.article_form.value.article_footer.user_segment,
      body: this.article_form.controls.article_body.value,
      review_state: { state: 'Non Technical Review State', value: 1 },
      created_at: new Date(Date.now()),
      updated_at: new Date(Date.now())
    }

    console.log(articleObj)
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

  validateData(){
    console.log(this.article_form.value);
  }
}