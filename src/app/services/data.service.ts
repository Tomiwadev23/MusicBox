import { effect, inject, Injectable, OnInit, signal } from '@angular/core';
import { collection, doc, addDoc, Firestore, getDoc, getDocs, updateDoc, setDoc, deleteDoc } from '@angular/fire/firestore';
import { Router } from '@angular/router';
import { onSnapshot, runTransaction } from "firebase/firestore";
import { Capacitor } from '@capacitor/core';
import { Browser } from '@capacitor/browser';
import {ToastController, LoadingController } from '@ionic/angular/standalone';
import { BehaviorSubject } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class DataService implements OnInit {
  toastController=inject(ToastController)
  vop=signal<any[]>([])
  varry:any[]=[];

  router = inject(Router)
  loadingCtrl=inject(LoadingController)
  playlists = signal<any[]>([]);
  showAllplaylists = signal<any[]>([]);
  recommendedSongs = signal<any[]>([]);
  recommended = signal<any[]>([]);
  trendingSongs = signal<any[]>([]);
  trending = signal<any[]>([]);
  randomSong = signal<any[]>([]);
  playSong = signal<any[]>([]);
  showplay = signal<any[]>([]);
  showAddusername = signal<any[]>([])
  counter = signal<any>(0)
  carrierSignal=signal<any>(null)




  constructor(private db:Firestore) {

this.getPlaylists()
  }
  async ngOnInit() {
    await this.getAddSong()
  
    
  }
  
  // async getPlaylists() {
  //   const dataRef = collection(this.db, "playlist");
  //   const querysnapshot = await getDocs(dataRef);
  //   const docsData: any[] = [];
  //   querysnapshot.forEach((doc) => {
  //     docsData.push(doc.data());

  //     this.playlists.set(docsData.slice(0, 6));
  //     console.log(this.playlists())
  //   });

  // }
  getPlaylists() {
  onSnapshot(collection(this.db, "playlist"), (snapshot) => {
    const playlists: any[] = [];
    snapshot.docs.slice(0, 6).forEach(doc => {
      playlists.push(doc.data());
    });
    this.playlists.set(playlists);
  });
}


  async getShowAll() {
    const dataRef = collection(this.db, "playlist");
    const querysnapshot = await getDocs(dataRef);
    const docsData: any[] = [];
    querysnapshot.forEach((doc) => {
      docsData.push(doc.data());

      this.showAllplaylists.set(docsData);
      console.log(this.showAllplaylists())
    });

  }



  async getRecommended() {
    const dataRf = collection(this.db, "recommended")
    const queryShot = (await getDocs(dataRf)).docs.map((doc) => doc.data())
    this.recommendedSongs.set(queryShot.slice(0, 6))
    console.log(this.recommendedSongs());

  }
  async getRecom() {
    const dataRf = collection(this.db, "recommended")
    const queryShot = (await getDocs(dataRf)).docs.map((doc) => doc.data())
    this.recommended.set(queryShot)
    console.log(this.recommended());

  }


  async getTrendingSong() {
    const datRef = collection(this.db, 'trending');
    const querySnap = await getDocs(datRef);
    const docsData: any[] = []
    querySnap.forEach((doc) => {
      docsData.push(doc.data());
    })
    this.trendingSongs.set(docsData.slice(0, 6));
    console.log(this.trendingSongs());
  }

  async getTrendSong() {
    const datRef = collection(this.db, 'trending');
    const querySnap = await getDocs(datRef);
    const docsData: any[] = []
    querySnap.forEach((doc) => {
      docsData.push(doc.data());
    })
    this.trending.set(docsData);
    console.log(this.trending());
  }

  async getRandomSong() {
    const getd = collection(this.db, 'random');
    const accum = await getDocs(getd);
    const docsValue: any[] = [];
    accum.forEach((doc) => {
      docsValue.push(doc.data());
    })
    this.randomSong.set(docsValue);
    console.log(this.randomSong());
  }
//     getPlaylists() {
//   onSnapshot(collection(this.db, "playlist"), (snapshot) => {
//     const playlists: any[] = [];
//     snapshot.docs.slice(0, 6).forEach(doc => {
//       playlists.push(doc.data());
//     });
//     this.playlists.set(playlists);
//   });
// }

  async getPLaysong() {
  
    const dataref = collection(this.db, 'play');
      onSnapshot(dataref,(snapshot)=>{
    const arr: any[] = [];
    snapshot.forEach((doc) => {
      arr.push({id:doc.id,...doc.data()});
    })
    this.playSong.set(arr);
    console.log(this.playSong())


    })
   
  }

  getSingleData(id: any) {
    const docRef = doc(this.db, 'playlist', id);
  const documentData$ = new BehaviorSubject<any>(null); 
  
  onSnapshot(docRef, (doc) => {
    documentData$.next(doc.exists() ? doc.data() : null);
  });
  return documentData$; 
}

  async getMaxData(id: any) {
    const ref = doc(this.db, 'random', id)
    const querysnapshot = (await getDoc(ref)).data()
    return querysnapshot

  }

  async getMultipleData(id: any) {
    const ref = doc(this.db, 'recommended', id)
    const queryShot = (await getDoc(ref)).data()
    return queryShot
  }
  async thrdSongs(id: any) {
    // const objId = doc(collection(this.db, "id")).id
    const docr = doc(this.db, 'trending', id)
    const qshot = (await getDoc(docr)).data()
    return qshot
  }
  myArtist: string = ''
  mySong: string = ''

  async adddoc() {
    //  const objId = doc(collection(this.db, "id")).id
    //     const ref = doc(this.db,"playlist", "TBAMZ17yjq9Da7L0Ry99");
    // setDoc(ref, { capital: true });



    //   const docRef = await setDoc(doc( collection(this.db,"playlist"), "TBAMZ17yjq9Da7L0Ry99"),{
    //     year:'kahi',
    //     song:'hwe gfhgyg',
    //   image:'https://i.pinimg.com/736x/66/c9/02/66c902e12b9afac40ce841842705132b.jpg' }, {merge: true}
    // )
    // console.log(objId, "objID")
    // await updateDoc(docRef,{image:'https://i.pinimg.com/736x/66/c9/02/66c902e12b9afac40ce841842705132b.jpg'});
  }
  async delDoc(doId: string) {
    await deleteDoc(doc(this.db, 'playlist', doId));

  }
  // async deletePlaylist(id: string) {
  //   console.log(id)
  //   await deleteDoc(doc(this.db, 'AddPlay', id))
  // }
  goToLogin(event: MouseEvent) {
    event.preventDefault()
    this.router.navigate(['/login'])
  }
  goToPlaylist(event: MouseEvent) {
    event.preventDefault()
    this.router.navigate(['playlist'])
  }
  goToSignUp() {
    this.router.navigate(['signup'])
  }

// changer=false;


  async addToPlay(data: any) {
    const reference = doc(this.db, 'AddPlay', data.id)
    await setDoc(reference, {
      name: data.artist,
      image: data.image,
      song: data.song,
      id: data.id,
       }
    )
    this.toast()
    // this.changer=true;
    console.log(data)
    this.updateChecker(data)

   
  }
  async updateChecker(data:any){
    const ref= doc(this.db,'playlist',data.id)
    await updateDoc(ref,{added:true})
    // console.log(data.);
    
  }

    // async checkerMan(){
  //   const share = collection(this.db,'AddPlay')
  //    const querysnapshot = await getDocs(share);
  //   const caty:any[]=[];
  //   querysnapshot.forEach((doc)=>{
  //     caty.push(doc.data())
  //   })


  // }
 


   async toast() {
    const toast = await this.toastController.create({
      message: 'Added To Favorite',
      duration: 2000,
      position:'bottom',
     icon: 'checkmark-circle',
    cssClass: 'my-toast'
    });

    await toast.present();
  
  }
  

  async getAddSong() {

    const dataref = collection(this.db, 'AddPlay')
    const unsubscribe =onSnapshot(dataref,(queshot)=>{
  const arr: any[] = [];
    queshot.forEach((doc) => {
      arr.push(doc.data())
    })
    this.showplay.set(arr)
    console.log('fasi',this.showplay());
    this.counter.set(arr.length)
    this.updateToPlaylist()
    this.carrierSignal();
    })
    this.unsubscribeGetAddSong = unsubscribe;

    
  
  
  }
  // Add this to your component
unsubscribeGetAddSong: any;

ngOnDestroy() {
  if (this.unsubscribeGetAddSong) {
    this.unsubscribeGetAddSong();
  }
}
     async updateToPlaylist(){
    const ref = doc(this.db,'play','JmPDO5ku25HYP2BSN2QV');
    await updateDoc(ref,{no:this.counter()})
    console.log('new method',this.counter());


  }


  async addUsername(uger: any) {
    const ref = doc(this.db, 'New', 'PG8P0FftkrfkqhC9dKou')
    await setDoc(ref, { username: uger }, { merge: true })

  }
    async deletePlaylist(id: string) {
    console.log(id)
    const og = id
    const ref=doc(this.db, 'AddPlay', id);
    await deleteDoc(ref)
    this.getAddSong()
    this.showLoading()
    this.updateDeleteChecker(og)
    
  }
    async updateDeleteChecker(og:any){
    const ref= doc(this.db,'playlist',og)
    await updateDoc(ref,{added:false})
    // console.log(data.);
    
  }


  async showLoading() {
    const loading = await this.loadingCtrl.create({
      message: 'Deleting PLaylist...',
      duration: 1000,
    });

    loading.present();
  }


  async setDoc() {
    const ref = doc(this.db, 'AddPlay',)
  }
async openSpotify(trackId:any) {
  const spotifyWebUrl = `https://open.spotify.com/track/${trackId}`;
  const spotifyAppUrl = `spotify:track:${trackId}`;

  if (Capacitor.isNativePlatform()) {
    try {
      await Browser.open({ url: spotifyAppUrl });
    } catch (e) {
      await Browser.open({ url: spotifyWebUrl });
    }
  } else {
    window.open(spotifyWebUrl, '_blank');
  }
}











}





