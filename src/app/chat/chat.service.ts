import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http'
import { environment } from 'src/environments/environment';
import { Observable } from 'rxjs';
import { Chat } from './Chat';

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
    return this.http.get<Chat>(`${this.baseUrl}` + "/getChatByID/" + `${id}`, this.optionRequete);
  }

  createChat(chat: Chat): Observable<any>{
    console.log("create chat serviceChat")
    return this.http.post(`${this.baseUrl}` + "/createChat", chat, this.optionRequete);
  }

  updateChat(chat: Chat): Observable<any>{
    console.log("update chat serviceChat")
    return this.http.post(`${this.baseUrl}` + "/updateChat", chat, this.optionRequete);
  }




}

