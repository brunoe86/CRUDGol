import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Airplane } from './airplane';

@Injectable({
  providedIn: 'root'
})
export class AirplaneService {
  url = 'http://localhost:63973/Api/Airplane/';
  
  constructor(private http: HttpClient) { }
  
  GetAirplane(): Observable<Airplane[]> 
  {
    return this.http.get<Airplane[]>(this.url + '/AllAirplanes');
  }
  
  GetAirplaneByID(airplaneID: bigint): Observable<Airplane>
  {
    return this.http.get<Airplane>(this.url + '/GetAirplanesByID/' + airplaneID);
  }

  createAirplane(airplane: Airplane): Observable<Airplane>
  {
    const httpOptions = { headers: new HttpHeaders({ 'Content-Type': 'application/json'}) };
    return this.http.post<Airplane>(this.url + '/InsertAirplanes/', airplane, httpOptions);
  }

  updateAirplane(airplane: Airplane): Observable<Airplane>
  {
    const httpOptions = { headers: new HttpHeaders({ 'Content-Type': 'application/json'}) };
    return this.http.put<Airplane>(this.url + '/UpdateAirplanes/', airplane, httpOptions); 
  }

  deleteAirplaneById(airplaneid: bigint): Observable<number> 
  {  
    const httpOptions = { headers: new HttpHeaders({ 'Content-Type': 'application/json'}) };  
    return this.http.delete<number>(this.url + '/DeleteAirplane?id=' + airplaneid, httpOptions);  
  }
}
