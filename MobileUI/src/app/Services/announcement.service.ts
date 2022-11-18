import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { HttpClient } from '@angular/common/http';


@Injectable({
  providedIn: 'root'
})
export class AnnouncementService {

  constructor(private http: HttpClient) { }

    // url = "http://localhost:8081"
    url = environment.baseUrl

    getAllAnnouncement(id : any) {
        return this.http.get(`${this.url}/api/announcementByArea/${id}`)
      }

}
