import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonContent, IonHeader, IonTitle,IonButtons,IonBackButton, IonToolbar } from '@ionic/angular/standalone';

@Component({
  selector: 'app-try',
  templateUrl: './try.page.html',
  styleUrls: ['./try.page.scss'],
  standalone: true,
  imports: [IonContent, IonHeader, IonTitle, IonToolbar,IonButtons,IonBackButton, CommonModule, FormsModule]
})
export class TryPage implements OnInit {

  constructor() { }

  ngOnInit() {
  }

}
