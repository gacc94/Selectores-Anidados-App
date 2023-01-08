import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {CountrySmall} from "../models/country-small.model";
import {combineLatest, combineLatestAll, Observable, of} from "rxjs";
import {Country} from "../models/country.model";

@Injectable({
  providedIn: 'root'
})
export class CountryService {
    private baseUrl: string = `https://restcountries.com/v3.1`;
    private _regions: Array<string> = ['Africa', 'Americas', 'Asia', 'Europe', 'Oceania'];

    get regions(): Array<string> {
        return [...this._regions];
    }
    constructor(
        private http: HttpClient,
    ) { }

    getCountryByRegion(region: string): Observable<Array<CountrySmall>> {
        const url:string = `${ this.baseUrl }/region/${ region }?fields=name,cca3`;
        return this.http.get<Array<CountrySmall>>(`${ url }`)
    }

    getCountryByAlpha( code:string): Observable<Array<Country> | null> {
        if(!code){
            return of(null)
        }
        const url:string = `${ this.baseUrl }/alpha/${ code }`;
        return this.http.get<Country[]>(`${ url }`)
    }

    getCountryByAlphaSmall( code: string ): Observable<CountrySmall> {
        const url = `${ this.baseUrl }/alpha/${ code }?fields=name,cca3`;
        return this.http.get<CountrySmall>(`${ url }`)
    }

    getCountryByBorders(borders: Array<Country>): Observable<Array<CountrySmall>>{
        if (!borders[0]?.borders) return of([]);

        const requests:Observable<CountrySmall>[]=[];

        borders[0]?.borders.forEach(code=>{
            const request= this.getCountryByAlphaSmall(code);
            requests.push(request);
        });

        return combineLatest(requests);
    }



}
