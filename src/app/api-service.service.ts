import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class ApiServiceService {

  url = "https://rickandmortyapi.com/api/character";

  constructor(private http: HttpClient) {

  }

  getAllData(pageId) {
      return this.http.get(`${this.url}/?page=${pageId}`);
  }

  public getById(id: number) {
    return this.http.get(`${this.url}/${id}`);
  }

}
