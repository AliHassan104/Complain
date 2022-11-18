import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class EventsService {

  constructor(private http: HttpClient ) {}

  // url = "http://localhost:8081"
  url = environment.baseUrl

  // baseUrl

  getAllEvent() {
    return this.http.get(`${this.url}/api/event`)
  }

  getEventById(id: any){
    return this.http.get(`${this.url}/api/event/${id}`)
  }

  getEventByArea(area: any){
    return this.http.get(`${this.url}/api/eventByArea/${area}`)
  }

  getAnnouncementByAreaId(area : any) {
    return this.http.get(`${this.url}/api/announcementByArea/${1}`)
  }

}
