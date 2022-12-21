import { Component, OnInit } from '@angular/core';
import { GenericDropDownOptions } from 'src/app/_models/generic-drop-down-options';
import { PersonDto } from 'src/app/_models/person-dto';
import { DevTestService } from 'src/app/_services/dev-test.service';

@Component({
  selector: 'app-dev-test',
  templateUrl: './dev-test.component.html',
  styleUrls: ['./dev-test.component.scss']
})
export class DevTestComponent implements OnInit {
  organizationList: Array<GenericDropDownOptions> = [];
  selectedOrganization: any;
  listOfPersons: Array<PersonDto> = [];
  displayedPersons: PersonDto | undefined;
  
  
  constructor(private devTestService: DevTestService) {  }

  ngOnInit(): void {
    this.devTestService.people$.subscribe(resp => {
      if(resp){
        this.listOfPersons = resp;
        for(let item of resp){
          this.organizationList.push({name: item.organizationId.toString(), code: item.organizationId})
        }
        
      }
    })
  }

  updateView(): void {
    if(this.selectedOrganization){
        this.displayedPersons = this.listOfPersons.find(x => x.organizationId === this.selectedOrganization.code);
    } else {
      this.displayedPersons = undefined;
    }
  }

}
