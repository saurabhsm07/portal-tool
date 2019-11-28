import { NgModule } from '@angular/core';
import {MatInputModule, MatSelectModule, MatRadioModule, MatButtonModule,
        MatCheckboxModule, MatPaginatorModule, MatTableModule, MatIconModule} from '@angular/material';
import {DragDropModule} from '@angular/cdk/drag-drop'
import {MatTooltipModule} from '@angular/material/tooltip';

@NgModule({
    imports : [MatInputModule, MatSelectModule, MatRadioModule, 
               MatButtonModule, DragDropModule, MatCheckboxModule,
               MatPaginatorModule, MatTableModule, MatTooltipModule, MatIconModule],
    exports : [MatInputModule, MatSelectModule, MatRadioModule, 
               MatButtonModule, DragDropModule, MatCheckboxModule,
               MatPaginatorModule, MatTableModule, MatTooltipModule, MatIconModule],
})

export class MaterialModule{}