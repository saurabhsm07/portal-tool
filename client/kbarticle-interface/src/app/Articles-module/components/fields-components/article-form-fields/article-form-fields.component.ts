import { Component, OnInit } from '@angular/core';
import {CdkDragDrop, moveItemInArray} from '@angular/cdk/drag-drop';
import { Article_Fields } from '../../../classes/article_fields';

@Component({
  selector: 'app-article-form-fields',
  templateUrl: './article-form-fields.component.html',
  styleUrls: ['./article-form-fields.component.scss']
})
export class ArticleFormFieldsComponent implements OnInit {

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
    
      // this.articleAttachmentService.postArticleAttachment({ 'file_data' :blobInfo.blob(), 
      //                                                        'inline': true,
      //                                                        'article_id' : 155442 })
      //                              .subscribe((data) => {
      //                                console.log("successfully saved file")
      //                                success(data.url)
      //                              },
      //                              (error) => {
      //                                console.log(error)
      //                              })
    
    }
}

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

  drop(event: CdkDragDrop<string[]>) {
    moveItemInArray(this.article_fields, event.previousIndex, event.currentIndex);
  }
}
