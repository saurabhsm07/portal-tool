import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { CreateSegmentComponent } from './../components/create-segment/create-segment.component';
import { EditSegmentComponent } from './../components/edit-segment/edit-segment.component';
import { SegmentHomeComponent } from './../components/segment-home/segment-home.component';


const routes: Routes = [
  { path: 'segments/home', component: SegmentHomeComponent },
  { path: 'segments/create', component: CreateSegmentComponent},
  { path: 'segments/id/:id', component: EditSegmentComponent}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class SegmentRoutingModule { }
