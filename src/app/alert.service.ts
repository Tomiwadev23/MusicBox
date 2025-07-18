import { inject, Injectable } from '@angular/core';
import { AlertController,ToastController} from '@ionic/angular/standalone';
import{ActionSheetController,LoadingController}from '@ionic/angular/standalone';
import { DataService } from './services/data.service';
@Injectable({
  providedIn: 'root'
})
export class AlertService {
  loadingCtrl=inject(LoadingController)
  alertCtrl=inject(AlertController)
  toastController=inject(ToastController)
  actionSheetCtrl=inject(ActionSheetController)
  dataService=inject(DataService)

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
         
         this.showLoading(id)
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
    async showLoading(id:any) {
      const loading = await this.loadingCtrl.create({
        message: 'Deleting PLaylist...',
        duration: 800,
      });
  
      loading.present();
      setTimeout(()=>{
    this.dataService.deletePlaylist(id);
      },1000)
     
    }
  

}
