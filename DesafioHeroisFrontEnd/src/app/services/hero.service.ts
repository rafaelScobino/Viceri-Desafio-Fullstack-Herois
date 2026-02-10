import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable, map } from 'rxjs';
import { Hero } from '../models/hero';
import { Power } from '../models/power';


@Injectable({
  providedIn: 'root'
})
export class HeroService {

  private readonly hostApi = 'https://localhost:7000/api';

  constructor(private http: HttpClient) { }


  listAll(): Observable<Hero[]> {
    return this.http.get<any[]>(`${this.hostApi}/Hero`).pipe(
      map(data => Hero.mapList(data))
    );
  }


  getById(id: number | string): Observable<Hero> {
    return this.http.get<any>(`${this.hostApi}/Hero/${id}`).pipe(
      map(data => Hero.map(data))
    );
  }


  listPowers(): Observable<Power[]> {
    return this.http.get<Power[]>(`${this.hostApi}/Superpower`);
  }

listFiltered(name?: string, powerId?: number): Observable<Hero[]> {
  let params = new HttpParams();

  if (name) {
    params = params.set('name', name);
  }

  if (powerId && powerId > 0) {
    params = params.set('powerId', powerId.toString());
  }

  return this.http.get<Hero[]>(`${this.hostApi}/Hero`, { params }).pipe(
    map(data => Hero.mapList(data))
  );
}

  create(heroData: any): Observable<Hero> {
    return this.http.post<any>(`${this.hostApi}/Hero`, heroData);
  }


  update(id: number, heroData: any): Observable<void> {
    return this.http.put<void>(`${this.hostApi}/Hero/${id}`, heroData);
  }


  delete(id: number): Observable<void> {
    return this.http.delete<void>(`${this.hostApi}/Hero/${id}`);
  }
}
