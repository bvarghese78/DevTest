import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Subscription } from 'rxjs';
import { PersonDetailsDto } from 'src/app/_models/person-details-dto';
import { DevTestService } from 'src/app/_services/dev-test.service';

@Component({
  selector: 'app-person-details',
  templateUrl: './person-details.component.html',
  styleUrls: ['./person-details.component.scss']
})
export class PersonDetailsComponent implements OnInit, OnDestroy {
  detailsForm: FormGroup;
  subscription: Subscription;
  personDetails: Array<PersonDetailsDto> = [];
  showDetailsTable: boolean = false;
  
  constructor(private fb: FormBuilder, private devTestService: DevTestService) {
    this.subscription = new Subscription();
    this.detailsForm = fb.group({
      orgId: new FormControl('', [Validators.required]),
      extPerson: new FormControl(''),
      email: new FormControl(''),
      firstName: new FormControl(''),
      lastName: new FormControl(''),
      phone: new FormControl('')
    });
   }

  ngOnInit(): void {
  }

  ngOnDestroy(): void {
    this.subscription?.unsubscribe();
  }

  onSubmit() : void {
    if(this.detailsForm.invalid){
      // show error message
    }

    let organizationId = this.detailsForm.get('orgId')?.value;
    let extPersonId = this.detailsForm.get('extPerson')?.value;
    let fName = this.detailsForm.get('firstName')?.value;
    let lName = this.detailsForm.get('lastName')?.value;
    let email = this.detailsForm.get('email')?.value;
    let phone = this.detailsForm.get('phone')?.value;
    this.devTestService.getPersonDetails(organizationId, extPersonId, email, fName, lName, phone).subscribe(resp => {
      if(resp){
        this.personDetails = resp;
        this.showDetailsTable = true;
      }
    })
  }
}
