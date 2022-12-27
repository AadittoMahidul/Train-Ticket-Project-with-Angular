import { Component, OnInit } from '@angular/core';
import { FormArray, FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { throwError } from 'rxjs';
import { Passenger } from 'src/app/models/data/passenger';
import { Ticket } from 'src/app/models/data/ticket';
import { TicketItem } from 'src/app/models/data/ticket-item';
import { Train } from 'src/app/models/data/train';
import { Category } from 'src/app/models/shared/app-constants';
import { NotifyService } from 'src/app/services/common/notify.service';
import { PassengerService } from 'src/app/services/data/passenger.service';
import { TicketService } from 'src/app/services/data/ticket.service';
import { TrainService } from 'src/app/services/data/train.service';

@Component({
  selector: 'app-ticket-edit',
  templateUrl: './ticket-edit.component.html',
  styleUrls: ['./ticket-edit.component.css']
})
export class TicketEditComponent implements OnInit {

  ticket:Ticket = {passengerId:undefined, journeyDate:undefined, price:undefined, category:undefined}
  passenger:Passenger[] = [];
  train:Train[] =[];
  //
  categoryOptions:{label:string, value:number}[] =[];
  //
  ticketForm:FormGroup= new FormGroup({
    passengerId: new FormControl(undefined, Validators.required),
    journeyDate: new FormControl(undefined, Validators.required),
    price: new FormControl(undefined, Validators.required),
    category: new FormControl(undefined, Validators.required),
    ticketItems: new FormArray([])
  })
  constructor(
    private ticketService: TicketService,
    private trainService:TrainService,
    private passengerService:PassengerService,
    private notifyService:NotifyService,
    private activatedRout:ActivatedRoute
  ) { }
  get ticketItemsFormArray(){
    return this.ticketForm.controls["ticketItems"] as FormArray;
  }
  addItem(oi?:TicketItem){
    if(oi){
      this.ticketItemsFormArray.push(new FormGroup({
        trainId: new FormControl(oi.trainId, Validators.required),
        quantity:new FormControl(oi.quantity, Validators.required)
      }))
    }
    else
    {
      this.ticketItemsFormArray.push(new FormGroup({
        trainId: new FormControl(undefined, Validators.required),
        quantity:new FormControl(undefined, Validators.required)
      }));
    }
    
  }
  removeItem(index:number){
    if(this.ticketItemsFormArray.controls.length> 1)
      this.ticketItemsFormArray.removeAt(index);
  }
  save(){
    if(this.ticketForm.invalid) return;
    //console.log(this.ticketForm.value);
    Object.assign(this.ticket, this.ticketForm.value);
    //console.log(this.ticket);
    this.ticketService.update(this.ticket)
    .subscribe({
      next:r=>{
        this.notifyService.message("Data saved", 'DISMISS');
      },
      error:err=>{
        this.notifyService.message("Failed to load ticket", 'DISMISS');
        throwError(()=>err);
      }
    })
  }
  ngOnInit(): void {
    let id:number = this.activatedRout.snapshot.params['id'];
    this.ticketService.getWithItems(id)
    .subscribe({
      next:r=>{
        this.ticket = r;
        //console.log(this.ticket);
        this.ticketForm.patchValue(this.ticket);
        this.ticket.ticketItems?.forEach(oi=>{
          this.addItem(oi);
        });
        console.log(this.ticketForm.value)
      },
      error:err=>{
        this.notifyService.message("Falied to load ticket", "DISMISS");
        throwError(()=>err);
      }
    });
    this.passengerService.get()
    .subscribe({
      next: r=>{
        this.passenger = r;
      },
      error: err=>{
        this.notifyService.message("Failed to load passenger", 'DISMISS');
      }
    });
    this.trainService.get()
    .subscribe({
      next: r=>{
        this.train = r;
      },
      error: err=>{
        this.notifyService.message("Failed to load train", 'DISMISS');
      }
    });
    Object.keys(Category).filter(
      (type) => isNaN(<any>type) && type !== 'values'
    ).forEach((v: any, i) => {
      this.categoryOptions.push({label: v, value:<any> Category[v]});
    });
  }
}
