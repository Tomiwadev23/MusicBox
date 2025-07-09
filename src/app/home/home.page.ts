import { Component, inject } from '@angular/core';
import { Router } from '@angular/router';
import { IonHeader, IonToolbar, IonTitle, IonContent,IonModal,IonInput,IonInputPasswordToggle,IonIcon} from '@ionic/angular/standalone';
import { addCircle,lockClosed} from 'ionicons/icons';
import { addIcons } from 'ionicons';
import { DataService } from '../services/data.service';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';


@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
  imports: [IonHeader, IonToolbar, IonTitle, IonContent,IonModal,IonInput,IonInputPasswordToggle,IonIcon,CommonModule,FormsModule]
})
export class HomePage {
  constructor() {
    addIcons({ addCircle,lockClosed});
  }

router=inject(Router)
dataService = inject(DataService)


routeToMenu(event:MouseEvent){
  event.preventDefault();

  this.router.navigate(['/menu'])
}

}



