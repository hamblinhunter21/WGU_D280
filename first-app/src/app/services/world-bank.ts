import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class WorldBankService {

  private apiUrl = 'https://api.worldbank.org/v2/country';

  constructor(private http: HttpClient) {}

  getCountryData(code: string): Observable<any> {
    return this.http.get(
      `${this.apiUrl}/${code}?format=json`
    );
  }
}
