import { Component, OnInit } from '@angular/core';
import {CdkDragDrop, moveItemInArray} from '@angular/cdk/drag-drop';
import { Article_Fields } from '../../../classes/article_fields';

@Component({
  selector: 'app-article-form-fields',
  templateUrl: './article-form-fields.component.html',
  styleUrls: ['./article-form-fields.component.scss']
})
export class ArticleFormFieldsComponent implements OnInit {

//   tiny_mce_editor_config = {
//     base_url: '/assets/', 
//     suffix: '.min',
//     plugins: ``,
//     toolbar: ``,
//     menubar:  false,
//     height: 100,
//     max_height: 500,

//     images_upload_handler: (blobInfo, success, failure) => {
     
//       console.log(blobInfo.blob())
    
//       // this.articleAttachmentService.postArticleAttachment({ 'file_data' :blobInfo.blob(), 
//       //                                                        'inline': true,
//       //                                                        'article_id' : 155442 })
//       //                              .subscribe((data) => {
//       //                                console.log("successfully saved file")
//       //                                success(data.url)
//       //                              },
//       //                              (error) => {
//       //                                console.log(error)
//       //                              })
    
//     }
// }

  constructor() { }

  ngOnInit() {
  }

  article_fields : Article_Fields[] = [
  {id: 1,
   field_name: 'field_1',
   field_type: 'text',
   created_at: new Date(),
   required: false,
   active: true
  },

  {id: 2,
    field_name: 'field_2',
    field_type: 'text',
    created_at: new Date(),
    required: false,
    active: true
  },

  {id: 3,
    field_name: 'field_3',
    field_type: 'text',
    created_at: new Date(),
    required: false,
    active: true
   },

   {id: 4,
    field_name: 'field_4',
    field_type: 'text',
    created_at: new Date(),
    required: false,
    active: true
   }
  ];

  drop(event: CdkDragDrop<Article_Fields[]>) {
    console.log(event);
    console.log(this.article_fields)
    moveItemInArray(this.article_fields, event.previousIndex, event.currentIndex);
  }
}
