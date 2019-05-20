import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: '',
    redirectTo: 'login',
    pathMatch: 'full'
  },
  {
    path: 'home',
    loadChildren: './home/home.module#HomePageModule'
  },
  {
    path: 'list',
    loadChildren: './list/list.module#ListPageModule'
  },
  { 
    path: 'info',
    loadChildren: './info/info.module#InfoPageModule' 
  },
  { 
    path: 'login', 
    loadChildren: './login/login.module#LoginPageModule' 
  },
  { 
    path: 'denuncias', 
    loadChildren: './denuncias/denuncias.module#DenunciasPageModule' 
  },
  { 
    path: 'network', 
    loadChildren: './network/network.module#NetworkPageModule'
   },
  {
     path: 'network-instagram',
      loadChildren: './network-instagram/network-instagram.module#NetworkInstagramPageModule'
    },
  { 
    path: 'network-twitter', 
    loadChildren: './network-twitter/network-twitter.module#NetworkTwitterPageModule' 
  },
  { 
    path: 'register', 
    loadChildren: './register/register.module#RegisterPageModule' 
  },




 

];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule {}
