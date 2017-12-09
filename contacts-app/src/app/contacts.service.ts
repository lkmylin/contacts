import { Injectable } from '@angular/core';
import { Http } from '@angular/http';

@Injectable()
export class ContactsService {
  data:string[];
  constructor(private http: Http) { }

  ngOnInit(): void {
    this.http.get('http://localhost:64010/contacts').subscribe(data => {
      this.data = data['results'];
    });
  }
}
