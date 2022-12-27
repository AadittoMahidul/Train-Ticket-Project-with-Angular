import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Passenger } from 'src/app/models/data/passenger';
import { apiUrl } from 'src/app/models/shared/app-constants';
import { PassengerViewModel } from 'src/app/models/view-models/passenger-view-model';

@Injectable({
  providedIn: 'root'
})
export class PassengerService {

  constructor(
    private http:HttpClient
  ) { }
   get():Observable<Passenger[]>{
    return this.http.get<Passenger[]>(`${apiUrl}/Passengers`);
  } 
  getVM():Observable<PassengerViewModel[]>{
    return this.http.get<PassengerViewModel[]>(`${apiUrl}/Passengers/VM`);
  } 
  getById(id:number):Observable<Passenger>{
    return this.http.get<Passenger>(`${apiUrl}/Passengers/${id}`);
  } 
  insert(data:Passenger):Observable<Passenger>{
    return this.http.post<Passenger>(`${apiUrl}/Passengers`, data);
  } 
  update(data:Passenger):Observable<any>{
    return this.http.put<any>(`${apiUrl}/Passengers/${data.passengerId}`, data);
  } 
  delete(data:Passenger):Observable<any>{
    return this.http.delete<any>(`${apiUrl}/Passengers/${data.passengerId}`);
  }
}
