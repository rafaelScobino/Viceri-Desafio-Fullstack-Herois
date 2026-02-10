import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable, map } from 'rxjs';
import { Heroi } from '../models/heroi';
import { Superpoder } from '../models/superpoder';


@Injectable({
  providedIn: 'root'
})
export class HeroService {

  private readonly hostApi = 'https://localhost:7000/api';

  constructor(private http: HttpClient) { }


  listAll(): Observable<Heroi[]> {
    return this.http.get<any[]>(`${this.hostApi}/Hero`).pipe(
      map(data => Heroi.mapList(data))
    );
  }


  getById(id: number | string): Observable<Heroi> {
    return this.http.get<any>(`${this.hostApi}/Hero/${id}`).pipe(
      map(data => Heroi.map(data))
    );
  }


  listPowers(): Observable<Superpoder[]> {
    return this.http.get<Superpoder[]>(`${this.hostApi}/Superpower`);
  }

listFiltered(name?: string, powerId?: number): Observable<Heroi[]> {
  let params = new HttpParams();

  if (name) {
    params = params.set('nome', name);
  }

  if (powerId && powerId > 0) {
    params = params.set('powerId', powerId.toString());
  }

  return this.http.get<Heroi[]>(`${this.hostApi}/Hero`, { params }).pipe(
    map(data => Heroi.mapList(data))
  );
}

  create(heroData: any): Observable<Heroi> {
    return this.http.post<any>(`${this.hostApi}/Hero`, heroData);
  }


  update(id: number, heroData: any): Observable<void> {
    return this.http.put<void>(`${this.hostApi}/Hero/${id}`, heroData);
  }


  delete(id: number): Observable<void> {
    return this.http.delete<void>(`${this.hostApi}/Hero/${id}`);
  }
}
