import { NgModule } from '@angular/core';
import {MatInputModule, MatSelectModule, MatRadioModule, MatButtonModule,
        MatCheckboxModule, MatPaginatorModule, MatTableModule, MatIconModule, MatAutocompleteModule, MatChipsModule} from '@angular/material';
import {DragDropModule} from '@angular/cdk/drag-drop'
import {MatTooltipModule} from '@angular/material/tooltip';


@NgModule({
    imports : [MatInputModule, MatSelectModule, MatRadioModule, 
               MatButtonModule, DragDropModule, MatCheckboxModule,
               MatPaginatorModule, MatTableModule, MatTooltipModule, MatIconModule,
               MatChipsModule, MatAutocompleteModule],
    exports : [MatInputModule, MatSelectModule, MatRadioModule, 
               MatButtonModule, DragDropModule, MatCheckboxModule,
               MatPaginatorModule, MatTableModule, MatTooltipModule, MatIconModule,
               MatChipsModule, MatAutocompleteModule],
})

export class MaterialModule{}