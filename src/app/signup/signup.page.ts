import { Component, inject, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonContent, IonHeader, IonTitle, IonToolbar,IonInput,IonBackButton,IonButtons,IonCheckbox,IonButton} from '@ionic/angular/standalone';
import { AuthsService } from '../auths service/auths.service';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule  } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.page.html',
  styleUrls: ['./signup.page.scss'],
  standalone: true,
  imports: [ ReactiveFormsModule ,IonButton,IonContent, IonHeader, IonTitle, IonToolbar, CommonModule, FormsModule,IonInput,IonBackButton,IonButtons,IonCheckbox]
})
export class SignupPage implements OnInit {
  authsService=inject(AuthsService)
  myForm: FormGroup;
  fb=inject(FormBuilder);
  router=inject(Router)
  
  constructor() {
    this.myForm = this.fb.group({
      password: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      checkbox: [,[Validators.required]]
    });

    }
        onSubmit(){
      if (this.myForm.valid) {
        console.log('Form submitted:', this.myForm.value);
        this.authsService.signUp(this.myForm.value.email, this.myForm.value.password)
      }
    
    
  }
  
  ngOnInit() {
  }
  goToConfirmPage(){
    this.router.navigate(['confirm'])
  }

  }
//   constructor() {
   

 
// // }
// export class ReactiveFormComponent {
 
// }
