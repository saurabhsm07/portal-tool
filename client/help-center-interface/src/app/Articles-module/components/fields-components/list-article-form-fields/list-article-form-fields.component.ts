import { Component, OnInit, ViewChild } from '@angular/core';
import { Article_Field } from '../../../classes/article_fields';
import {ArticleFieldService } from '../../../services/article-fields-service/article-field-service.service'

import {MatPaginator} from '@angular/material/paginator';
import {MatTableDataSource} from '@angular/material/table';
import {Router} from '@angular/router'


@Component({
  selector: 'app-list-article-form-fields',
  templateUrl: './list-article-form-fields.component.html',
  styleUrls: ['./list-article-form-fields.component.scss']
})
export class ListArticleFormFieldsComponent implements OnInit {



  constructor(private articleFieldService: ArticleFieldService,
    private router: Router) { }

private searchString: string = '';   // arameter for dynamic search article fields table
private articleFields: Article_Field[]; // article fields list

dataSource = new MatTableDataSource<Article_Field>(); // datasource
displayedColumns: string[];     // saves column names of the article fields table
paginator: MatPaginator;        // paginator for paginating the data table

@ViewChild(MatPaginator, {static: false}) set matPaginator(mp: MatPaginator) {
this.paginator = mp;
}

ngOnInit() {
this.articleFieldService.getArticleField()
                  .subscribe((data) => {
                    console.log('fetched data');
                    this.articleFields = data;

                    this.displayedColumns = ['field_name', 'id', 'field_type', 'created_at', 'edit'];
                    this.dataSource.data = this.articleFields;
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
* navigate to edit article form page with id
* @param id : id of the article field to edit
*/
editArticleField(id) {
this.router.navigate(['/article/fields/edit/' + id]);
}

}
