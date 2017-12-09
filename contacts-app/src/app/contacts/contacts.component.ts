import { Component, OnInit } from '@angular/core';
import { ContactsService } from '../contacts.service'

@Component({
  selector: 'app-contacts',
  templateUrl: './contacts.component.html',
  styleUrls: ['./contacts.component.css']
})
export class ContactsComponent implements OnInit {
  Contacts:string[];
  constructor(private _contactsService: ContactsService) { }

  ngOnInit() {
    // Need to call service promise here
    this.Contacts = ['test', 'test2'];
  }

}
