import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { DevTestComponent } from './dev-test/dev-test/dev-test.component';
import { NavBarComponent } from './_components/nav-bar/nav-bar.component';
import { PersonDetailsComponent } from './_components/person-details/person-details.component';
import { LoginComponent } from './_components/login/login.component';
import { ClaimsComponent } from './_components/claims/claims.component';

import { DropdownModule } from 'primeng/dropdown';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { TableModule } from 'primeng/table';
import { CardModule } from 'primeng/card';
import { ToolbarModule } from 'primeng/toolbar';
import { RadioButtonModule } from 'primeng/radiobutton';
import {InputNumberModule} from 'primeng/inputnumber';
import {ButtonModule} from 'primeng/button';
import {OverlayPanelModule} from 'primeng/overlaypanel';
import {InputTextModule} from 'primeng/inputtext';
import {PasswordModule} from 'primeng/password';
import {MenubarModule} from 'primeng/menubar';
import {ToastModule} from 'primeng/toast';
import { MessageService } from 'primeng/api';
import { JwtHelperService, JwtModule, JWT_OPTIONS } from '@auth0/angular-jwt';


export function tokenGetter() {
  return localStorage.getItem("token");
}

@NgModule({
  declarations: [
    AppComponent,
    DevTestComponent,
    ClaimsComponent,
    PersonDetailsComponent,
    LoginComponent,
    NavBarComponent,
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    AppRoutingModule,
    HttpClientModule,
    JwtModule.forRoot({
      config: {
        tokenGetter: tokenGetter,
      }
    }),
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    DropdownModule,
    TableModule,
    CardModule,
    ToolbarModule,
    RadioButtonModule,
    InputNumberModule,
    ButtonModule,
    OverlayPanelModule,
    InputTextModule,
    PasswordModule,
    MenubarModule,
    ToastModule,
  ],
  providers: [
    MessageService,
    JwtHelperService,
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
