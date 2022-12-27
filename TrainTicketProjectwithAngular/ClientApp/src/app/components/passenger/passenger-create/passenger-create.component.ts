import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { throwError } from 'rxjs';
import { Passenger } from 'src/app/models/data/passenger';
import { NotifyService } from 'src/app/services/common/notify.service';
import { PassengerService } from 'src/app/services/data/passenger.service';

@Component({
  selector: 'app-passenger-create',
  templateUrl: './passenger-create.component.html',
  styleUrls: ['./passenger-create.component.css']
})
export class PassengerCreateComponent implements OnInit {

  passenger:Passenger = {passengerName:'', phone:'', email:''};
  passengerForm:FormGroup = new FormGroup({
    passengerName: new FormControl('', [Validators.required, Validators.maxLength(40)]),
    phone:new FormControl('', Validators.required),
    email:new FormControl('', [Validators.required, Validators.email, Validators.maxLength(50)])
  });
  constructor(
    private passengerService:PassengerService,
    private notifyService:NotifyService
  ) { }
    save():void{
      if(this.passengerForm.invalid) return;
      Object.assign(this.passenger, this.passengerForm.value);
      //console.log(this.passenger);
      this.passengerService.insert(this.passenger)
      .subscribe({
        next: r=>{
          this.notifyService.message('Data saved', 'DISMISS');
          this.passenger = {passengerName:'', phone:'', email:''};
          this.passengerForm.patchValue(this.passenger);
          this.passengerForm.markAsUntouched();
          this.passengerForm.markAsPristine();
          
        },
        error:err=> {
          this.notifyService.message('Failed to save data', 'DISMISS');
          throwError(()=>err);
        }
      })
    }
  ngOnInit(): void {
  }

}
