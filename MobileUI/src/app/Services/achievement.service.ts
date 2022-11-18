import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class AchievementService {

  constructor(private http: HttpClient) {}

  // url = "http://localhost:8081"
  url = environment.baseUrl

  getAllAchievement() {
    return this.http.get(`${this.url}/api/achievement`)
  }

  getAchievementById(id: any)  { //: Observable<any>
    return this.http.get(`${this.url}/api/achievement/${id}`)
  }  

}
