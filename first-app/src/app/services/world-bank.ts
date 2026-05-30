import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import { CountryResponse } from '../models/country';

@Injectable({
  providedIn: 'root'
})
export class WorldBankService {

  private apiUrl = 'https://api.worldbank.org/v2/country';

  constructor(private http: HttpClient) {}

  getCountryData(code: string): Observable<CountryResponse> {
    return this.http.get<[any, CountryResponse[]]>(
      `${this.apiUrl}/${code}?format=json`
    ).pipe(
      map(response => {
        if (response[1] && response[1].length > 0) {
          return response[1][0];
        }
        throw new Error('Country data not found');
      }),
      catchError(error => {
        console.error('Error fetching country data:', error);
        return throwError(() => new Error('Failed to load country data. Please try again.'));
      })
    );
  }
}
