import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: 'home',
    loadComponent: () => import('./home/home.page').then((m) => m.HomePage),
  },
  {
    path: '',
    redirectTo: 'home',
    pathMatch: 'full',
  },
  {
    path: 'menu',
    loadComponent: () => import('./menu/menu.page').then( m => m.MenuPage)
  },
  
  // {
  //   path: 'input',
  //   loadComponent: () => import('./input/input.page').then( m => m.InputPage)
  // },
  {
    path: 'info/:id',
    loadComponent: () => import('./info/info.page').then( m => m.InfoPage)
  },
  {
    path: 'about/:id',
    loadComponent: () => import('./about/about.page').then( m => m.AboutPage)
  },
  {
    path: 'details/:id',
    loadComponent: () => import('./details/details.page').then( m => m.DetailsPage)
  },
  {
    path: 'login',
    loadComponent: () => import('./login/login.page').then( m => m.LoginPage)
  },
  {
    path: 'playlist',
    loadComponent: () => import('./playlist/playlist.page').then( m => m.PlaylistPage)
  },
  {
    path: 'display/:id',
    loadComponent: () => import('./display/display.page').then( m => m.DisplayPage)
  },
  {
    path: 'signup',
    loadComponent: () => import('./signup/signup.page').then( m => m.SignupPage)
  },
  {
    path: 'confirm',
    loadComponent: () => import('./confirm/confirm.page').then( m => m.ConfirmPage)
  },
  {
    path: 'profile',
    loadComponent: () => import('./profile/profile.page').then( m => m.ProfilePage)
  },
  {
    path: 'editpage',
    loadComponent: () => import('./editpage/editpage.page').then( m => m.EditpagePage)
  },
  {
    path: 'show-item',
    loadComponent: () => import('./show-item/show-item.page').then( m => m.ShowItemPage)
  },
  {
    path: 'recommended',
    loadComponent: () => import('./recommended/recommended.page').then( m => m.RecommendedPage)
  },
  {
    path: 'showplaylist',
    loadComponent: () => import('./showplaylist/showplaylist.page').then( m => m.ShowplaylistPage)
  },
  {
    path: 'downloads',
    loadComponent: () => import('./downloads/downloads.page').then( m => m.DownloadsPage)
  },
  {
    path: 'audio',
    loadComponent: () => import('./audio/audio.page').then( m => m.AudioPage)
  },
  {
    path: 'try',
    loadComponent: () => import('./try/try.page').then( m => m.TryPage)
  }

];
