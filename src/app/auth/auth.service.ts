import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { AngularFirestore } from '@angular/fire/firestore';
import { Router } from '@angular/router';
import { ThrowStmt } from '@angular/compiler';
import { BehaviorSubject } from 'rxjs';
import { AngularFireDatabase, snapshotChanges } from 'angularfire2/database'

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  
  private eventAuthError = new BehaviorSubject<string>("");
  eventAuthError$ = this.eventAuthError.asObservable();
  url : any;
  newUser: any;

  constructor(
    private afAuth: AngularFireAuth,
    private db: AngularFirestore,
    private db1: AngularFireDatabase,
    private router: Router) { }

  getUserState() {
    return this.afAuth.authState;
  }

  login( email: string, password: string) {
    this.afAuth.auth.signInWithEmailAndPassword(email, password)
      .catch(error => {
        this.eventAuthError.next(error);
      })
      .then(userCredential => {
        if(userCredential) {
          this.router.navigate(['profile']);
        }
      })
  }

  onSelectFile(event) { // called each time file input changes
    if (event.target.files && event.target.files[0]) {
      var reader = new FileReader();

      reader.readAsDataURL(event.target.files[0]); // read file as data url

      reader.onload = (event) => { // called once readAsDataURL is completed
        this.url = event.target['result']
      }
    }
  }

  createUser(user) {
    // console.log(user);
    this.afAuth.auth.createUserWithEmailAndPassword( user.email, user.password)
      .then( userCredential => {
        this.newUser = user;
        // console.log(userCredential);
        userCredential.user.updateProfile( {
          displayName: user.firstName + ' ' + user.lastName ,
          photoURL : this.url
        });

        this.insertUserData(userCredential)
          .then(() => {
            this.router.navigate(['login']);
          });
      })
      .catch( error => {
        this.eventAuthError.next(error);
      });
  }

  insertUserData(userCredential: firebase.auth.UserCredential) {
    
    return this.db1.database.ref(`Users/${userCredential.user.uid}`).set({
      email: this.newUser.email,
      firstname: this.newUser.firstName,
      lastname: this.newUser.lastName,
      bio: this.newUser.bio,
      skills:this.newUser.skills 
      //profilePic : this.url
    })
  }

  logout() {
    return this.afAuth.auth.signOut();
  }
}
