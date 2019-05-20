import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: '',
    redirectTo: 'login',
    pathMatch: 'full'
  },
  {
    path: 'home/:id',
    loadChildren: './home/home.module#HomePageModule'
  },
  {
    path: 'list/:id',
    loadChildren: './list/list.module#ListPageModule'
  },
  { 
    path: 'info/:id',
    loadChildren: './info/info.module#InfoPageModule' 
  },
  { 
    path: 'login', 
    loadChildren: './login/login.module#LoginPageModule' 
  },
  { 
    path: 'denuncias/:id', 
    loadChildren: './denuncias/denuncias.module#DenunciasPageModule' 
  },
  { 
    path: 'network/:id', 
    loadChildren: './network/network.module#NetworkPageModule'
   },

 

];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule {}
