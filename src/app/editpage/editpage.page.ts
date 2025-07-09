import { Component, inject, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, FormsModule,ReactiveFormsModule } from '@angular/forms';
import { IonContent,IonModal,IonButton, IonHeader, IonTitle, IonToolbar,IonInput,IonButtons,IonBackButton,IonIcon } from '@ionic/angular/standalone';
import { addIcons } from 'ionicons';
import { camera, images } from 'ionicons/icons';
import { AuthsService } from '../auths service/auths.service';
import { DataService } from '../services/data.service';
import { Camera, CameraResultType } from '@capacitor/camera';
@Component({
  selector: 'app-editpage',
  templateUrl: './editpage.page.html',
  styleUrls: ['./editpage.page.scss'],
  standalone: true,
  imports: [IonContent,ReactiveFormsModule,IonModal, IonHeader,IonButton, IonTitle, IonToolbar, CommonModule, FormsModule,IonInput,IonButtons,IonIcon,IonBackButton]
})
export class EditpagePage implements OnInit {
  fb=inject(FormBuilder)
  userName:FormGroup;
  authsService=inject(AuthsService)
    dataService=inject(DataService)

  

  constructor() { 
    addIcons({camera,images});
      this.userName = this.fb.group({
      username: [''],

    });


  }
    onSubmit() {
    if (this.userName.valid) {
      console.log('Form submitted:', this.userName.value);
      const formData = this.userName.value
      this.authsService.editProfile(formData.username)
      // this.dataService.addUsername( formData.username)   

      // (formData.username)
    }
   }
   
  

  async ngOnInit() {


  }

  goToCamera(){
    console.log('jgugu');
    
    const takePicture = async () => {
  const image = await Camera.getPhoto({
    quality: 90,
    allowEditing: true,
    resultType: CameraResultType.Uri
  });


  var imageUrl = image.webPath;

 
   
};
 takePicture()
  }
  
  handleFile(event: any) {
  const file = event.target.files[0];
  console.log("Selected file:", file);
  // Handle your file upload here
}

}
