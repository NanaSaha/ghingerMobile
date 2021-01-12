import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
// import { HomePage } from '../home/home';
// import { SignupPage } from '../signup/signup';
// import { MenuPage } from '../menu/menu';
// import { NoticePage } from '../notice/notice';
import { ToastController, LoadingController, AlertController } from 'ionic-angular';
import { DataProvider } from '../../providers/data/data';
import { Http } from '@angular/http';
// import { DoctorPage } from '../doctor/doctor';
import { FormBuilder, Validators } from '@angular/forms';
// import { DoctorHomePage } from '../doctorhome/doctorhome';
import { Storage } from '@ionic/storage';
import { ChangepasswordPage } from '../changepassword/changepassword';
// import moment from 'moment';

@Component({
  selector: 'page-resetcode',
  templateUrl: 'resetcode.html',
})
export class ResetcodePage {

  resetPasswordForm : any;
  params : any;
  reset_phone_number : any;

  constructor(public toastCtrl: ToastController, public data: DataProvider, public _form: FormBuilder, public loadingCtrl: LoadingController, public alertCtrl: AlertController, public navCtrl: NavController, public navParams: NavParams, public http: Http, public storage: Storage) {


    this.resetPasswordForm = this._form.group({

      "resetcode": ["", Validators.compose([Validators.required])],
    })


    this.storage.get('reset_phone_number').then((reset_phone_number) => {
      this.reset_phone_number = JSON.parse(reset_phone_number);
    });

  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad PasswordPage');
  }

  reset(){
    //send phone number to api in order to recieve sms code and proceed to the next page.

    this.params = {
      "phonenumber": this.reset_phone_number,
      "reset_token" : this.resetPasswordForm.value.resetcode
    }

    console.log("this.params = " + JSON.stringify(this.params));

    let loader = this.loadingCtrl.create({
      content: "Please wait ..."
    });
    loader.present();

    this.data.reset_password_get_smscode(this.params).then((result) => {

      if (result) {

        console.log("THIS IS THE RESULT" + result);
        var jsonBody = result["_body"];
        console.log(jsonBody);

        jsonBody = JSON.parse(jsonBody);
        console.log(jsonBody)


        var desc = jsonBody["resp_desc"];
        var code = jsonBody["resp_code"];

        this.storage.set("reset_sms_code",JSON.stringify(jsonBody["db_reset_token"]));

        console.log(desc);
        console.log(code);

        loader.dismiss();

        if (code == "000") {
          this.navCtrl.push(ChangepasswordPage);
        }else{
          this.showalertmessage("Ghinger",desc);
        }
      }


      // console.log(this.app.getRootNav());
      //this.alph = this.app.getRootNavs()

      //this.alph =  this.app.getRootNavById('n4')
      // this.alph[0].setRoot(MenuPage, { value: this.from_login,doc_value: this.from_login3,pers_value: this.from_login2 });

      //this.navCtrl.popToRoot()

    }, (err) => {
      loader.dismiss();
      this.toastCtrl.create({
        message: "Could not complete this request successfully.",
        duration: 5000
      }).present();

      console.log(err);
    });


  }

  showmessage(message) {
    let toast = this.toastCtrl.create({
      message: message,
      duration: 3000,
      position: 'top'
    });
    toast.present();
  }

  showalertmessage(titlemsg, mainmsg) {
    let alert = this.alertCtrl.create({
      title: titlemsg,
      subTitle: mainmsg,
      buttons: ['OK']
    });
    alert.present();
  }

}
