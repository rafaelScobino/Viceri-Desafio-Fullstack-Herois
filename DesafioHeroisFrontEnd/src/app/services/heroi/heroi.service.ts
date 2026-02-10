import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable, map } from 'rxjs';
import { Heroi } from '../../models/heroi';
import { Superpoder } from '../../models/superpoder';


@Injectable({
  providedIn: 'root'
})
export class HeroiService {

  private readonly hostApi = 'http://localhost:5134/api';

  constructor(private http: HttpClient) { }


  getAll(): Observable<Heroi[]> {
    return this.http.get<any[]>(`${this.hostApi}/Herois`).pipe(
      map(data => Heroi.mapList(data))
    );
  }





getAllFiltered(name?: string, poderId?: number): Observable<Heroi[]> {
  let params = new HttpParams();

  if (name) {
    params = params.set('nome', name);
  }

  if (poderId && poderId >= 0) {
    params = params.set('poderId', poderId.toString());
  }

  return this.http.get<Heroi[]>(`${this.hostApi}/Herois`, { params }).pipe(
    map(data => Heroi.mapList(data))
  );
}

 getById(id: number | string): Observable<Heroi> {
    return this.http.get<any>(`${this.hostApi}/Herois/${id}`).pipe(
      map(data => Heroi.map(data))
    );
  }

  create(heroData: any): Observable<Heroi> {
    return this.http.post<any>(`${this.hostApi}/Herois`, heroData);
  }


  update(id: number, heroData: any): Observable<void> {
    return this.http.put<void>(`${this.hostApi}/Herois/${id}`, heroData);
  }


  delete(id: number): Observable<void> {
    return this.http.delete<void>(`${this.hostApi}/Herois/${id}`);
  }
}
