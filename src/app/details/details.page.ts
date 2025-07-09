import { Component, inject, OnInit, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonContent, IonHeader, IonTitle, IonToolbar,IonIcon,IonButtons,IonBackButton,IonButton} from '@ionic/angular/standalone';
import { ActivatedRoute } from '@angular/router';
import { DataService } from '../services/data.service';

@Component({
  selector: 'app-details',
  templateUrl: './details.page.html',
  styleUrls: ['./details.page.scss'],
  standalone: true,
  imports: [IonContent, IonHeader, IonTitle, IonToolbar, CommonModule, FormsModule,IonButton,IonIcon,IonButtons,IonBackButton]
})
export class DetailsPage implements OnInit {
  router=inject(ActivatedRoute)
  dataService=inject(DataService)
  sec=signal<any>(null)


  constructor() { }

  ngOnInit() {
    this.getThirdSongs()
  }

  async getThirdSongs(){
    const id= this.router.snapshot.paramMap.get("id")
    const  thirdSongs:any=await this.dataService.thrdSongs(id)
    this.sec.set(thirdSongs)
    console.log(thirdSongs)

  }

}
