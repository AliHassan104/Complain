import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class WatertimingService {

  constructor(private http: HttpClient) { }

  // url = "http://localhost:8081"
  url = environment.baseUrl

  getAllWaterTiming() {
    return this.http.get(`${this.url}/api/watertiming/allWatertimingByBlock`)
  }
}
