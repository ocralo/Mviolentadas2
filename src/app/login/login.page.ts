import { Component, OnInit } from "@angular/core";
import {
  ToastController, //componente para mostrar mensajes emergentes
  NavController,
  AlertController,
  Platform, //componente para plataformas android o ios
  MenuController
} from "@ionic/angular";
import { User } from "../modules/user"; //componente de ususario para firebase
import { AngularFireAuth } from "angularfire2/auth"; //autenticacion con firebasse
import { auth } from "firebase/app"; //componentes de firebase
import { GooglePlus } from "@ionic-native/google-plus/ngx"; //componente de google para iniciar seccion con google

@Component({
  selector: "app-login",
  templateUrl: "./login.page.html",
  styleUrls: ["./login.page.scss"]
})
export class LoginPage implements OnInit {
  user = {} as User;
/** Se coloca en el constructor todos los componentes ya que vamos a utilizar sus metodos */
  constructor(
    private afAuth: AngularFireAuth,
    public toastController: ToastController,
    public navCtrl: NavController,
    public alertController: AlertController,
    public gplus: GooglePlus,
    public platform: Platform,
    private menuCtrl: MenuController
  ) {}
  /** Inicio de seccion con firebase y sus respectivos mensajes de alerta si los datos estan erroneos */
  async Login() {
    if (this.user.email == null || this.user.password == null) { //validacion si no ha ingresado ningun dato
      const alert = await this.alertController.create({
        header: "OH-OH",
        subHeader: "Datos incorrectos",
        message: "Al parecer no has ingresado ningun dato",
        buttons: ["OK"]
      });
      await alert.present();
    }

    try {
      this.afAuth.auth
        .signInWithEmailAndPassword(this.user.email, this.user.password) //metodo de datos correctos
        .then(async (res: any) => {
          if (res) {
            this.navCtrl.navigateRoot("/home");
            const toast = await this.toastController.create({
              message: "Bienvenido",
              duration: 1000
            });
            toast.present();
          }
        })
        .catch(async (error: any) => {
          const alert = await this.alertController.create({ //capturar si los datos estan incorrectos y mostrar mensaje de datos erroneos
            header: "OH-OH",
            subHeader: "Datos incorrectos",
            message: "El usuario o la contraseña estan incorrectos",
            buttons: ["OK"]
          });
          await alert.present();
          console.error(error);
        });
    } catch (e) {
      const alert = await this.alertController.create({
        header: "Oh-OH",
        subHeader: "Datos incorrectos",
        message: "El usuario o la contraseña estan incorrectos",
        buttons: ["OK"]
      });
      console.error(e);
    }
  }
  async Register() { // ventana para registrarse en la aplicacion
    const toast = await this.toastController.create({
      message: "Registrate",
      duration: 1000
    });
    toast.present();
    //this.navCtrl.push('RegistrerPage');
  }
  LoginGoogle() { // ingreso con google
    this.afAuth.auth
      .signInWithPopup(new auth.GoogleAuthProvider()) //datos correctos
      .then(async (res: any) => {
        if (res) {
          this.navCtrl.navigateRoot("/home");
          const toast = await this.toastController.create({
            message: "Bienvenido",
            duration: 1000
          });
          toast.present();
        }
      })
      .catch(async (error: any) => {
        const alert = await this.alertController.create({ //datos incorrectos
          header: "OH-OH",
          subHeader: "Datos incorrectos",
          message: "El usuario o la contraseña estan incorrectos",
          buttons: ["OK"]
        });
        await alert.present();
        console.error(error);
      });
  }

  async nativeGoogleLogin() { // configuracion de google autenticar la aplicacion con un id del cliente en google console
    const gplusUser = await this.gplus.login({
      webClientId:
        "436211545918-rfcgvhu3t3574vnu7e3kgiai6hem801p.apps.googleusercontent.com",
      offline: true,
      scopes: "profile email"
    });
    this.afAuth.auth
      .signInWithCredential(
        auth.GoogleAuthProvider.credential(gplusUser.idToken)
      )
      .then(async (res: any) => {
        if (res) {
          this.navCtrl.navigateRoot("/home");
          const toast = await this.toastController.create({
            message: "Bienvenido",
            duration: 1000
          });
          toast.present();
        }
      })
      .catch(async (error: any) => {
        const alert = await this.alertController.create({
          header: "OH-OH",
          subHeader: "Datos incorrectos",
          message: "El usuario o la contraseña estan incorrectos",
          buttons: ["OK"]
        });
        await alert.present();
        console.error(error);
      });
  }

  googleLogin() {
    if (this.platform.is("cordova")) {
      this.nativeGoogleLogin();
    } else {
      this.LoginGoogle();
    }
  }

  signOut() { //al salir rompe los datos de google
    this.afAuth.auth.signOut();
  }

  ngOnInit() {
  }
  ionViewWillEnter() {
    this.menuCtrl.enable(false);
  }
}
