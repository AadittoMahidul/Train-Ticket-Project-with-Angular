import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './components/home/home.component';
import { PassengerCreateComponent } from './components/passenger/passenger-create/passenger-create.component';
import { PassengerEditComponent } from './components/passenger/passenger-edit/passenger-edit.component';
import { PassengerViewComponent } from './components/passenger/passenger-view/passenger-view.component';
import { TicketCreateComponent } from './components/ticket/ticket-create/ticket-create.component';
import { TicketDetailsComponent } from './components/ticket/ticket-details/ticket-details.component';
import { TicketEditComponent } from './components/ticket/ticket-edit/ticket-edit.component';
import { TicketViewComponent } from './components/ticket/ticket-view/ticket-view.component';
import { TrainCreateComponent } from './components/train/train-create/train-create.component';
import { TrainEditComponent } from './components/train/train-edit/train-edit.component';
import { TrainViewComponent } from './components/train/train-view/train-view.component';

const routes: Routes = [
  {path:'', component:HomeComponent},
  {path:'home', component:HomeComponent},
  {path:'passengers', component:PassengerViewComponent},
  {path:'passenger-create', component:PassengerCreateComponent},
  {path:'passenger-edit/:id', component:PassengerEditComponent},
  {path:'trains', component:TrainViewComponent},
  {path:'train-create', component:TrainCreateComponent},
  {path:'train-edit/:id', component:TrainEditComponent},
  {path:'tickets', component:TicketViewComponent},
  {path:'ticket-create', component:TicketCreateComponent},
  {path:'ticket-details/:id', component:TicketDetailsComponent},
  {path:'ticket-edit/:id', component:TicketEditComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
