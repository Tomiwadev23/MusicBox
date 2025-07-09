import { Component, inject, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonContent, IonHeader, IonTitle, IonToolbar,IonBackButton,IonButtons } from '@ionic/angular/standalone';
import { DataService } from '../services/data.service';

@Component({
  selector: 'app-show-item',
  templateUrl: './show-item.page.html',
  styleUrls: ['./show-item.page.scss'],
  standalone: true,
  imports: [IonContent, IonHeader, IonTitle, IonToolbar, CommonModule, FormsModule,IonBackButton,IonButtons]
})
export class ShowItemPage implements OnInit {
dataService=inject(DataService)
results:any[]=[]
  constructor() { }

  async ngOnInit() {
       await  this.dataService.getShowAll()

       this.results = this.dataService.showAllplaylists()


  }

}
