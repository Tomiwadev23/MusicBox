import { Component, inject, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonContent, IonHeader, IonTitle, IonToolbar,IonAvatar,IonButtons,IonBackButton,IonIcon} from '@ionic/angular/standalone';
import { Router } from '@angular/router';
import { DataService } from '../services/data.service';
import { addIcons } from 'ionicons';
import{close} from 'ionicons/icons';

@Component({
  selector: 'app-playlist',
  templateUrl: './playlist.page.html',
  styleUrls: ['./playlist.page.scss'],
  standalone: true,
  imports: [IonContent, IonHeader, IonTitle, IonToolbar, CommonModule, FormsModule,IonAvatar,IonButtons,IonBackButton,IonIcon]
})
export class PlaylistPage implements OnInit {
  itemSong:any[]=[]
  router=inject(Router)
  dataService=inject(DataService)

  constructor() {
        addIcons({close});
   }

 async ngOnInit() {
  
  await this.dataService.getAddSong()

  this.itemSong= this.dataService.showplay()
  console.log(this.dataService.showplay());
  }




}
