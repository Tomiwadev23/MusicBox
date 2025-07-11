import { inject, Injectable } from '@angular/core';
<<<<<<< HEAD
import { AlertController,ToastController} from '@ionic/angular/standalone';
=======
import { AlertController} from '@ionic/angular/standalone';
import{ActionSheetController}from '@ionic/angular/standalone';
import { DataService } from './services/data.service';
>>>>>>> b0d43b297fa3e67c9f0d2cd11b87dae1b1e4364c
@Injectable({
  providedIn: 'root'
})
export class AlertService {
  alertCtrl=inject(AlertController)
<<<<<<< HEAD
  toastController=inject(ToastController)
=======
  actionSheetCtrl=inject(ActionSheetController)
  dataService=inject(DataService)
>>>>>>> b0d43b297fa3e67c9f0d2cd11b87dae1b1e4364c

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
<<<<<<< HEAD


  
 async toast(position:'bottom') {
    const toast = await this.toastController.create({
      message: 'Hello World!',
      duration: 1500,
      position: position,
    });

    await toast.present();
  
  }
=======
    async presentActionSheet(id:any) {
    const actionSheet = await this.actionSheetCtrl.create({
      buttons: [
        {
          text: 'Delete',
          role: 'destructive',
          data: {
            action: 'delete',
          },
           handler: () => {
            this.dataService.deletePlaylist(id);
             // Call your function here
          },
        },
        {
          text: 'Share',
          data: {
            action: 'share',
          },
        },
        {
          text: 'Cancel',
          role: 'cancel',
          data: {
            action: 'cancel',
          },
        },
      ],
    });

    await actionSheet.present();
  }

>>>>>>> b0d43b297fa3e67c9f0d2cd11b87dae1b1e4364c
}
