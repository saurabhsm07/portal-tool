import { NgModule } from '@angular/core';
import {MatInputModule, MatSelectModule, MatRadioModule, MatButtonModule,MatCheckboxModule} from '@angular/material';
import {DragDropModule} from '@angular/cdk/drag-drop'

@NgModule({
    imports : [MatInputModule, MatSelectModule, MatRadioModule, MatButtonModule, DragDropModule, MatCheckboxModule],
    exports : [MatInputModule, MatSelectModule, MatRadioModule, MatButtonModule, DragDropModule, MatCheckboxModule],
})

export class MaterialModule{}