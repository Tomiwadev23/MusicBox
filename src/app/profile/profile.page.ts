import { Component, inject, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonContent,IonItem,IonIcon, IonHeader,IonNote,IonLabel, IonTitle, IonToolbar,IonBackButton,IonButtons,IonList, } from '@ionic/angular/standalone';
import { addIcons } from 'ionicons';
import { exit, arrowForward, notificationsOutline, starOutline, text, cog, colorPalette, logOut, create } from 'ionicons/icons';
import { AuthsService } from '../auths service/auths.service';
import { Router } from '@angular/router';
import { DataService } from '../services/data.service';
@Component({
  selector: 'app-profile',
  templateUrl: './profile.page.html',
  styleUrls: ['./profile.page.scss'],
  standalone: true,
  imports: [IonContent,IonList,IonItem,IonIcon,IonLabel,IonNote, IonHeader, IonTitle, IonToolbar, CommonModule, FormsModule,IonBackButton,IonButtons]
})
export class ProfilePage implements OnInit {
  authsService=inject(AuthsService)
  router=inject(Router)
  emailName:string=''
  dataService=inject(DataService)
  use:any;

  constructor() {
    addIcons({create,colorPalette,arrowForward,cog,text,starOutline,notificationsOutline,logOut,exit});
   }

   async ngOnInit() {
     this.authsService.getUserProfile()
    

  }
  goToEdit(){
    this.router.navigate(['editpage'])
    // this.authsService.autoGet()
    
  }

}
