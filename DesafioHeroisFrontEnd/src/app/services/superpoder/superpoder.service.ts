import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Superpoder } from '../../models/superpoder';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SuperpoderService {


  private readonly hostApi = 'http://localhost:5134/api';

  constructor(private http: HttpClient) { }


    getAll(): Observable<Superpoder[]> {
      return this.http.get<Superpoder[]>(`${this.hostApi}/Superpoderes`);
    }
}
