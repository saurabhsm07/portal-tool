import { Component, OnInit, ViewChild } from '@angular/core';

import {MatPaginator} from '@angular/material/paginator';
import {MatTableDataSource} from '@angular/material/table';

import { TicketService } from './../../services/ticket-service/ticket.service';
import { UserService } from './../../../Helpcenter-module/services/user-service/user.service';
import { Ticket } from '../../classes/ticket';

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

  @ViewChild(MatPaginator, {static: false}) set matPaginator(mp: MatPaginator) {
    this.paginator = mp;
    }

  constructor(private ticketService : TicketService,
              private userService : UserService) { }

  ngOnInit() {
  const requester = this.userService.getUserId()    
    this.ticketService
        .getTickets('requester',requester.toString(), 'any')
        .subscribe((ticketData) => {
            console.log(ticketData)
            this.tickets = ticketData;
            this.displayedColumns = ['id', 'subject', 'created_at', 'updated_at', 'status'];
            this.dataSource.data = this.tickets;
            this.dataSource.paginator = this.paginator;
        }, (error) => {
            console.log(error);
          })
        }

        }
