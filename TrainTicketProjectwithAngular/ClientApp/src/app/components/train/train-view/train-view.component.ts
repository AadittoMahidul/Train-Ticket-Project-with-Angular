import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { throwError } from 'rxjs';
import { baseUrl } from 'src/app/models/shared/app-constants';
import { TrainViewModel } from 'src/app/models/view-models/train-view-model';
import { NotifyService } from 'src/app/services/common/notify.service';
import { TrainService } from 'src/app/services/data/train.service';
import { ConfirmDialogComponent } from '../../common/confirm-dialog/confirm-dialog.component';

@Component({
  selector: 'app-train-view',
  templateUrl: './train-view.component.html',
  styleUrls: ['./train-view.component.css']
})
export class TrainViewComponent implements OnInit {

  picPath:string = `${baseUrl}/Pictures`
  trains:TrainViewModel[] =[];
  dataSource:MatTableDataSource<TrainViewModel> = new MatTableDataSource(this.trains)
  columns:string[] =['picture','trainName', 'startingPoint','destination', 'isAvailable', 'actions'];
  @ViewChild(MatSort, {static:false}) sort!:MatSort;
  @ViewChild(MatPaginator, {static:false}) paginator!:MatPaginator;
  constructor(
    private trainService:TrainService,
    private notifyService:NotifyService,
    private matDialog:MatDialog
  ) { }
  confirmDelete(data:TrainViewModel){
    //console.log(data);
    this.matDialog.open(ConfirmDialogComponent, {
      width: '450px',
      enterAnimationDuration: '500ms'
    }).afterClosed()
    .subscribe(result=>{
      //console.log(result);
      if(result){
        this.trainService.delete(data)
        .subscribe({
          next: r=>{
            this.notifyService.message('Train data removed', 'DISMISS');
            this.dataSource.data = this.dataSource.data.filter(c => c.trainId != data.trainId);
          },
          error:err=>{
            this.notifyService.message('Failed to delete train data', 'DISMISS');
            throwError(()=>err);
          }
        })
      }
    })

  }
  ngOnInit(): void {
    this.trainService.getVM()
    .subscribe({
      next:r=>{
        this.trains = r;
        this.dataSource.data = this.trains;
        this.dataSource.sort = this.sort;
        this.dataSource.paginator = this.paginator;
      }
    })
  }

}

