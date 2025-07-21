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
  route=inject(Router)
  dataService = inject(DataService)
  album = signal<any>(null)
  camel:any;
  destiny:any;
  instantiated=false;
  constructor() {
    // effect(async (id)=>{
    //   if(this.instantiated){
    //     this.album()

    //   }else{
    //     this.instantiated=true
    //   }
    //   this.album()
    // })
      addIcons({checkmarkCircle,addCircle,playCircle}); }

   async ngOnInit() {
    //    const id = this.router.snapshot.paramMap.get("id")
    // const singleDoc:any = await this.dataService.getSingleData(id)
    // console.log(singleDoc);
    
    // this.album.set(singleDoc)
    this.loadData()
  }
  loadData() {
  const id = this.router.snapshot.paramMap.get('id');
  this.dataService.getSingleData(id).subscribe((data) => {
    this.album.set(data); // Updates automatically
  });
}
goToAudio(id:any){
  console.log(id);
  
  this.route.navigate(['audio',id])

}

 

  // async getSongData(){
  //   const id = this.router.snapshot.paramMap.get("id")
  //   const singleDoc:any = await this.dataService.getSingleData(id)
  //   console.log(singleDoc);
    
  //   this.album.set(singleDoc)

  // }


  // tryagain(){
  //   this.getSongData()
  // }

}
