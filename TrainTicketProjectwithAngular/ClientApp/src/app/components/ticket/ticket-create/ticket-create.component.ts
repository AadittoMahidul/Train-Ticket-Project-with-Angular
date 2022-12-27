import { Component, OnInit } from '@angular/core';
import { FormArray, FormControl, FormGroup, Validators } from '@angular/forms';
import { throwError } from 'rxjs';
import { Passenger } from 'src/app/models/data/passenger';
import { Ticket } from 'src/app/models/data/ticket';
import { Train } from 'src/app/models/data/train';
import { Category } from 'src/app/models/shared/app-constants';
import { NotifyService } from 'src/app/services/common/notify.service';
import { PassengerService } from 'src/app/services/data/passenger.service';
import { TicketService } from 'src/app/services/data/ticket.service';
import { TrainService } from 'src/app/services/data/train.service';

@Component({
  selector: 'app-ticket-create',
  templateUrl: './ticket-create.component.html',
  styleUrls: ['./ticket-create.component.css']
})
export class TicketCreateComponent implements OnInit {

  ticket:Ticket = {passengerId:undefined, journeyDate:undefined,  category:undefined, price:undefined}
  passengers:Passenger[] = [];
  trains:Train[] =[];
  //
  categoryOptions:{label:string, value:number}[] =[];
  //
  ticketForm:FormGroup= new FormGroup({
    passengerId: new FormControl(undefined, Validators.required),
    journeyDate: new FormControl(undefined, Validators.required),
    category: new FormControl(undefined, Validators.required),
    price: new FormControl(undefined, [Validators.required]),
    ticketItems: new FormArray([])
  })
  constructor(
    private ticketService: TicketService,
    private trainService:TrainService,
    private passengerService:PassengerService,
    private notifyService:NotifyService
  ) { }

  save():void{
    if(this.ticketForm.invalid) return;
    Object.assign(this.ticket, this.ticketForm.value);
    //console.log(this.ticket);
    this.ticketService.insert(this.ticket)
    .subscribe({
      next: r=>{
        this.notifyService.message('Data saved', 'DISMISS');        
      },
      error:err=> {
        this.notifyService.message('Failed to save data', 'DISMISS');
        throwError(()=>err);
      }
    })
  }
  get ticketItemsFormArray(){
    return this.ticketForm.controls["ticketItems"] as FormArray;
  }
  addItem(){
    this.ticketItemsFormArray.push(new FormGroup({
      trainId: new FormControl(undefined, Validators.required),
      quantity:new FormControl(undefined, Validators.required)
    }))
  }
  removeItem(index:number){
    if(this.ticketItemsFormArray.controls.length> 1)
      this.ticketItemsFormArray.removeAt(index);
  }  
  ngOnInit(): void {
    this.passengerService.get()
    .subscribe({
      next: r=>{
        this.passengers = r;
      },
      error: err=>{
        this.notifyService.message("Failed to load passenger", 'DISMISS');
      }
    });
    this.trainService.get()
    .subscribe({
      next: r=>{
        this.trains = r;
      },
      error: err=>{
        this.notifyService.message("Failed to load trains", 'DISMISS');
      }
    });
    Object.keys(Category).filter(
      (type) => isNaN(<any>type) && type !== 'values'
    ).forEach((v: any, i) => {
      this.categoryOptions.push({label: v, value:<any> Category[v]});
    });
    // console.log(this.categoryOptions)
    this.addItem();
  }

}