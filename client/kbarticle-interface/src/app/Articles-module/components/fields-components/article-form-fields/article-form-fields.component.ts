import { Component, OnInit } from '@angular/core';
import {CdkDragDrop, moveItemInArray} from '@angular/cdk/drag-drop';
import { Article_Fields } from '../../../classes/article_fields';

@Component({
  selector: 'app-article-form-fields',
  templateUrl: './article-form-fields.component.html',
  styleUrls: ['./article-form-fields.component.scss']
})
export class ArticleFormFieldsComponent implements OnInit {

  constructor() { }

  ngOnInit() {
  }

  article_body_fields : Article_Fields[] = [
  {id: 1,
   field_name: 'Problem',
   field_type: 'text',
   created_at: new Date(),
   required: false,
   active: true
  },

  {id: 2,
    field_name: 'Prerequisites',
    field_type: 'text',
    created_at: new Date(),
    required: false,
    active: true
  },

  {id: 3,
    field_name: 'Steps',
    field_type: 'text',
    created_at: new Date(),
    required: false,
    active: true
   },

   {id: 4,
    field_name: 'Resolution',
    field_type: 'text',
    created_at: new Date(),
    required: false,
    active: true
   }
  ];

  article_header_fields : Article_Fields[] = [
    {id: 1,
     field_name: 'Section',
     field_type: 'dropdown',
     created_at: new Date(),
     required: false,
     active: true
    },
  
    {id: 2,
      field_name: 'Product Version',
      field_type: 'multiselect',
      created_at: new Date(),
      required: false,
      active: true
    },
  
    {id: 3,
      field_name: 'Operating System',
      field_type: 'multiselect',
      created_at: new Date(),
      required: false,
      active: true
     },
    ];

  dropHeaderAttr(event: CdkDragDrop<Article_Fields[]>) {
    console.log(event);
    console.log(this.article_header_fields)
    moveItemInArray(this.article_header_fields, event.previousIndex, event.currentIndex);
  }

  dropBodyAttr(event: CdkDragDrop<Article_Fields[]>) {
    console.log(event);
    console.log(this.article_body_fields)
    moveItemInArray(this.article_body_fields, event.previousIndex, event.currentIndex);
  }
}
