import { Component } from '@angular/core';
import { NavController, NavParams, App } from 'ionic-angular';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ToastController, LoadingController, AlertController, ActionSheetController, Platform, Loading } from 'ionic-angular';
import { DataProvider } from '../../providers/data/data';

import { Storage } from '@ionic/storage';
import { MenuPage } from '../menu/menu';
import { Http } from '@angular/http';
import 'rxjs/add/operator/map';


@Component({
  selector: 'page-feedback',
  templateUrl: 'feedback.html',
})
export class FeedbackPage {

  public feedbackForm: any;
  from_menu: any;
  feedbackVal: any;
  jsonBody: any;
  params: any;
  body: any;
  requester_id;
  first_name;
  surname;
  messageList: any;
  api_code: any;
  from_login2;
  from_login3


  constructor(public app: App, public actionSheetCtrl: ActionSheetController, public platform: Platform, public navCtrl: NavController, public data: DataProvider, public _form: FormBuilder, public toastCtrl: ToastController, public navParams: NavParams, public http: Http, public loadingCtrl: LoadingController, public alertCtrl: AlertController,public storage: Storage) {
    this.feedbackForm = this._form.group({

      "appointment_type": ["", Validators.compose([Validators.required])],    
      "message": ["", Validators.compose([Validators.required])],
      
      
    });

    this.from_menu = this.navParams.get('value')
    this.from_login2 = this.navParams.get('pers_value')
    this.from_login3 = this.navParams.get('doc_value')
    console.log ("FROM MENU " + this.from_menu)
    console.log ("FROM MENU " + JSON.stringify(this.from_menu))

    // this.jsonBody.proposed_date + " " + this.jsonBody.proposed_time)
    this.body = this.from_menu; // this.body = Array.of(this.from_login)

    this.jsonBody = this.body; // this.jsonBody = JSON.parse(this.body);
    this.requester_id = this.jsonBody[0].reg_id
    this.first_name = this.jsonBody[0].other_names
    this.surname = this.jsonBody[0].surname
    


  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad FeedbackPage');
  }


  send_feedback() {

    this.feedbackVal = JSON.stringify(this.feedbackForm.value);

    this.jsonBody = JSON.parse(this.feedbackVal);

    console.log("THIS IS THE Feedback raw values VALUES" + this.feedbackVal)
    console.log("THIS IS THE Feedback VALUES " + this.jsonBody)


    

    this.params = {
      
      "requester_id": this.requester_id,
      "requester_name": this.first_name + " " + this.surname,
      "appointment_type": this.jsonBody.appointment_type,
      "message": this.jsonBody.message,
      
    }

    console.log("this.params = " + JSON.stringify(this.params));

    let loader = this.loadingCtrl.create({
      content: "Please wait ..."

    });

    loader.present();


    this.data.send_feedback(this.params).then((result) => {

      console.log("THIS IS THE RESULT" + result);
      var jsonBody = result["_body"];
      console.log(jsonBody);

      jsonBody = JSON.parse(jsonBody);
      console.log(jsonBody)


      var desc = jsonBody["resp_desc"];
      var code = jsonBody["resp_code"];
     

      console.log(desc);
      console.log(code);

      this.messageList = desc;
      this.api_code = code;

      loader.dismiss();

      if (this.api_code == "000") {

          let alert = this.alertCtrl.create({
            title: "Feedback To Ghinger",
            subTitle: desc,
            buttons: [
              {
                text: 'OK', handler: () => {
                  this.navCtrl.setRoot(MenuPage, { value: this.from_menu, doc_value: this.from_login3, pers_value: this.from_login2 });
                }
              }
  
            ]
          });
          alert.present();
        }

      if (this.api_code != "000") {
        this.showmessage(this.messageList);
      }

    }, (err) => {
      loader.dismiss();
      this.toastCtrl.create({
        message: "Could not process this request successfully.",
        duration: 5000
      }).present();

      console.log(err);
    });
   }


    showmessage(message) {
    let alert = this.alertCtrl.create({
      title: "Feeback",
      subTitle: message,
      buttons: [
        {
          text: 'OK', handler: () => { }
        }

      ]
    });
    alert.present();
  }


}
