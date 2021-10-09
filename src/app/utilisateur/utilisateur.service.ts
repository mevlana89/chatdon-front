import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { Donateur } from './donateur';
import { Observable } from 'rxjs';
import { Candidat } from './candidat';
import { Chat } from '../chat/Chat';
import { DONATEUR, CANDIDAT } from '../shared/listes';

@Injectable({
  providedIn: 'root'
})
export class UtilisateurService {

  private BackUrl: string =environment.wsRootUrl;

  requeteOption:HttpHeaders = new HttpHeaders().set('Access-Control-Allow-Origin','*');

  constructor(private http: HttpClient) {
   // this.requeteOption = new HttpHeaders().set('Access-Control-Allow-Origin','*');
  }

  createDonateur(donateur: Donateur): Observable<Donateur>{
    let endPoint: string="/donateurs";
    return this.http.post<Donateur>(this.BackUrl + endPoint, donateur, { headers: this.requeteOption } );
  }

  getDonateurByMail(mail: string, pass: string): Observable<Donateur> {
    let endPoint: string="/getDonateurbyMail";
    let requeteParams = new HttpParams().set('mail', mail).set("pass", pass);
    return this.http.get<Donateur>(this.BackUrl + endPoint, {
      headers: this.requeteOption,
      params: requeteParams,
      responseType: 'json'
    });
  }

  getCandidatByMail(mail: string, pass: string): Observable<Candidat> {
    let endPoint: string="/candidats/getCandidatbyMail";
    let requeteParams = new HttpParams().set('mail', mail).set("pass", pass);
    return this.http.get<Candidat>(this.BackUrl + endPoint, {
      headers: this.requeteOption,
      params: requeteParams,
      responseType: 'json'
    });
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


  findAllCatsByDonatorId(idDonateur: number): Observable<any>
  {
    return this.http.get<any>(`${this.BackUrl}` + "/donateurs/"+idDonateur+"/chats");
  }

  getDonateurById(id:number): Observable<Donateur> {
    let endPoint: string="/donateurs";
    return this.http.get<Donateur>(this.BackUrl + endPoint + `/${id}`,{headers: this.requeteOption});
  }

  deleteDonateurById(id:number){
    let endpoint : string= "/donateurs";
    //let requeteParams = new HttpParams().set('id', id);
    return this.http.delete(this.BackUrl + endpoint + `/${id}`,{headers: this.requeteOption});
  }

  reset() {
    localStorage.setItem("role", "");
    localStorage.setItem(CANDIDAT, "");
    localStorage.setItem(DONATEUR, "");
  }

}
