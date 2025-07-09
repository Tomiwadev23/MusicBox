import { inject, Injectable, OnInit, signal } from '@angular/core';
import { Auth, onAuthStateChanged } from '@angular/fire/auth';
import { Router } from '@angular/router';
import { getAuth, updateProfile, createUserWithEmailAndPassword, signInWithEmailAndPassword, sendEmailVerification } from "firebase/auth";
import { AlertService } from '../alert.service';
import { signOut } from "firebase/auth";
import { signInWithPopup, GoogleAuthProvider } from "firebase/auth";
  import {signInWithRedirect } from "firebase/auth";
@Injectable({
  providedIn: 'root'
})
export class AuthsService implements OnInit {
  router = inject(Router)
  alertservice = inject(AlertService)
  auth = inject(Auth)
  statusCheck = signal<any>(null);
  user: any;
  updateUsername = signal<any>('')
  collect=signal<any>(null)
  provider = new GoogleAuthProvider();


  constructor() {


  }
  async ngOnInit() {
    this.checkIn()
  
  




  }
  async signUp(email: any, password: any) {
    const auth = getAuth();
    createUserWithEmailAndPassword(this.auth, email, password)
      .then((userCredential) => {
        // Signed up 
        const user = userCredential.user;
        sendEmailVerification(user)
          .then(() => {

            if (user.emailVerified) {
              //  this.router.navigate(['confirm'])
            } else {
              //  this.alertservice.presentErrorAlert()
            }

            return userCredential
          })
        this.alertservice.presentAlert()
        console.log(user)
        this.router.navigate(['confirm'])

        // ...
      })
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        console.log(error)
        // ..
      });

  }


  // 


  signIn(email: any,
    password: any) {
    const auth = getAuth();
    signInWithEmailAndPassword(this.auth, email, password)
      .then((userCredential) => {
        // Signed in 
        const user = userCredential.user;
        console.log(user)
        this.router.navigate(['menu'])
        // ...
      })
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        console.log(errorMessage);

      });
  }


  async confirm() {
    const auth = getAuth();
    const user = auth.currentUser;

    if (user) {
      await user.reload();

      if (user.emailVerified) {
        this.router.navigate(['menu'])
      } else {
        this.alertservice.verificationError();

      }
    } else {
      console.log('no user found');
    }
  }



  async checkIn(): Promise<boolean | undefined> {
    const auth = getAuth();
    this.user = auth.currentUser;

    await this.user.reload()
    return this.user?.emailVerified



  }




  handleSignOut() {
    signOut(this.auth).then(() => {
      console.log("User signed out");
      this.router.navigate(['/login']);
    }).catch((error) => {
      console.error("Sign out error:", error);
    });
  }


 

  // username: any;
  // showName(username: any) {
  //   const okay = username
  //   console.log(username);



  // }
  
editProfile(value:any){
    const auth = getAuth();
     onAuthStateChanged(auth, (user) => {
      if(user){
        updateProfile(user,{
          displayName:value,photoURL:''
        }).then(()=>{
          this.getUserProfile()
      
        }).catch(()=>{
          console.log('an erroe occur');
          
        })
      }else{
      console.log('no credential')
      }


     })



     

}
  

    

  



  getUserProfile() {

    const auth = getAuth();
    onAuthStateChanged(auth, (user) => {
      if (user) {
         this.updateUsername.set(user)
   
        const uid = user.uid;
        console.log(this.updateUsername())
        // ...
      } else {
        // User is signed out
        // ...
      }
    });

  }

signInWithGoogle(){



const auth = getAuth();
signInWithPopup(auth,this.provider)
  .then((result) => {
    // This gives you a Google Access Token. You can use it to access the Google API.
    const credential:any = GoogleAuthProvider.credentialFromResult(result);
    const token = credential.accessToken;
    // The signed-in user info.
    const user = result.user;
    // IdP data available using getAdditionalUserInfo(result)
    // ...
  }).catch((error) => {
    // Handle Errors here.
    const errorCode = error.code;
    const errorMessage = error.message;
    // The email of the user's account used.
    const email = error.customData.email;
    // The AuthCredential type that was used.
    const credential = GoogleAuthProvider.credentialFromError(error);
    // ...
  });

}  




}
