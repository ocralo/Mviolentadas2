/** Se importan todos los componentes de ionic que vamos a utilizar en esta pagina */
import { Component, OnInit } from '@angular/core';//nucleo de ionic
import { CallNumber } from '@ionic-native/call-number/ngx';//componente de ionic para hacer llamadas
import { AlertController } from "@ionic/angular";// componente para hacer mensajes de alerta
import {ActivatedRoute} from '@angular/router'
import * as firebase from 'firebase';


@Component({
  selector: 'app-denuncias',
  templateUrl: './denuncias.page.html',
  styleUrls: ['./denuncias.page.scss'],
})
export class DenunciasPage implements OnInit {
  
  argumento = null;
  personRef: firebase.database.Reference = firebase.database().ref(`/usuarios/` + this.argumento);

/** se coloca en el constructor los metodos de los componentes que vamos a utilizar en este caso el componente
 * de hacer llamadas y el de mostrar alertas
 */
  constructor(private call: CallNumber, public alertController: AlertController, private activateRoute: ActivatedRoute) { 
  }


/** metodo de llamadas sacado de la documentacion de ionic */
  public async Llamadas(): Promise<any>{

    
     try {
         await this.call.callNumber('3128662953', true);//se conecta con la llamadas del telefono
     } catch (e) {
       
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
  
  /* metodo que se inicializa apenas incia la ventana */
  async ngOnInit() {
    this.argumento = this.activateRoute.snapshot.paramMap.get('id');
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
  }

}
