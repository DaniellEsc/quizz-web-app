import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class TriviaApiServiceService {

  private URL  = "https://opentdb.com/api.php";

  constructor(private http: HttpClient) { }


  getQuestions():Observable<any>{
    const num = 10;
    return this.http.get(`${this.URL}?amount=${num}`);
  }

  // return this.http.get(`https://opentdb.com/api.php?amount=10&category=${category}&difficulty=${difficulty}`);

}
