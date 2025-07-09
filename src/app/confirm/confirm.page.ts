import { Component, inject, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonContent, IonHeader, IonTitle, IonToolbar,IonBackButton,IonButtons,IonButton } from '@ionic/angular/standalone';
import { AuthsService } from '../auths service/auths.service';

@Component({
  selector: 'app-confirm',
  templateUrl: './confirm.page.html',
  styleUrls: ['./confirm.page.scss'],
  standalone: true,
  imports: [IonContent, IonHeader, IonTitle, IonToolbar, CommonModule, FormsModule,IonBackButton,IonButtons,IonButton]
})
export class ConfirmPage implements OnInit {
  authsService=inject(AuthsService)
  emailVerification:any;

  constructor() { }

 async ngOnInit() {
   setInterval(async()=>{
        const verified = await this.authsService.checkIn();
  //  console.log('statusCheck:', this.authsService.statusCheck());



   this.emailVerification = verified;
   console.log( this.emailVerification)

  },2000)

  
    
  }

  async tapon(){
  
    console.log(await this.authsService.checkIn());
     const verified = await this.authsService.checkIn();
    console.log(verified);

  }



}
