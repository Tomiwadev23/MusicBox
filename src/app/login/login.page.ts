import { Component, inject, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonContent, IonHeader,IonCheckbox, IonTitle, IonToolbar,IonInput,IonInputPasswordToggle, IonModal,IonButton} from '@ionic/angular/standalone';
import { DataService } from '../services/data.service';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule  } from '@angular/forms';
import { AuthsService } from '../auths service/auths.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
  standalone: true,
  imports: [ReactiveFormsModule,IonButton,IonCheckbox,IonContent, IonHeader, IonTitle, IonToolbar, CommonModule, FormsModule,IonInput,IonInputPasswordToggle,IonModal]
})
export class LoginPage implements OnInit {
  dataService=inject(DataService)
  router=inject(Router)
   myForm: FormGroup;

  fb=inject(FormBuilder);
authsService=inject(AuthsService)

  constructor( ) {
    this.myForm = this.fb.group({
      password: ['',[ Validators.required,Validators.minLength(6)]],
      email: ['', [Validators.required, Validators.email]]
    });
  }

  onSubmit() {
    if (this.myForm.valid) {
      console.log('Form submitted:', this.myForm.value);
      const formData = this.myForm.value
       this.authsService.signIn(formData.email, formData.password)
    }
   }
  
  

  ngOnInit() {


  }
  // routeToMenu(event:MouseEvent){
  //   this.router.navigate(['menu'])

  // }
    goToSignUp(){
    this.router.navigate(['signup'])
    }


}
