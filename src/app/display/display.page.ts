import { Component, inject, OnInit, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonContent, IonHeader, IonTitle, IonToolbar,IonButtons,IonBackButton,IonIcon } from '@ionic/angular/standalone';
import { ActivatedRoute, Router } from '@angular/router';
import { DataService } from '../services/data.service';

@Component({
  selector: 'app-display',
  templateUrl: './display.page.html',
  styleUrls: ['./display.page.scss'],
  standalone: true,
  imports: [IonContent, IonHeader, IonTitle, IonToolbar, CommonModule, FormsModule,IonButtons,IonBackButton,IonIcon]
})
export class DisplayPage implements OnInit {
  router=inject(ActivatedRoute)
  dataService=inject(DataService)
  genre=signal<any>(null)

  constructor() { 
  
  }

  ngOnInit() {
    this.getLastData()
  }

  async getLastData(){

    const id = this.router.snapshot.paramMap.get("id")
    const lastDoc:any =await this.dataService.getMaxData(id)
    this.genre.set(lastDoc)
    console.log(this.genre())

  }

}
