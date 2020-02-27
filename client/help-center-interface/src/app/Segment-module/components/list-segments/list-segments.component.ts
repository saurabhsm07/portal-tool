import { Component, OnInit, ViewChild } from '@angular/core';
import { Segment } from '../../classes/segment';
import { SegmentService } from '../../services/segment-service/segment.service';

import {MatPaginator} from '@angular/material/paginator';
import {MatTableDataSource} from '@angular/material/table';
import { Router } from '@angular/router';

@Component({
  selector: 'app-list-segments',
  templateUrl: './list-segments.component.html',
  styleUrls: ['./list-segments.component.scss']
})
export class ListSegmentsComponent implements OnInit {
  userSegments: Segment[];   // List of Segment objects
  public searchString = ''; //string used to filter SegmentsList on section name

  dataSource = new MatTableDataSource<Segment>(); // datasource of type 'Segment' for mat-table 
  displayedColumns: string[];     // saves column names of the segment table
  paginator: MatPaginator;        // paginator for paginating the data table

  @ViewChild(MatPaginator, {static: false}) set matPaginator(mp: MatPaginator) {
    this.paginator = mp;
    }

    constructor(private segmentService: SegmentService,
                private route: Router) { }

                ngOnInit() {
                  this.segmentService.listSegments()
                                      .subscribe((segments) =>{
                                        console.log(segments);
                                        this.userSegments = segments;
              
                                       
                                        this.displayedColumns = ['name', 'id', 'created_at', 'edit'];
                                        this.dataSource.data = this.userSegments;
                                        this.dataSource.paginator = this.paginator;
                                        this.dataSource.filter = this.searchString;
                                      },
                                      (error) =>{
                                        console.log(error);
                                      })
                }

                viewSegment(segmentId){
                  this.route.navigate(['/segments/id/'+segmentId])
                }

}
