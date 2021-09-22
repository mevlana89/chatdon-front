import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http'
import { environment } from 'src/environments/environment';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ChatService {

  private baseUrl = environment.wsRootUrl;

  optionRequete = {
    headers: new HttpHeaders({
      'Access-Control-Allow-Origin':'*'
    })
  };

  constructor(private http: HttpClient) { }

  getChatById(id: number): Observable<any>{
    return this.http.get<any>(`${this.baseUrl}` + "/getChatByID/" + `${id}`, this.optionRequete);
  }

}

