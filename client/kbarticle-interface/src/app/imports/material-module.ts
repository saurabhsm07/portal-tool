import { NgModule } from '@angular/core';
import {MatInputModule, MatSelectModule, MatRadioModule, MatButtonModule,MatCheckboxModule, MatPaginatorModule, MatTableModule} from '@angular/material';
import {DragDropModule} from '@angular/cdk/drag-drop'

@NgModule({
    imports : [MatInputModule, MatSelectModule, MatRadioModule, MatButtonModule, DragDropModule, MatCheckboxModule,MatPaginatorModule, MatTableModule],
    exports : [MatInputModule, MatSelectModule, MatRadioModule, MatButtonModule, DragDropModule, MatCheckboxModule,MatPaginatorModule, MatTableModule],
})

export class MaterialModule{}