import { Component } from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {CountryService} from "../../services/country.service";
import {CountrySmall} from "../../models/country-small.model";
import {count, of, switchMap, tap} from "rxjs";
import {Country} from "../../models/country.model";


@Component({
  selector: 'app-selector-page',
  templateUrl: './selector-page.component.html',
  styleUrls: ['./selector-page.component.scss']
})
export class SelectorPageComponent {
    myForm: FormGroup = this.fb.group({
        region  : ['',[Validators.required]],
        country : ['',[Validators.required]],
        frontier: ['',[Validators.required]]
    });

    //llenar selectores
    public regions: Array<string> =[];
    public countries : Array<CountrySmall> =[];
    // public frontiers: Array<CountrySmall> = [];
    public frontiers: Array<CountrySmall> = [];
    loading: boolean = false;
    constructor(
        private fb: FormBuilder,
        private countryService: CountryService,
    ) { }
    ngOnInit(){
        this.regions = this.countryService.regions;

        // Cuando cambia la region
        this.myForm.get('region')?.valueChanges
            .pipe(
                tap( region => {
                    this.loading = true;
                    this.countries =[];
                    return this.myForm.get('country')?.patchValue('')
                }),
                switchMap( (region) => {
                    return this.countryService.getCountryByRegion(region)
                })
            )
            .subscribe(val => {
                this.countries = val
                this.loading = false;
            })
        // Cuando cambia el país
        this.myForm.get('country')?.valueChanges
            .pipe(
                tap(()=>{
                    this.loading = true;
                    this.frontiers =[];
                    this.myForm.get('frontier')?.patchValue('');
                }),
                switchMap( (code) => {
                    console.log(code)
                    return this.countryService.getCountryByAlpha(code)
                }),
                switchMap((value) => {
                    if(!value) return of([]);
                    console.log(value)
                    return this.countryService.getCountryByBorders(value!);
                }),
            )
            .subscribe((country) => {
                if(!country) return;
                console.log(country)
                this.frontiers = country;
                this.loading = false;
            })
    }
    public onSubmit(){
        if(!this.myForm.valid) return;
        console.log(this.myForm.value)
    }
}
