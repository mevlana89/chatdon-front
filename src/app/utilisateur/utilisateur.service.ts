import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { Donateur } from './donateur';
import { Observable } from 'rxjs';
import { Candidat } from './candidat';

@Injectable({
  providedIn: 'root'
})
export class UtilisateurService {

  private BackUrl: string =environment.wsRootUrl;

  requeteOption:HttpHeaders = new HttpHeaders().set('Access-Control-Allow-Origin','*');

  constructor(private http: HttpClient) {}

  createDonateur(donateur: Donateur): Observable<Donateur>{
    let endPoint: string="/donateurs";
    return this.http.post<Donateur>(this.BackUrl + endPoint, donateur, { headers: this.requeteOption } );
  }

  getDonateurByMail(mail: string): Observable<Donateur> {
    let endPoint: string="/getDonateurbyMail";
    let requeteParams = new HttpParams().set('mail', mail)
    return this.http.post<Donateur>(this.BackUrl + endPoint, { headers: this.requeteOption, params: requeteParams });
  }

  getCandidatByMail(mail: string): Observable<Candidat> {
    let endPoint: string="/candidats/getCandidatbyMail";
    let requeteParams = new HttpParams().set('mail', mail)
    return this.http.post<Candidat>(this.BackUrl + endPoint, { headers: this.requeteOption, params: requeteParams });
  }

  getProfilUtilisateur(mail: string, pass: string): Observable<string> {
    let endPoint: string="/getProfilutilisateur";
    let requeteParams = new HttpParams().set('mail', mail).set("pass", pass);

    return this.http.get<string>(this.BackUrl + endPoint, {
      headers: this.requeteOption,
      params: requeteParams,
      responseType: 'text' as 'json'
    });
  }

}