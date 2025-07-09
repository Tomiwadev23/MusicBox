import { Component, inject, OnInit, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonContent, IonHeader, IonTitle, IonToolbar,IonIcon,IonButtons,IonBackButton } from '@ionic/angular/standalone';
import { DataService } from '../services/data.service';
import { ActivatedRoute } from '@angular/router';


@Component({
  selector: 'app-about',
  templateUrl: './about.page.html',
  styleUrls: ['./about.page.scss'],
  standalone: true,
  imports: [IonContent, IonHeader, IonTitle, IonToolbar, CommonModule, FormsModule,IonIcon,IonButtons,IonBackButton]
})
export class AboutPage implements OnInit {
  dataService = inject(DataService)
  router = inject(ActivatedRoute)
  ep= signal<any>(null)



  constructor() { }

  ngOnInit() {
    this.getSecondMusic()
  }
  async getSecondMusic(){
    const did=this.router.snapshot.paramMap.get("id")
    const multipleDoc:any =await this.dataService.getMultipleData(did)
    this.ep.set(multipleDoc)
    console.log(multipleDoc)
  }

}
