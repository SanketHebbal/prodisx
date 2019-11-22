import { Component, OnInit } from '@angular/core';
import { AuthService } from '../auth.service';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  authError: any;
  showSuccessMessage: boolean;

  constructor(private auth: AuthService) { }

  ngOnInit() {
    this.auth.eventAuthError$.subscribe( data => {
      this.authError = data;
      if(this.authError)
        this.showSuccessMessage = true;
      setTimeout(() => this.showSuccessMessage = false, 3000);
    });
  }

  login(frm) {
    this.auth.login(frm.value.email, frm.value.password);
  }

}
