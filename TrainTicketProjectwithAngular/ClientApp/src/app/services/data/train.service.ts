import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/internal/Observable';
import { Train } from 'src/app/models/data/train';
import { apiUrl } from 'src/app/models/shared/app-constants';
import { ImagePathResponse } from 'src/app/models/shared/image-path-response';
import { TrainInputModel } from 'src/app/models/view-models/input/train-input-model';
import { TrainViewModel } from 'src/app/models/view-models/train-view-model';


@Injectable({
  providedIn: 'root'
})
export class TrainService {

  constructor(
    private http:HttpClient
  ) { }
   get():Observable<Train[]>{
    return this.http.get<Train[]>(`${apiUrl}/Trains`);
  } 
  getVM():Observable<TrainViewModel[]>{
    return this.http.get<TrainViewModel[]>(`${apiUrl}/Trains/VM`);
  } 
  getById(id:number):Observable<Train>{
    return this.http.get<Train>(`${apiUrl}/Trains/${id}`);
  } 
  insert(data:TrainInputModel):Observable<Train>{
    return this.http.post<Train>(`${apiUrl}/Trains/VM`, data);
  }
  update(data:TrainInputModel):Observable<any>{
    return this.http.put<any>(`${apiUrl}/Trains/${data.trainId}/VM`, data);
  }
  uploadImage(id: number, f: File): Observable<ImagePathResponse> {
    const formData = new FormData();

    formData.append('picture', f);
    //console.log(f);
    return this.http.post<ImagePathResponse>(`${apiUrl}/Trains/Upload/${id}`, formData);
  }
  delete(data:TrainViewModel):Observable<any>{
    return this.http.delete<any>(`${apiUrl}/Trains/${data.trainId}`);
  }
  
}