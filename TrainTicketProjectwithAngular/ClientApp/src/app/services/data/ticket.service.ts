import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Ticket } from 'src/app/models/data/ticket';
import { apiUrl } from 'src/app/models/shared/app-constants';
import { TicketAndTicketItemViewModel } from 'src/app/models/view-models/ticket-and-ticket-item-view-model';
import { TicketViewModel } from 'src/app/models/view-models/ticket-view-model';

@Injectable({
  providedIn: 'root'
})
export class TicketService {

  constructor(
    private http:HttpClient
  ) { }
  get():Observable<Ticket[]>{
    return this.http.get<Ticket[]>(`${apiUrl}/Tickets`);
  }
  getVM():Observable<TicketViewModel[]>{
    return this.http.get<TicketViewModel[]>(`${apiUrl}/Tickets/VM`);
  }
  getWithItems(id:number):Observable<TicketAndTicketItemViewModel>{
    return this.http.get<TicketAndTicketItemViewModel>(`${apiUrl}/Tickets/${id}/OI`)
  }
  insert(data:Ticket):Observable<Ticket>{
    return this.http.post<Ticket>(`${apiUrl}/Tickets`, data);
  } 
  /* getById(id:number):Observable<Ticket>{
    return this.http.get<Ticket>(`${apiUrl}/Tickets/${id}`);
  } */ 
  update(data:Ticket):Observable<any>{
    return this.http.put<any>(`${apiUrl}/Tickets/${data.ticketId}`, data);
  } 
  delete(data:Ticket):Observable<any>{
    return this.http.delete<any>(`${apiUrl}/Tickets/${data.ticketId}`);
  }
}

