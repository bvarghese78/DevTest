import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { LazyLoadEvent, MessageService } from 'primeng/api';
import { Subscription } from 'rxjs';
import { ClaimsDto } from 'src/app/_models/claims-dto';
import { ClaimsResponseDto } from 'src/app/_models/claims-response';
import { Names } from 'src/app/_models/names-dto';
import { PersonDto } from 'src/app/_models/person-dto';
import { DevTestService } from 'src/app/_services/dev-test.service';

@Component({
  selector: 'app-claims',
  templateUrl: './claims.component.html',
  styleUrls: ['./claims.component.scss']
})
export class ClaimsComponent implements OnInit, OnDestroy {
  claimsForm: FormGroup;
  subscription: Subscription[];
  namesDto: Array<Names> = [];
  showNamesTable: boolean = false;
  showClaimsTable: boolean = false;
  loading: boolean = false;
  claimsResponseDto: ClaimsResponseDto = {
    firstName: '',
    middleName: '',
    lastName: '',
    totalClaimCount: 0,
    personId: 0,
    claims: []
  };

  constructor(private fb: FormBuilder,
     private devTestService: DevTestService,
    private router: Router,
    private messageService: MessageService) {
    this.subscription = [];
    this.claimsForm = fb.group({
      searchBy: new FormControl(0, [Validators.required]),
      person: new FormControl(''),
      extPerson: new FormControl('')
    });
   }

  ngOnInit(): void {
  }

  ngOnDestroy(): void {
    this.subscription?.find(x => x.unsubscribe());
  }

  onSubmit() : void {
    if(this.claimsForm.invalid){
      // show error message
    }

    this.claimsResponseDto = {
      firstName: '',
      middleName: '',
      lastName: '',
      totalClaimCount: 0,
      personId: 0,
      claims: []
    };

    if(this.claimsForm.get('searchBy')?.value == 0){
      this.claimsForm.controls['extPerson'].setValue(null);
    } else {
      this.claimsForm.controls['person'].setValue(null);
    }

    let personId = this.claimsForm.get('person')?.value;
    let extPersonId = this.claimsForm.get('extPerson')?.value;

    if(personId){
      this.subscription.push(this.devTestService.getClaimsByPerson(personId).subscribe(resp => {
        if(resp) {
          this.claimsResponseDto = resp;
          this.showClaimsTable = true;
        }
      }));
    } else {
      this.subscription.push(this.devTestService.getClaimsByExtPerson(extPersonId).subscribe(resp => {
        if(resp) {
          this.namesDto = resp.flatMap(x => x.names);
          this.showNamesTable = true;
        }
      }));
    }
  }

  getClaims(id: number): void {
    
    this.subscription.push(this.devTestService.getClaimsByPerson(id).subscribe(resp => {
      if(resp) {
        this.claimsResponseDto = resp;
        this.showClaimsTable = true;
      }
    }));
  }

  radioButtonClicked() : void {
    if(this.claimsForm.get('searchBy')?.value == 0) {
      this.showNamesTable = false;
    } else if (this.claimsForm.get('searchBy')?.value == 1 && this.namesDto.length >  0){
      this.showNamesTable = true;
    }
  }

  loadClaims(event: LazyLoadEvent){
    this.loading = true;
    let offset = event?.first ?? 50;
    let rows = event?.rows ?? 50;

    if(offset == 0){
      this.loading = false;
      return;
    }

    let personId = this.claimsResponseDto.personId;

    this.subscription.push(this.devTestService.getClaimsByPerson(personId, offset, rows).subscribe(resp => {
      if(resp) {
        this.claimsResponseDto = resp;
        this.showClaimsTable = true;
        this.loading = false;
      }
    }, err => {
      this.loading = false;
    }));
  }
}
