import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DevTestComponent } from './dev-test/dev-test/dev-test.component';
import { ClaimsComponent } from './_components/claims/claims.component';
import { LoginComponent } from './_components/login/login.component';
import { PersonDetailsComponent } from './_components/person-details/person-details.component';
import { AuthGuardService } from './_services/auth-guard.service';


const routes: Routes = [
  {path: 'DevTest', component: DevTestComponent, canActivate: [AuthGuardService] },
  {path: 'Claims', component: ClaimsComponent, canActivate: [AuthGuardService] },
  {path: 'PersonDetails', component: PersonDetailsComponent, canActivate: [AuthGuardService] },
  {path: 'Login', component: LoginComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
