import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http'
import { environment } from 'src/environments/environment';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ChatService {

  private baseUrl = environment.wsRootUrl;

  constructor(private http: HttpClient) { }

  getChatById(id: number): Observable<any>{
    return this.http.get<any>(`${this.baseUrl}` + "/getChatByID" + `${id}`);
  }

}
