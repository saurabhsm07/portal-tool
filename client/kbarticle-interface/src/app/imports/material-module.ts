import { NgModule } from '@angular/core';
import {MatInputModule, MatSelectModule, MatRadioModule, MatButtonModule,
        MatCheckboxModule, MatPaginatorModule, MatTableModule, MatIconModule, 
        MatAutocompleteModule, MatChipsModule, MatMenuModule, MatSlideToggleModule} from '@angular/material';
import {DragDropModule} from '@angular/cdk/drag-drop'
import {MatTooltipModule} from '@angular/material/tooltip';


@NgModule({
    imports : [MatInputModule, MatSelectModule, MatRadioModule, 
               MatButtonModule, DragDropModule, MatCheckboxModule,
               MatPaginatorModule, MatTableModule, MatTooltipModule, MatIconModule,
               MatChipsModule, MatAutocompleteModule, MatMenuModule, MatSlideToggleModule],
    exports : [MatInputModule, MatSelectModule, MatRadioModule, 
               MatButtonModule, DragDropModule, MatCheckboxModule,
               MatPaginatorModule, MatTableModule, MatTooltipModule, MatIconModule,
               MatChipsModule, MatAutocompleteModule, MatMenuModule, MatSlideToggleModule],
})

export class MaterialModule{}