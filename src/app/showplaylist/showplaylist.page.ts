import { Component, inject, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonContent, IonHeader, IonTitle, IonToolbar,IonBackButton,IonButtons } from '@ionic/angular/standalone';
import { DataService } from '../services/data.service';

@Component({
  selector: 'app-showplaylist',
  templateUrl: './showplaylist.page.html',
  styleUrls: ['./showplaylist.page.scss'],
  standalone: true,
  imports: [IonContent, IonHeader, IonTitle, IonToolbar, CommonModule, FormsModule,IonBackButton,IonButtons]
})
export class ShowplaylistPage implements OnInit {
  dataService=inject(DataService)
  plas:any[]=[];

  constructor() { }

  async ngOnInit() {
        await  this.dataService.getTrendSong()

       this.plas = this.dataService.trending()


  }

}
