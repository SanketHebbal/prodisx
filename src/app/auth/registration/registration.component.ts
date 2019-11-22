import { Component, OnInit } from '@angular/core';
import { AuthService } from '../auth.service';
import { Router } from '@angular/router';
import { AngularFireDatabase } from 'angularfire2/database';
import { AngularFireAuth } from 'angularfire2/auth';

@Component({
  selector: 'app-registration',
  templateUrl: './registration.component.html',
  styleUrls: ['./registration.component.css']
})
export class RegistrationComponent implements OnInit {

  authError: any;
  showSuccessMessage: boolean;
  url: string;

  constructor(private auth: AuthService , 
              private router: Router , 
              private afAuth: AngularFireAuth ,
              ) { }

  ngOnInit() {
    this.auth.eventAuthError$.subscribe( data => {
      this.authError = data;
      if(this.authError)
        this.showSuccessMessage = true;
      setTimeout(() => this.showSuccessMessage = false, 3000);
    })
  }

  createUser(frm) {
      this.auth.createUser(frm.value);
      //this.router.navigate(['login']);
  }

  onChange(event)
  {
    let skill = event['srcElement']['value']
    console.log(event)
  }
}
