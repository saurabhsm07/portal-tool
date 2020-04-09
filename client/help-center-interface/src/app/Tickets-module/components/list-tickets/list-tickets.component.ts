import { Component, OnInit, ViewChild } from '@angular/core';

import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';

import { TicketService } from './../../services/ticket-service/ticket.service';
import { UserService } from './../../../Helpcenter-module/services/user-service/user.service';
import { Ticket } from '../../classes/ticket';
import { async } from '../../../../../node_modules/rxjs/internal/scheduler/async';

@Component({
  selector: 'app-list-tickets',
  templateUrl: './list-tickets.component.html',
  styleUrls: ['./list-tickets.component.scss']
})
export class ListTicketsComponent implements OnInit {

  tickets: Ticket[];   // List of Ticket objects
  public searchString = ''; //string used to filter TicketList on ticket name

  dataSource = new MatTableDataSource<Ticket>(); // datasource of type 'Ticket' for mat-table 
  displayedColumns: string[];     // saves column names of the segment table
  paginator: MatPaginator;        // paginator for paginating the data table

  @ViewChild(MatPaginator, { static: false }) set matPaginator(mp: MatPaginator) {
    this.paginator = mp;
  }

  constructor(private ticketService: TicketService,
    private userService: UserService) { }

  ngOnInit() {
    this.createGetTicketsRequest('requester')
    
  }

  /**
   * Initialize material table datasource
   */
  public initListTicketsDataSource() {
    this.displayedColumns = ['id', 'subject', 'created_at', 'updated_at', 'status'];
    this.dataSource.data = this.tickets;
    this.dataSource.paginator = this.paginator;
  }

  /**
   * method create a search tickets request based on the input parameter type  
   * @param query_type search parameter for the request (requester, organization, cc_requestss)
   */
  createGetTicketsRequest(query_type){
    
    if(query_type == 'requester'){
      const requester_id =  this.userService.getUserId();
      console.log(requester_id)
      this.getTickets(query_type, requester_id);
    }
    else if(query_type == 'org_requests'){
      const organization_ids = this.userService.getOrganizationIds();
      console.log(organization_ids)
      this.getTickets(query_type, organization_ids);
    }
    else if(query_type == 'cc_requests'){
      const requester_id =  this.userService.getUserId();
      console.log(requester_id)
      this.getTickets(query_type, requester_id);
    }
    else{
      console.log(`INVALID search query parameter = ${query_type}`);
    }
  }

  getTickets(query_type: string, query_value: number | number[]){
    console.log(query_value)
    this.ticketService
    .getTickets(query_type, query_value)
    .subscribe((ticketData) => {
      console.log(ticketData)
      this.tickets = ticketData;
      this.initListTicketsDataSource();
    }, (error) => {
      console.log(error);
    })
  }


}
