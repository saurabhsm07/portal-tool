import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ComponentNotFoundComponent } from './Helpcenter-module/components/component-not-found/component-not-found.component';

const routes: Routes = [
  {path: '**', component: ComponentNotFoundComponent}

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }