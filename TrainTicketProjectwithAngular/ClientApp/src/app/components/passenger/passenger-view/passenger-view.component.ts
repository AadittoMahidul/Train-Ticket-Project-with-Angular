import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { throwError } from 'rxjs';
import { Passenger } from 'src/app/models/data/passenger';
import { PassengerViewModel } from 'src/app/models/view-models/passenger-view-model';
import { NotifyService } from 'src/app/services/common/notify.service';
import { PassengerService } from 'src/app/services/data/passenger.service';
import { ConfirmDialogComponent } from '../../common/confirm-dialog/confirm-dialog.component';

@Component({
  selector: 'app-passenger-view',
  templateUrl: './passenger-view.component.html',
  styleUrls: ['./passenger-view.component.css']
})
export class PassengerViewComponent implements OnInit {
  passengers:PassengerViewModel[] = [];
  columnList:string[] =['passengerName', 'phone', 'email', 'actions'];
  dataSource:MatTableDataSource<Passenger> = new MatTableDataSource(this.passengers);
  @ViewChild(MatSort, {static:false}) sort!:MatSort;
  @ViewChild(MatPaginator, {static:false}) paginator!:MatPaginator;

  constructor(
    private passengerService:PassengerService,
    private notifyService: NotifyService,
    private matDialog:MatDialog
  ) { }

  confirmDelete(data:PassengerViewModel){
    //console.log(data);
    this.matDialog.open(ConfirmDialogComponent, {
      width: '450px',
      enterAnimationDuration: '500ms'
    }).afterClosed()
    .subscribe(result=>{
      //console.log(result);
      if(result){
        this.passengerService.delete(data)
        .subscribe({
          next: r=>{
            this.notifyService.message('Passenger removed', 'DISMISS');
            this.dataSource.data = this.dataSource.data.filter(c => c.passengerId != data.passengerId);
          },
          error:err=>{
            this.notifyService.message('Failed to delete data', 'DISMISS');
            throwError(()=>err);
          }
        })
      }
    })
  }
  ngOnInit(): void {
    this.passengerService.getVM().subscribe({
      next: r=>{
        this.passengers = r;
        //console.log(this.passengers);
        this.dataSource.data = this.passengers;
        this.dataSource.sort = this.sort;
        this.dataSource.paginator = this.paginator;
      },
      error: err=>{
        this.notifyService.message("Failed to load passengers", "DISMISS");
        throwError(()=>err)    
      }
    }); 
  }
}

