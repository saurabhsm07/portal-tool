import { Component, OnInit, ViewChild } from '@angular/core';

import { ArticleFormsService } from '../../../services/article-forms-service/article-forms.service';
import {MatPaginator} from '@angular/material/paginator';
import {MatTableDataSource} from '@angular/material/table';
import { Article_Form } from '../../../classes/article_form';
import { Router } from '@angular/router';


@Component({
  selector: 'app-list-article-form',
  templateUrl: './list-article-form.component.html',
  styleUrls: ['./list-article-form.component.scss']
})
export class ListArticleFormComponent implements OnInit {


  public searchString = '';   // parameter for dynamic search article forms table
  public articleForms: Article_Form[]; // article forms list

  dataSource = new MatTableDataSource<Article_Form>(); // datasource
  displayedColumns: string[];     // saves column names of the article fields table
  paginator: MatPaginator;        // paginator for paginating the data table

  @ViewChild(MatPaginator, {static: false}) set matPaginator(mp: MatPaginator) {
    this.paginator = mp;
    }

  
  constructor(private articleFormService: ArticleFormsService,
              private router: Router) { }

  ngOnInit() {
    this.articleFormService.getArticleForm()
                            .subscribe((data) => {
                              console.log(data);
                              this.articleForms = data;

                              this.displayedColumns = ['name', 'id', 'created_at', 'edit'];
                              this.dataSource.data = this.articleForms;
                              this.dataSource.paginator = this.paginator;
                              this.dataSource.filter = this.searchString;

                            },
                            (error) => {
                              console.log(error);
                            });
  }

  filterTable() {
    this.dataSource.filter = this.searchString;
  }

  /**
   * navigate to edit article page with id
   * @param id : id of the article to edit
   */
  editArticleForm(id) {
    this.router.navigate(['/guide/article/forms/edit/' + id]);
  }

}
