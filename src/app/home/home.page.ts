import { Component } from '@angular/core';
import { NavController, MenuController } from '@ionic/angular';
import { AngularFireAuth } from "angularfire2/auth"; 



@Component({
selector: 'app-home',
templateUrl: 'home.page.html',
styleUrls: ['home.page.scss'],
})
export class HomePage {

    constructor(
        private nvctrl:NavController, 
        private menuCtrl:MenuController,
        private afAuth: AngularFireAuth,) { }
/** Metodos de navegacion hacia las otras paginas */

info(){
    this.nvctrl.navigateRoot('/info');
}
complaints(){
    this.nvctrl.navigateRoot('/denuncias');
    //this.nvctrl.navigateForward('/denuncias/' + res.user.email.split("@")[0]);
    
}
Networks(){
    this.nvctrl.navigateRoot('/list');
}
//muestra el menu de la barra superior ya que en el login este se debe quitar
ionViewWillEnter() {
    this.menuCtrl.enable(true);
  }
}


