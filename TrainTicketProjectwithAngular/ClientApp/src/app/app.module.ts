import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NavBarComponent } from './components/common/nav-bar/nav-bar.component';
import { LayoutModule } from '@angular/cdk/layout';
import { HomeComponent } from './components/home/home.component';
import { MatImportModule } from './modules/mat-import/mat-import.module';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { PassengerService } from './services/data/passenger.service';
import { PassengerViewComponent } from './components/passenger/passenger-view/passenger-view.component';
import { NotifyService } from './services/common/notify.service';
import { PassengerCreateComponent } from './components/passenger/passenger-create/passenger-create.component';
import { ReactiveFormsModule } from '@angular/forms';
import { PassengerEditComponent } from './components/passenger/passenger-edit/passenger-edit.component';
import { ConfirmDialogComponent } from './components/common/confirm-dialog/confirm-dialog.component';
import { TrainService } from './services/data/train.service';
import { TrainViewComponent } from './components/train/train-view/train-view.component';
import { TrainCreateComponent } from './components/train/train-create/train-create.component';
import { MaterialFileInputModule } from 'ngx-material-file-input';
import { DatePipe } from '@angular/common';
import { TicketService } from './services/data/ticket.service';
import { TicketViewComponent } from './components/ticket/ticket-view/ticket-view.component';
import { TicketCreateComponent } from './components/ticket/ticket-create/ticket-create.component';
import { TrainEditComponent } from './components/train/train-edit/train-edit.component';
import { TicketDetailsComponent } from './components/ticket/ticket-details/ticket-details.component';
import { TicketEditComponent } from './components/ticket/ticket-edit/ticket-edit.component';


@NgModule({
  declarations: [
    AppComponent,
    NavBarComponent,
    HomeComponent,
    PassengerViewComponent,
    PassengerCreateComponent,
    PassengerEditComponent,
    ConfirmDialogComponent,
    TrainViewComponent,
    TrainCreateComponent,
    TicketViewComponent,
    TicketCreateComponent,
    TrainEditComponent,
    TicketDetailsComponent,
    TicketEditComponent
    
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    HttpClientModule,
    MatImportModule,
    LayoutModule,
    ReactiveFormsModule,
    MaterialFileInputModule,
    DatePipe
           
  ],
  entryComponents:[ConfirmDialogComponent],
  providers: [HttpClient, PassengerService, TrainService, TicketService, NotifyService],
  bootstrap: [AppComponent]
})
export class AppModule { }
