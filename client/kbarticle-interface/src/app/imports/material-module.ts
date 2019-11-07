import { NgModule } from '@angular/core';
import {MatInputModule, MatSelectModule, MatRadioModule, MatButtonModule} from '@angular/material';
import {DragDropModule} from '@angular/cdk/drag-drop'

@NgModule({
    imports : [MatInputModule, MatSelectModule, MatRadioModule, MatButtonModule, DragDropModule],
    exports : [MatInputModule, MatSelectModule, MatRadioModule, MatButtonModule, DragDropModule],
})

export class MaterialModule{}