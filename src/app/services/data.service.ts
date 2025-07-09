import { effect, inject, Injectable, OnInit, signal } from '@angular/core';
import { collection, doc, addDoc, Firestore, getDoc, getDocs, updateDoc, setDoc, deleteDoc } from '@angular/fire/firestore';
import { Router } from '@angular/router';
import { runTransaction } from "firebase/firestore";
import { Capacitor } from '@capacitor/core';
import { Browser } from '@capacitor/browser';

@Injectable({
  providedIn: 'root'
})
export class DataService implements OnInit {

  router = inject(Router)
  db = inject(Firestore)
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




  constructor() {


  }
  async ngOnInit() {
  }

  async getPlaylists() {
    const dataRef = collection(this.db, "playlist");
    const querysnapshot = await getDocs(dataRef);
    const docsData: any[] = [];
    querysnapshot.forEach((doc) => {
      docsData.push(doc.data());

      this.playlists.set(docsData.slice(0, 6));
      console.log(this.playlists())
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
  async getPLaysong() {
    const dataref = collection(this.db, 'play');
    const queshot = await getDocs(dataref);
    const arr: any[] = [];
    queshot.forEach((doc) => {
      arr.push(doc.data());
    })
    this.playSong.set(arr);
    console.log(this.playSong())

  }

  async getSingleData(id: any) {
    const docRef = doc(this.db, 'playlist', id)
    const querysnapshot = (await getDoc(docRef)).data()
    return querysnapshot
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
  async deletePlaylist(id: string) {
    console.log(id)
    await deleteDoc(doc(this.db, 'AddPlay', id))
  }
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




  async addToPlay(data: any) {
    const reference = doc(this.db, 'AddPlay', data.id)
    await setDoc(reference, {
      name: data.artist,
      image: data.image,
      song: data.song,
      id: data.id
    }
    )
    this.getAddSong()
  }
  

  async getAddSong() {

    const dataref = collection(this.db, 'AddPlay')
    const queshot = await getDocs(dataref)
    const arr: any[] = [];
    queshot.forEach((doc) => {
      arr.push(doc.data())
    })
    this.showplay.set(arr)

   
    this.counter.set(arr.length)
    this.updateToPlaylist()
  
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





