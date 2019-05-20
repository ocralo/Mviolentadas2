import { Component, OnInit } from '@angular/core';
import { NavController, MenuController, AlertController } from '@ionic/angular';
import { AngularFireAuth } from "angularfire2/auth";
import { UserService } from '../user.service';
import { CallNumber } from '@ionic-native/call-number/ngx';//componente de ionic para hacer llamadas
import * as firebase from 'firebase';



@Component({
selector: 'app-home',
templateUrl: 'home.page.html',
styleUrls: ['home.page.scss'],
})
export class HomePage implements OnInit {
    argumento = null;
    personRef: firebase.database.Reference = firebase.database().ref(`/usuarios/` + this.argumento);
    constructor(
        private nvctrl:NavController, 
        private menuCtrl:MenuController,
        private afAuth: AngularFireAuth,
        private us:UserService,
        private call:CallNumber,
        private alertController: AlertController,
        ) { }
/** metodo de llamadas sacado de la documentacion de ionic */
public async Llamadas(): Promise<any>{

    
    try {
        await this.call.callNumber('3128662953', true);//se conecta con la llamadas del telefono
    } catch (e) {
     this.argumento = this.us.getName();
      /* se crea la variable para inicializar la base de datos con la persona que inicio en la aplicacion */
      const personRef: firebase.database.Reference = firebase.database().ref(`/usuarios/` + this.argumento);
      /* metodo que cambia el estado de la persona a true en la base de datos de firebase */
      await personRef.set(
        {estado:true}
      );
      const alert = await this.alertController.create({//si no se puede realizar llamadas que muestre la alerta
        header: "OH-OH",
        subHeader: "No se ha podido llamar",
        message: "",
        buttons: ["OK"]
      });
      await alert.present();
        console.error(e); 
    }
 }
async ngOnInit(){
    this.argumento = this.us.getName();
  /* se crea la variable para inicializar la base de datos con la persona que inicio en la aplicacion */
    const personRef: firebase.database.Reference = firebase.database().ref(`/usuarios/` + this.argumento);
    /* metodo que detecta el cambio de un dato en el estado */
    await personRef.on('value', personSnapshot => {
      var myPerson = personSnapshot.val();

      if (myPerson.estado == true) {
        this.Llamadas();
        console.log("gg");
      }
    });
    console.log(this.us.getName());
}
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


