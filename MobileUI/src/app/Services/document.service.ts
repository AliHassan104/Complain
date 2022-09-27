import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class DocumentService {
  constructor(private http: HttpClient) {}

  url = "http://localhost:8081"

  getAllDocuments() {
    return this.http.get(`${this.url}/api/document`)
  }
}
