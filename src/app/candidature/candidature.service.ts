import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Candidature } from './candidature.model';
import { CreateCandidature } from './candidature';


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

  public createCandidature(candidature: CreateCandidature): Observable<CreateCandidature>{
    let endPoint: string="/createCandidature";
    return this.http.post<CreateCandidature>(this.BackUrl + endPoint, candidature, { headers: this.requeteOption } );
  }
  public getAllCandidaturesByCandidatId(idCandidat : number):Observable<Candidature[]>{
    return this.http.get<Candidature[]>(this.baseUrl+'/candidats/'+idCandidat+'/candidatures');
  }

  public getAllCandidaturesByCatId(idChat : number):Observable<Candidature[]>{
    return this.http.get<Candidature[]>(this.baseUrl+'/chats/'+idChat+'/candidatures/');
  }

  public getAllCandidaturesDtoByCatId(idChat: number):Observable<CreateCandidature[]>{
    return this.http.get<CreateCandidature[]>(this.baseUrl+'/chats/'+idChat+'/candidaturesDto/');
  }

  public deleteCandidatureById(idCandidature:number){
    let endpoint : string= "/candidatures";
    return this.http.delete(this.BackUrl + endpoint + `/${idCandidature}`,{headers: this.requeteOption});
  }


  
}
