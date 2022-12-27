import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { throwError } from 'rxjs';
import { Category } from 'src/app/models/shared/app-constants';
import { TicketViewModel } from 'src/app/models/view-models/ticket-view-model';
import { NotifyService } from 'src/app/services/common/notify.service';
import { TicketService } from 'src/app/services/data/ticket.service';
import { ConfirmDialogComponent } from '../../common/confirm-dialog/confirm-dialog.component';

@Component({
  selector: 'app-ticket-view',
  templateUrl: './ticket-view.component.html',
  styleUrls: ['./ticket-view.component.css']
})
export class TicketViewComponent implements OnInit {

  tickets:TicketViewModel[] = [];
  dataSource:MatTableDataSource<TicketViewModel> = new MatTableDataSource(this.tickets);
  columns:string[] = [ 'passengerName', 'journeyDate','category', 'price', 'ticketValue','details', 'actions'];
  @ViewChild(MatSort, {static:false}) sort!:MatSort;
  @ViewChild(MatPaginator, {static:false}) paginator!:MatPaginator;
  constructor(
    private ticketService:TicketService,
    private notifyService:NotifyService,
    private matDialog:MatDialog
  ) { }
 getCategoryName(v:number):string {
  return Category[v];
 }
 confirmDelete(data:TicketViewModel){
  this.matDialog.open(ConfirmDialogComponent, {
    width: '450px',
    enterAnimationDuration: '500ms'
  }).afterClosed()
  .subscribe(result=>{
      if(result){
        this.ticketService.delete(data)
        .subscribe({
          next:r=>{
            this.notifyService.message("Data deleted", "DISMISS");
            this.dataSource.data = this.dataSource.data.filter(x=> x.ticketId != data.ticketId);
          },
          error: err=>{
            this.notifyService.message("Data delete failed", "DISMISS");
            throwError(()=>err);
          }
        });
      }
  });
 }
  ngOnInit(): void {
    this.ticketService.getVM()
    .subscribe({
      next: r=> {
        this.tickets = r;
        this.dataSource.data = this.tickets;
        this.dataSource.sort = this.sort;
        this.dataSource.paginator = this.paginator;
      },
      error:err=>{
        this.notifyService.message('Failed to load tickets', 'DISMISS');
        throwError(()=> err);
      }
    })
  }

}