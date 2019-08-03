import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-form-user',
  templateUrl: './form-user.component.html',
  styleUrls: ['./form-user.component.scss']
})
export class FormUserComponent implements OnInit {
  userName = '';
  displayName = '';

  constructor() { }

  ngOnInit() {
  }

  onSubmit() {
    console.log("user=", this.userName);
    console.log("display=", this.displayName);
  }

  log(z) {
    console.log(z);
    console.log(this.userName);
    console.log(this.displayName)
  }
}
