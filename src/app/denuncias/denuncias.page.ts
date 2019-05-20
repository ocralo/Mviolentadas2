/** Se importan todos los componentes de ionic que vamos a utilizar en esta pagina */
import { Component, OnInit } from '@angular/core';//nucleo de ionic
import { CallNumber } from '@ionic-native/call-number/ngx';//componente de ionic para hacer llamadas
import { AlertController, MenuController, ToastController } from "@ionic/angular";// componente para hacer mensajes de alerta
import {ActivatedRoute} from '@angular/router'
import * as firebase from 'firebase';
import { UserService } from '../user.service'; 
import { Geolocation } from '@ionic-native/geolocation/ngx';
import { EmailComposer } from '@ionic-native/email-composer/ngx';
import { SMS } from '@ionic-native/sms/ngx';




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
  constructor(
    private call: CallNumber, 
    public alertController: AlertController, 
    private activateRoute: ActivatedRoute, 
    private menuCtrl:MenuController,
    private us:UserService,
    private geo:Geolocation,
    private email:EmailComposer,
    private sms: SMS,
    private toastController: ToastController,
    ) { 
  }
 /** Terminar alerta de llamadas */
 public async TerminarCall(){
  try {
  const personRef: firebase.database.Reference = firebase.database().ref(`/usuarios/` + this.argumento);
  /* metodo que cambia el estado de la persona a true en la base de datos de firebase */
  await personRef.set(
    {estado:false}
  );
  const alert = await this.alertController.create({//si no se puede realizar llamadas que muestre la alerta
    header: "ALERTA",
    subHeader: "La alerta ha terminado",
    message: "puedes seguir utilizando la aplicacion",
    buttons: ["OK"]
  });
  await alert.present();
} catch (e) {
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
/** metodo de llamadas sacado de la documentacion de ionic */
  public async Llamadas(): Promise<any>{

    
     try {
         await this.call.callNumber('3128662953', true);//se conecta con la llamadas del telefono
          /* se crea la variable para inicializar la base de datos con la persona que inicio en la aplicacion */
       const personRef: firebase.database.Reference = firebase.database().ref(`/usuarios/` + this.argumento);
       /* metodo que cambia el estado de la persona a true en la base de datos de firebase */
       await personRef.set(
         {estado:true}
       );
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
  
  /* metodo que se inicializa apenas incia la ventana */
  async ngOnInit() {
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
  /** Encuentra la localizacion de la persona */
  Panic(){
    this.geo.getCurrentPosition().then((resp) => {
      var lat = resp.coords.latitude;
      var long =resp.coords.longitude;
      var acu=resp.coords.accuracy;
      console.log(resp.coords.latitude);
      console.log(resp.coords.longitude);
      console.log(resp.coords.accuracy);
      this.sendmail(lat, long, acu);
     }).catch((error) => {
       console.log('Error getting location', error);
     });
     
  }
  async sendmail(lat,long,acu){
    var options = {
      replaceLineBreaks: false, // true to replace \n by a new line, false by default
      android: {
          intent: 'INTENT'  // send SMS with the native android SMS messaging
          //intent: '' // send SMS without opening any other app
      }
    };
    var sendmsms = await this.sms.send('3004824680','Se ha activado el boton de panico de ' + this.us.getName()
    +'la ubicacion es: https://maps.google.com/?q='+lat+','+long+'',options);

    if(sendmsms){
    const toast = await this.toastController.create({
      message: "Mensaje enviado",
      duration: 1000
    });
    toast.present();
  }
  if(!sendmsms){
    const toast = await this.toastController.create({
      message: "El mensaje no se pudo enviar",
      duration: 1000
    });
    toast.present();
  }
    /*let emailBody = {
      to: 'afrgmt@gmail.com',
      cc: 'Ocralo@gmail.com',
      bcc: ['carestrepo0528@gmail.com'],
      subject: 'Se ha activado el boton de panico de ' + this.us.getName(),
      body: 'la ubicacion es: https://maps.google.com/?q='+lat+','+long+'',
      isHtml: true,
    }
    this.email.addAlias('gmail', 'com.google.android.gm');
    var sendemail= await this.email.open({
      app:'gmail',
      to: 'afrgmt@gmail.com',
      cc: 'Ocralo@gmail.com',
      bcc: ['carestrepo0528@gmail.com'],
      subject: 'Se ha activado el boton de panico de ' + this.us.getName(),
      body: 'la ubicacion es: https://maps.google.com/?q='+lat+','+long+'',
      isHtml: true,
    });
    if(sendemail){
      console.log("se envio el correo");
    }*/
  }
//muestra el menu de la barra superior ya que en el login este se debe quitar
ionViewWillEnter() {
  this.menuCtrl.enable(true);
}
}
