import { Component, OnInit } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { AngularFirestore } from '@angular/fire/firestore';
import { AngularFireDatabase, snapshotChanges } from 'angularfire2/database'

@Component({
  selector: 'app-aboutme',
  templateUrl: './aboutme.component.html',
  styleUrls: ['./aboutme.component.css']
})
export class AboutmeComponent implements OnInit {

  username : string;
  firstname : string;
  lastname : string;
  bio : string;
  email : string;
  skills : any;
  user : any;

  constructor(private db: AngularFireDatabase , private afAuth: AngularFireAuth) { 
      this.db.database.ref(`Users/${this.afAuth.auth.currentUser.uid}`).on('value' , data =>{
        this.user  = data.val()
        this.bio = this.user["bio"]
        this.firstname = this.user["firstname"]
        this.lastname = this.user["lastname"]
        this.email = this.user["email"]
        this.skills = this.user["skills"]
        this.username = this.firstname+"."+this.lastname
      })
  }

  ngOnInit() {
  }
}
