import { inject, Injectable } from '@angular/core';
import { AlertController,ToastController} from '@ionic/angular/standalone';
@Injectable({
  providedIn: 'root'
})
export class AlertService {
  alertCtrl=inject(AlertController)
  toastController=inject(ToastController)

  constructor() { }
   async presentAlert() {
    const alert = await this.alertCtrl.create({
      header: '',
      // subHeader: 'A Sub Header Is Optional',
      message: 'An email has been sent to you.',
      buttons: ['Got it'],
      // cssClass:'signup-alert'
      
    });

    await alert.present();
  }


   async presentErrorAlert() {
    const alert = await this.alertCtrl.create({
      header: '',
      // subHeader: 'A Sub Header Is Optional',
      message: 'you have issues with recieving email',
      buttons: ['OK'],
    });

    await alert.present();
  }

  
   async verificationError() {
    const alert = await this.alertCtrl.create({
      header: '',
      // subHeader: 'A Sub Header Is Optional',
      message: 'your email has not been verified',
      buttons: ['OK'],
    });

    await alert.present();
  }


  
 async toast(position:'bottom') {
    const toast = await this.toastController.create({
      message: 'Hello World!',
      duration: 1500,
      position: position,
    });

    await toast.present();
  
  }
}
