import { Component, effect, inject, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonContent,IonSegmentView,IonSegmentContent,IonThumbnail,IonSkeletonText,IonList,IonListHeader, IonHeader, IonTitle, IonToolbar,IonItem,IonLabel,IonAvatar,IonBadge,IonRefresher,IonRefresherContent,IonSegment,IonSegmentButton, IonNote,IonFooter,IonTab,IonTabs,IonTabButton,IonTabBar,IonIcon,IonCard,IonCardContent,IonCardTitle,IonCardSubtitle,IonCardHeader,IonChip,IonSearchbar} from '@ionic/angular/standalone';
import { homeOutline,downloadOutline,personOutline,searchOutline,playCircle, addCircle,library, ellipsisVertical, albums, musicalNotes, } from 'ionicons/icons';
import { addIcons } from 'ionicons';
import { DataService } from '../services/data.service';
import { Router } from '@angular/router';
import { TypesenseService } from '../typesense.service';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.page.html',
  styleUrls: ['./menu.page.scss'],
  standalone: true,
  imports: [IonContent,IonList,IonListHeader,IonSkeletonText,IonSegmentContent,IonThumbnail,IonSegmentView, IonHeader, IonTitle, IonToolbar, CommonModule, FormsModule,IonItem,IonLabel,IonAvatar,IonBadge,IonRefresher,IonRefresherContent,IonSegment,IonSegmentButton,IonNote,IonFooter,IonTab,IonTabs,IonTabButton,IonTabBar,IonIcon,IonCard,IonCardContent,IonCardTitle,IonCardSubtitle,IonCardHeader,IonChip,IonSearchbar]
})
export class MenuPage implements OnInit{
  plays:any[]=[]
  tommySongs : any[] = [];
  secondMusic : any[] = [];
  thirdjams : any[] = [];
  fansPage : any[] = [];
  recentSearch:any[]=[];
  kinds:any[]=[];
  amount:any;
  favorites:any[]=[]
  podcasts:any[]=[]
  searchResults: any[] = [];
  query = '';
  typesense=inject(TypesenseService)
  
   handleRefresh(event: CustomEvent) {
    setTimeout(() => {
      // Any calls to load data go here
      (event.target as HTMLIonRefresherElement).complete();
    }, 2000);
  }

  dataService = inject(DataService)
  router = inject(Router)
  imageUrl:any="https://i.pinimg.com/736x/46/4b/ca/464bca0a73f4213243a7293eeb70c639.jpg";
  loaded =false;
  
  constructor() {
    // effect(()=>{
    // this.dataService.playSong()
    //    this.dataService.getAddSong

    // })
      
      addIcons({homeOutline,searchOutline,downloadOutline,albums,addCircle,playCircle,musicalNotes,ellipsisVertical,library,personOutline,});
    }


  async ngOnInit() {
    this.loadPost().then(()=>{
      this.loaded = true
    })
      await this.dataService.getAddSong()
   
       this.plays=this.dataService.playSong()
       await this.dataService.getPLaysong()

   
   
  }
  async loadPost(){
   await  this.dataService.getPlaylists()
   await this.dataService.getRecommended()
   await this.dataService.getTrendingSong();
   await this.dataService.getRandomSong();
await this.dataService.getPLaysong()
await this.dataService.getFavorite()
await this.dataService.getPodcast()



   this.tommySongs = this.dataService.playlists()
   this.secondMusic = this.dataService.recommendedSongs()
   this.thirdjams= this.dataService.trendingSongs()
   this.fansPage=this.dataService.randomSong()
   this.favorites = this.dataService.favorites()
   this.podcasts = this.dataService.podcasts()
   
      this.plays=this.dataService.playSong()


  }
    async search() {
    try {
      const searchParameters = {
        q: this.query,
        query_by: 'artist,song', // Fields to search
        per_page: 10
      };
console.log(this.query);

      const results = await this.typesense.getClient()
        .collections('playlist')
        .documents()
        .search(searchParameters);

      this.searchResults = results.hits?.map((hit: { document: any; }) => hit.document) || [];
      console.log(this.searchResults);
      
    } catch (error) {
      console.error('Search error:', error);
    }
  }

 goToAbout(id: any){
  console.log(id)
  this.router.navigate(['info', id])
 }

 goToInfo(id:any){
  console.log(id)
  this.router.navigate(['about',id])
 }
 goToDetails(id:any){
  console.log(id)
  this.router.navigate(['details',id])
 }
 goToLast(id:any){
  console.log(id)
  this.router.navigate(['display',id])
 }

 goToProfile(){
  this.router.navigate(['profile'])
 }
 goToShowItem(){
  this.router.navigate(['show-item'])
 }
  
 goToRecommended(){
  this.router.navigate(['recommended'])
 }
 goToplas(){
  this.router.navigate(['showplaylist'])
 }

 


}