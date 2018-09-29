import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import {NgbModule} from '@ng-bootstrap/ng-bootstrap';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './components/login/login.component';
import { UsersListComponent } from './components/users-list/users-list.component';
import { UserInfoComponent } from './components/user-info/user-info.component';
import { UserCreateComponent } from './components/user-create/user-create.component';


import { MessagesComponent } from './components/messages/messages.component';


@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    UsersListComponent,
    UserInfoComponent,
    UserCreateComponent,
    MessagesComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    AppRoutingModule,
    FormsModule,
    NgbModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
