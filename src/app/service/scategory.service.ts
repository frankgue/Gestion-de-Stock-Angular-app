import { Injectable } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { Scategory } from '../models/scategory';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ScategoryService {
 baseUrl = '/api/scategories';
  choixMenu: string = 'A'
  dataForm!: FormGroup
  listData!: Scategory[];

  constructor(private http: HttpClient) { }

  getData(id: number): Observable<Object> {
    return this.http.get(`${this.baseUrl}/${id}`);
  }

  createData(info: Object):  Observable<Object> {
    return this.http.post(`${this.baseUrl}`, info);
  }

  updateData(id: number, value: any): Observable<Object> {
    return this.http.put(`${this.baseUrl}/${id}`, value);
  }

  deleteData(id: number): Observable<any> {
    return this.http.delete(`${this.baseUrl}/${id}`);
  }

  getAll():  Observable<Scategory[]> {
    return this.http.get<Scategory[]>(`${this.baseUrl}`);
  }

}
