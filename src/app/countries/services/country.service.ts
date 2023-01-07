import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {CountrySmall} from "../models/country-small.model";
import {Observable, of} from "rxjs";

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
        const url:string = `/region/${region}?fields=name,cca3`;
        return this.http.get<Array<CountrySmall>>(`${ this.baseUrl }${ url }`)
    }

    getCountryByAlpha( code:string):Observable<any> {
        return of('');
    }
}
