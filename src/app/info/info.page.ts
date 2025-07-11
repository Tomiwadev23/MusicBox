import { Component, effect, inject, OnInit, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonContent, IonHeader, IonTitle, IonToolbar,IonIcon,IonBackButton,IonButtons,IonButton } from '@ionic/angular/standalone';
import {playCircle, addCircle, checkmarkCircle } from 'ionicons/icons';
import { addIcons } from 'ionicons';
import { ActivatedRoute, Router } from '@angular/router';
import { DataService } from '../services/data.service';

@Component({
  selector: 'app-info',
  templateUrl: './info.page.html',
  styleUrls: ['./info.page.scss'],
  standalone: true,
  imports: [IonContent, IonHeader, IonTitle, IonToolbar,IonButton, CommonModule, FormsModule,IonIcon,IonButtons,IonBackButton]
})
export class InfoPage implements OnInit {
  router = inject(ActivatedRoute)
  dataService = inject(DataService)
  album = signal<any>(null)
  camel:any;
  destiny:any;
  instantiated=false;
  constructor() {
    effect(()=>{
      if(this.instantiated){

        this.album()
      
        this.getSongData()
      }else{
        this.instantiated=true
      }
      this.album()
    })
      addIcons({checkmarkCircle,addCircle,playCircle}); }

   async ngOnInit() {
    this.getSongData()
  }
  async fera(){
     this.album()
  }


  async getSongData(){
    const id = this.router.snapshot.paramMap.get("id")
    const singleDoc:any = await this.dataService.getSingleData(id)
    this.album.set(singleDoc)

  }

}
