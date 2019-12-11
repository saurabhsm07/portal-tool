import { Component, OnInit, ViewChild } from '@angular/core';
import { Section } from './../../classes/section';
import { SectionService } from './../../services/section-service/section.service';

import {MatPaginator} from '@angular/material/paginator';
import {MatTableDataSource} from '@angular/material/table';
import { Router } from '@angular/router';

@Component({
  selector: 'app-list-sections',
  templateUrl: './list-sections.component.html',
  styleUrls: ['./list-sections.component.scss']
})
export class ListSectionsComponent implements OnInit {
  sections: Section[];   // List of Section objects
  private searchString = '';

  dataSource = new MatTableDataSource<Section>(); // datasource of type 'Section' for mat-table 
  displayedColumns: string[];     // saves column names of the article table
  paginator: MatPaginator;        // paginator for paginating the data table

  @ViewChild(MatPaginator, {static: false}) set matPaginator(mp: MatPaginator) {
    this.paginator = mp;
    }

  constructor(private sectionService: SectionService,
              private route: Router) { }

  ngOnInit() {
    this.sectionService.listSections()
                        .subscribe((data) =>{
                          console.log(data);
                          this.sections = data;

                         
                          this.displayedColumns = ['name', 'id', 'created_at', 'edit'];
                          this.dataSource.data = this.sections;
                          this.dataSource.paginator = this.paginator;
                          this.dataSource.filter = this.searchString;
                        },
                        (error) =>{
                          console.log(error);
                        })
  }

  viewSection(sectionId){
    this.route.navigate(['/section/id/'+sectionId])
  }

}
