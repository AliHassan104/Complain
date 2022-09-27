import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class PollingquestionService {

  constructor(private http: HttpClient) {}

  // url = "http://localhost:8081"
  url = environment.baseUrl

  getAllPollingQuestion() {
    return this.http.get(`${this.url}/api/pollingquestion`)
  }

  getPollingQuestionById(id: any) {
    return this.http.get(`${this.url}/api/pollingquestion/${id}`)
  }

  getPollingQuestionByArea(areaId: any) {
    console.log(areaId);

    return this.http.get(`${this.url}/api/pollingquestionByArea/${areaId}`)
  }

  getPollingQuestionNotAnswered(userId: any) {
    return this.http.get(`${this.url}/api/pollingquestion/notansweredbyuser/${userId}`)
  }

  postPollingQuestion(data: any): Observable<any> {
    const headers = { 'content-type': 'application/json' }
    const body = JSON.stringify(data);
    console.log(body);
    return this.http.post(`${this.url}/api/pollinganswer`, body, { 'headers': headers })
  }

}
