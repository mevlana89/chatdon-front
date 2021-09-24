import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http'
import { environment } from 'src/environments/environment';
import { Observable } from 'rxjs';
import { FilterDto } from './FilterDto';


@Injectable({
  providedIn: 'root'
})
export class ListeChatLightService {

  private baseUrl = environment.wsRootUrl;

  optionRequete = {
    headers: new HttpHeaders({
      'Access-Control-Allow-Origin':'*'
    })
  };

  constructor(private http: HttpClient) {
   }
   getAllUnreservedCats(filterDTO : FilterDto): Observable<any>{
    return this.http.get<any>(`${this.baseUrl}` + "/chats/", this.optionRequete);
  }
}
