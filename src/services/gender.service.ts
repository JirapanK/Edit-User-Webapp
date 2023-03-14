import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Gender } from 'src/app/models/api-models/gender.model';

@Injectable({
  providedIn: 'root'
})
export class GenderService {

  
  private baseApiUrl = 'https://dev.tks.co.th/studentapi';

  constructor(private httpClient: HttpClient) { }

  getGenders():Observable<Gender[]>{
    return this.httpClient.get<Gender[]>(this.baseApiUrl+'/genders');
  }
}
