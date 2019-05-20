/** Se importan todos los componentes de ionic que vamos a utilizar en esta pagina */
import { Component, OnInit } from '@angular/core';//nucleo de ionic
import { CallNumber } from '@ionic-native/call-number/ngx';//componente de ionic para hacer llamadas
import { AlertController} from "@ionic/angular";// componente para hacer mensajes de alerta


@Component({
  selector: 'app-denuncias',
  templateUrl: './denuncias.page.html',
  styleUrls: ['./denuncias.page.scss'],
})
export class DenunciasPage implements OnInit {
/** se coloca en el constructor los metodos de los componentes que vamos a utilizar en este caso el componente
 * de hacer llamadas y el de mostrar alertas
 */
  constructor(private call: CallNumber, public alertController: AlertController) { }

/** metodo de llamadas sacado de la documentacion de ionic */
  async Llamadas(): Promise<any>{

    
     try {
         await this.call.callNumber('3128662953', true);//se conecta con la llamadas del telefono
     } catch(e){
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
  ngOnInit() {
  }

}
