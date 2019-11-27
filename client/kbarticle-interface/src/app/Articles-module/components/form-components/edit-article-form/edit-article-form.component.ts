import { Component, OnInit } from '@angular/core';
import { Article_Field } from './../../../classes/article_fields';
import { ArticleFieldService } from './../../../services/article-fields-service/article-field-service.service';
import { ArticleFormsService } from './../../../services/article-forms-service/article-forms.service';
import { Router, ActivatedRoute, ParamMap } from '@angular/router';
import { Observable } from 'rxjs';
import { switchMap } from 'rxjs/operators';
import { Article_Form } from '../../../classes/article_form';
import {CdkDragDrop, moveItemInArray, transferArrayItem} from '@angular/cdk/drag-drop';

@Component({
  selector: 'app-edit-article-form',
  templateUrl: './edit-article-form.component.html',
  styleUrls: ['./edit-article-form.component.scss']
})
export class EditArticleFormComponent implements OnInit {

  private article_fields_incl: Article_Field[];
  private article_fields_excl: Article_Field[];
  private article_form$: Observable<Article_Form>;
  private article_form : Article_Form;
  private form_name: string;
  
  protected field_type_icon = {
    text : 'fa fa-text-width',
    textarea : 'fa fa-bars',
    dropdown: 'fa fa-caret-square-o-down',
    multiselect: 'fa fa-list',
    checkbox: 'fa fa-check-square-o',
    radiobox: 'fa fa-check-circle'
  };

  constructor(private articleFieldService: ArticleFieldService,
    private articleFormService: ArticleFormsService,
    private router: Router,
    private route: ActivatedRoute) { }

  ngOnInit() {

    this.article_form$ = this.route.paramMap.pipe(
      switchMap((params: ParamMap) =>
        this.articleFormService.getArticleFormById(params.get('id')))
    );
    // get all article forms
    this.article_form$.subscribe( (data) => {
      this.article_form = data[0];
      this.form_name = this.article_form.name;
      this.articleFieldService.getArticleField()
                              .subscribe( (fields) => {
                                const includedIds = JSON.parse(this.article_form.article_fields).map( (field) => field.id)
                                
                                this.article_fields_incl = JSON.parse(this.article_form.article_fields);
                                this.article_fields_excl = fields.filter( (field) => { if(includedIds.includes(field.id) == false) return field });


                              }, (error) => {
                                console.log(error)
                              })
    }, (error) => {
      console.log(error)
    })

  }

  drop(event: CdkDragDrop<Article_Field[]>) {
    console.log(event);
    if (event.previousContainer === event.container) {
      moveItemInArray(event.container.data, event.previousIndex, event.currentIndex);
    } else {
      transferArrayItem(event.previousContainer.data,
                        event.container.data,
                        event.previousIndex,
                        event.currentIndex);
    }
  }

  updateForm() {
    const article_form: Article_Form = {
      name: this.form_name,
      article_fields: JSON.stringify(this.article_fields_incl),
      updated_at: new Date()
    }
    console.log(article_form)

    this.articleFormService.putArticleForm(article_form, this.article_form.id)
        .subscribe((res) => {
          console.log(`successfully update form with id = ${res.id}`)
          this.router.navigate(['/article/forms/list'])
        }, (error) => {
          console.log(error)
        });
    }
  }


