import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MaterialModule } from './../imports/material-module';
import { FormsModule } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';
import { SegmentRoutingModule } from './routes/segment-routing.module';
import { CreateSegmentComponent } from './components/create-segment/create-segment.component';
import { EditSegmentComponent } from './components/edit-segment/edit-segment.component';
import { ListSegmentsComponent } from './components/list-segments/list-segments.component';
import { SegmentHomeComponent } from './components/segment-home/segment-home.component';


@NgModule({
  declarations: [CreateSegmentComponent, 
                 EditSegmentComponent, 
                 ListSegmentsComponent, 
                 SegmentHomeComponent],
  imports: [
    CommonModule,
    SegmentRoutingModule,
    MaterialModule,
    FormsModule,
    ReactiveFormsModule
  ]
})
export class SegmentModule { }
