import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import {HttpModule} from '@angular/http';


import { AppComponent } from './app.component';
import {ContactsComponent } from './contacts/contacts.component'
import { ContactsService } from './contacts.service';


@NgModule({
  declarations: [
    AppComponent,
    ContactsComponent
  ],
  imports: [
    BrowserModule,
    HttpModule
  ],
  providers: [ContactsService,
  HttpModule],
  bootstrap: [AppComponent]
})
export class AppModule { }
