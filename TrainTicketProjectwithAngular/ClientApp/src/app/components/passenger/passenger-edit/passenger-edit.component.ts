import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { throwError } from 'rxjs';
import { Passenger } from 'src/app/models/data/passenger';
import { NotifyService } from 'src/app/services/common/notify.service';
import { PassengerService } from 'src/app/services/data/passenger.service';

@Component({
  selector: 'app-passenger-edit',
  templateUrl: './passenger-edit.component.html',
  styleUrls: ['./passenger-edit.component.css']
})
export class PassengerEditComponent implements OnInit {
  passenger:Passenger = null!;
  passengerForm:FormGroup = new FormGroup({
    passengerName: new FormControl('', [Validators.required, Validators.maxLength(40)]),
    phone:new FormControl('', Validators.required),
    email:new FormControl('', [Validators.required, Validators.email, Validators.maxLength(50)])
  });

  constructor(
    private passengerService:PassengerService,
    private notifyService:NotifyService,
    private activatedRoute:ActivatedRoute
  ) { }

  save(){
    if(this.passengerForm.invalid) return;
        Object.assign(this.passenger, this.passengerForm.value);
        //console.log(this.passenger);
        this.passengerService.update(this.passenger)
        .subscribe({
          next:r=>{
            this.notifyService.message('Data saved', 'DISMISS');
          },
          error:err=> {
            this.notifyService.message('Failed to save data', 'DISMISS');
            throwError(()=>err);
          }
        })
      }  
  ngOnInit(): void {
    let id:number=this.activatedRoute.snapshot.params['id'];
    this.passengerService.getById(id)
    .subscribe({
      next: r=> {
        this.passenger=r;
        //console.log(this.passenger);
        this.passengerForm.patchValue(this.passenger);
      },
      error: err=>{
        this.notifyService.message('Failed to load customer data', 'DISMISS');
        throwError(()=>err);
      }
    })
  }

}
