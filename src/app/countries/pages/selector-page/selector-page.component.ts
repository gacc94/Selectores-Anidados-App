import { Component } from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {CountryService} from "../../services/country.service";
import {CountrySmall} from "../../models/country-small.model";
import {switchMap, tap} from "rxjs";

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
    constructor(
        private fb: FormBuilder,
        private countryService: CountryService,
    ) { }
    ngOnInit(){
        this.regions = this.countryService.regions;

        // Cuando cambia la region
        this.myForm.get('region')?.valueChanges
            .pipe(
                tap( region => this.myForm.get('country')?.patchValue('')),
                switchMap( (region) => {
                    return this.countryService.getCountryByRegion(region)
                })
            )
            .subscribe(val => {
                this.countries = val
            })
    }
    public onSubmit(){
        console.log(this.myForm.value)
    }
}
