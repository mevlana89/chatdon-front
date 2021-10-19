import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Candidature } from './candidature.model';


@Injectable({
  providedIn: 'root'
})
export class CandidatureService {

  private baseUrl = environment.wsRootUrl;
  private BackUrl: string =environment.wsRootUrl;

  optionRequete = {
    headers: new HttpHeaders({
      'Access-Control-Allow-Origin':'*'
    })
  };
  requeteOption: HttpHeaders | { [header: string]: string | string[]; } | undefined;

  constructor(private http: HttpClient) { }

  public createCandidature(candidature: Candidature): Observable<Candidature>{
    let endPoint: string="/candidature";
    return this.http.post<Candidature>(this.BackUrl + endPoint, candidature, { headers: this.requeteOption } );
  }
  public getAllCandidaturesByCandidatId(idCandidat : number):Observable<Candidature[]>{
    return this.http.get<Candidature[]>(this.baseUrl+'/candidats/'+idCandidat+'/candidatures');
  }

  public getAllCandidaturesByCatId(idChat : number):Observable<Candidature[]>
  {
    return this.http.get<Candidature[]>(this.baseUrl+'/chats/'+idChat+'/candidatures/');
  }
}
