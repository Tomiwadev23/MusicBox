import { Component, effect, inject, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonContent,IonRefresher,RefresherCustomEvent, IonHeader, IonTitle, IonToolbar,IonAvatar,IonButtons,IonBackButton,IonIcon, IonButton, IonActionSheet, IonRefresherContent } from '@ionic/angular/standalone';
import { Router } from '@angular/router';
import { DataService } from '../services/data.service';
import { addIcons } from 'ionicons';
import{ellipsisVertical} from 'ionicons/icons';
import { AlertService } from '../alert.service';
import {LoadingController } from '@ionic/angular/standalone';

@Component({
  selector: 'app-playlist',
  templateUrl: './playlist.page.html',
  styleUrls: ['./playlist.page.scss'],
  standalone: true,
  imports: [IonRefresherContent,IonRefresherContent, IonActionSheet, IonButton,IonContent,IonRefresher, IonHeader, IonTitle, IonToolbar, CommonModule, FormsModule,IonAvatar,IonButtons,IonBackButton,IonIcon]
})
export class PlaylistPage implements OnInit {
  itemSong:any[]=[]
  router=inject(Router)
  dataService=inject(DataService)
  alertService=inject(AlertService)
  loadingCtrl=inject(LoadingController)


  constructor() {
        addIcons({ellipsisVertical});
        effect(()=>{
          this.dataService.showplay()
          this.itemSong=this.dataService.showplay()
        })

          //  this.dataService.carrierSignal.set(this.carrier())
   }

 async ngOnInit() {

    await this.dataService.getAddSong()

// this.carrier()
  }
 
//   async carrier(){

//   console.log(this.dataService.showplay());
//   }

    handleRefresh(event: RefresherCustomEvent) {
    setTimeout(async () => {
     await this.dataService.getAddSong()
      event.target.complete();
      console.log(this.itemSong);
      
    }, 2000);


  }


  






}
