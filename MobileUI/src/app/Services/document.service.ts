import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class DocumentService {
  constructor(private http: HttpClient) {}

  url = environment.baseUrl

  getAllDocuments() {
    return this.http.get(`${this.url}/api/document`)
  }
}
