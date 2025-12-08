import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { Observable } from 'rxjs';
import { Category } from '../models/category';

@Injectable({
  providedIn: 'root'
})
export class CategoryService {

  baseUrl = '/api/categories';
  choixMenu: string = 'A'
  dataForm!: FormGroup
  listData!: Category[];

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

  getAll():  Observable<Category[]> {
    return this.http.get<Category[]>(`${this.baseUrl}`);
  }

}
