import { Component, OnInit } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { ActivatedRoute } from '@angular/router';
import { throwError } from 'rxjs';
import { TicketItem } from 'src/app/models/data/ticket-item';
import { Category } from 'src/app/models/shared/app-constants';
import { TicketAndTicketItemViewModel } from 'src/app/models/view-models/ticket-and-ticket-item-view-model';
import { NotifyService } from 'src/app/services/common/notify.service';
import { TicketService } from 'src/app/services/data/ticket.service';

@Component({
  selector: 'app-ticket-details',
  templateUrl: './ticket-details.component.html',
  styleUrls: ['./ticket-details.component.css']
})
export class TicketDetailsComponent implements OnInit {

  ticket:TicketAndTicketItemViewModel = {};
  
  dataSource:MatTableDataSource<TicketItem>= new MatTableDataSource(this.ticket.ticketItems);
  columns:string[] = ['train', 'quantity'];
  
    constructor(
      private ticketService:TicketService,
      private notifyService:NotifyService,
      private activatedRoute:ActivatedRoute
    ){}
    getCategoryName(v:any):string {
      return Category[<number>v];
     }
  ngOnInit(): void {
    this.ticket.ticketItems=[];
    let id:number = this.activatedRoute.snapshot.params['id'];
    this.ticketService.getWithItems(id)
    .subscribe({
      next: r=>{
        this.ticket= r;
        this.ticket.ticketItems?.forEach(element => {
          console.log(element);
        });
        console.log(this.ticket)
        this.dataSource.data=this.ticket.ticketItems as TicketItem[];
      },
      error:err=>{
        this.notifyService.message('Failed to load tickets', 'DISMISS');
        throwError(()=> err);
      }
    });
  }
}
