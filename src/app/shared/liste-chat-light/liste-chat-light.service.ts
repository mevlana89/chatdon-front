import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http'
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
   
   getAllUnreservedCats(filterDTO : FilterDto): Observable<any>
   {
    let parametres = new HttpParams();
    
    if (filterDTO.categorieAge != undefined)
    {
      parametres = parametres.append('categorieAge', filterDTO.categorieAge);
    }
    if (filterDTO.race != undefined)
    {
      parametres = parametres.append('race', filterDTO.race);
    }
    if (filterDTO.sexe != undefined)
    {
      parametres = parametres.append('sexe', filterDTO.sexe);
    }
    if (filterDTO.taille != undefined)
    {
      parametres = parametres.append('taille', filterDTO.taille);
    }
    if (filterDTO.pelage != undefined)
    {
      parametres = parametres.append('pelage', filterDTO.pelage);
    }
    if (filterDTO.caractere != undefined)
    {
      parametres = parametres.append('caractere', filterDTO.caractere);
    }
    if (filterDTO.zoneGeo != undefined)
    {
      parametres = parametres.append('zoneGeo', filterDTO.zoneGeo);
    }

    if (filterDTO.sociableChat != undefined)
    {
      parametres = parametres.append('sociableChat', filterDTO.sociableChat);
    }

    if (filterDTO.sociableChien != undefined)
    {
      parametres = parametres.append('sociableChien', filterDTO.sociableChien);
    }

    if (filterDTO.sociableEnfant != undefined)
    {
      parametres = parametres.append('sociableEnfant', filterDTO.sociableEnfant);
    }

    // if (filterDTO.sociableChat == true)


    // let parametres2 = new HttpParams({
    //   fromObject: filterDTO
    // });

//      let httpParams = new HttpParams();
//  Object.keys(filterDTO).forEach(function (key) {
//       httpParams = httpParams.append(key, filterDTO[key]);
//  });


//parametres = parametres.append('filterDTO', filterDTO.zoneGeo );

    return this.http.get<any>(`${this.baseUrl}` + "/chats", { params: parametres } );
  }

  getSuggestCatsByCandidatId(idCandidat: number,filterDTO : FilterDto): Observable<any>
  {
    let parametres = new HttpParams();

    return this.http.get<any>(`${this.baseUrl}` + "/candidats/"+ idCandidat +"/suggestions", { params: parametres } );
  }
}
