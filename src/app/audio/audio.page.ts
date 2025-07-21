import { Component, inject, OnInit, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonContent,IonRange, IonHeader,IonBackButton, IonTitle, IonToolbar,IonProgressBar,IonIcon, IonButtons } from '@ionic/angular/standalone';
import { addIcons } from 'ionicons';
import {pause, play,playSkipBack} from 'ionicons/icons';
import { ActivatedRoute } from '@angular/router';
import { DataService } from '../services/data.service';


@Component({
  selector: 'app-audio',
  templateUrl: './audio.page.html',
  styleUrls: ['./audio.page.scss'],
  standalone: true,
  imports: [IonButtons,IonBackButton, IonContent, IonHeader, IonTitle, IonToolbar,IonRange, CommonModule,IonIcon, FormsModule,IonProgressBar]
})
export class AudioPage implements OnInit {
  route=inject(ActivatedRoute)
  dataService=inject(DataService)
  play='play'
  great=signal<any>(null)
  
  audio: HTMLAudioElement;
  currentTime = 0;
  duration = 0;
  currentTimeDisplay = '00:00';
  durationDisplay = '00:00';

  constructor() {
   this.audio = new Audio('assets/first.mp3');
   this.audio.loop = true;
    addIcons({play,playSkipBack,pause});

    this.audio.addEventListener('loadedmetadata', () => {
      this.duration = this.audio.duration;
       this.durationDisplay = this.formatTime(this.duration);
       console.log(this.duration);
       
   
       
    });

       this.audio.addEventListener('timeupdate', () => {
      this.currentTime = this.audio.currentTime;
      this.currentTimeDisplay = this.formatTime(this.currentTime);
    
      
    });
 
  }
    formatTime(seconds: number): string {
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = Math.floor(seconds % 60);
    return `${minutes.toString().padStart(2, '0')}:${remainingSeconds.toString().padStart(2, '0')}`;
  }

    

  seekAudio(){
    this.audio.currentTime = this.currentTime;
    
      this.audio.pause();
      this.play = "play"
      this.start()
    }
        

  ngOnInit() {
  }
  start(){
   

    if(this.play === 'play'){
this.audio.play()
      this.play = 'pause'


    }else if(this.play === "pause"){
      this.play = 'play'
      
        this.audio.pause()
    }

    
  }
  goData(){
    const id = this.route.snapshot.paramMap.get('id')
    const ref = this.dataService.getAudio(id)
    this.great.set(ref)
  }

}
