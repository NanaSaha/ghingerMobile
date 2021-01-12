import { Component } from '@angular/core';
import { NavController, NavParams, ViewController } from 'ionic-angular';
import { ToastController, LoadingController, AlertController, ModalController } from 'ionic-angular';
import { DataProvider } from '../../providers/data/data';

import { Http } from '@angular/http';
// // import { Keyboard } from '@ionic-native/keyboard';
import 'rxjs/add/operator/map';

import { AddRegisPage } from '../add-regis/add-regis';
import { PhoneConsListPage } from '../phone-cons-list/phone-cons-list';
import { VideoConsListPage } from '../video-cons-list/video-cons-list';
import { PrescriptionConsListPage } from '../prescription-cons-list/prescription-cons-list';
import { HomeConsListPage } from '../home-cons-list/home-cons-list';
import { DocpagePersonalPage } from '../docpage-personal/docpage-personal';


@Component({
  selector: 'page-accepted-app',
  templateUrl: 'accepted-app.html',
})
export class AcceptedAppPage {
  from_login: any = [];
  messageList: any;
  api_code: any;
  location: any;
  displayData: any;
  check: any;
  from_menu: any = [];
  body: any;
  jsonBody: any;
  params: any = [];

  doctor_id: any;
  data1: any = [];


  constructor(public toastCtrl: ToastController, public navCtrl: NavController, public navParams: NavParams, public data: DataProvider, public loadingCtrl: LoadingController, public alertCtrl: AlertController, public modalCtrl: ModalController, public viewCtrl: ViewController) {
    this.from_login = this.navParams.get('value')
    console.log('VALUE IN ACCEPTED APPOINTMENT CONSTRUCTOR IS' + this.from_login); 


        this.jsonBody = JSON.parse(this.from_login);
        this.doctor_id = this.jsonBody[0].id
        console.log("LETS SEE THE DOCTOR ID " + this.doctor_id)
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad AcceptedAppPage');
  }


  

  phone(){

    this.params = {
      
     
      "id": this.doctor_id,
     
    }

     console.log("LETS SEE ALL THE PARAMS " + JSON.stringify(this.params) )

      console.log("LETS SEE ALL THE PARAMS " + JSON.stringify(this.params) )


      let loader = this.loadingCtrl.create({
        content: "Please wait ..."

      });

    loader.present();

    this.data.retrieve_phone_consult(this.params).then((result) => {

      console.log("THIS IS THE RESULT" + result);
      var jsonBody = result["_body"];
      console.log(jsonBody);

      jsonBody = JSON.parse(jsonBody);
      console.log(jsonBody)

      this.check = jsonBody
      console.log("RESULTS IS " + this.check);
      this.body = Array.of(this.check)

      console.log("--------------------------------------------")
      console.log("-------------------WHats is the value check-------------------------")
      console.log(this.check)
      console.log("--------------------------------------------")

      var desc = jsonBody["resp_desc"];
      var code = jsonBody["resp_code"];


      console.log(desc);
      console.log(code);

      this.messageList = desc;
      this.api_code = code;

      loader.dismiss(); 
        this.navCtrl.push(PhoneConsListPage, { 'value': this.check , 'doc_details': this.from_login});
     


      if (this.api_code == "119") {
        let alert = this.alertCtrl.create({
          title: '',
          subTitle: this.messageList,
          buttons: ['OK']
        });

      
        alert.present();
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



 video(){

 this.params = {
      
     
      "id": this.doctor_id,
     
    }

     console.log("LETS SEE ALL THE PARAMS " + JSON.stringify(this.params) )

   console.log("LETS SEE ALL THE PARAMS " + JSON.stringify(this.params) )


      let loader = this.loadingCtrl.create({
      content: "Please wait ..."

    });

    loader.present();

    this.data.retrieve_video_consult(this.params).then((result) => {

      console.log("THIS IS THE RESULT" + result);
      var jsonBody = result["_body"];
      console.log(jsonBody);

      jsonBody = JSON.parse(jsonBody);
      console.log(jsonBody)

      this.check = jsonBody
      console.log("RESULTS IS " + this.check);
      this.body = Array.of(this.check)


      var desc = jsonBody["resp_desc"];
      var code = jsonBody["resp_code"];


      console.log(desc);
      console.log(code);

      this.messageList = desc;
      this.api_code = code;

      loader.dismiss(); 
        this.navCtrl.push(VideoConsListPage, { 'value': this.check });
     


      if (this.api_code == "119") {
        let alert = this.alertCtrl.create({
          title: '',
          subTitle: "No video consultations made",
          buttons: ['OK']
        });

      
        alert.present();
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



  home(){

 this.params = {
      
     
      "id": this.doctor_id,
     
    }

     console.log("LETS SEE ALL THE PARAMS " + JSON.stringify(this.params) )

   console.log("LETS SEE ALL THE PARAMS " + JSON.stringify(this.params) )


      let loader = this.loadingCtrl.create({
      content: "Please wait ..."

    });

    loader.present();

    this.data.retrieve_home_consult(this.params).then((result) => {

      console.log("THIS IS THE RESULT" + result);
      var jsonBody = result["_body"];
      console.log(jsonBody);

      jsonBody = JSON.parse(jsonBody);
      console.log(jsonBody)

      this.check = jsonBody
      console.log("RESULTS IS " + this.check);
      this.body = Array.of(this.check)


      var desc = jsonBody["resp_desc"];
      var code = jsonBody["resp_code"];


      console.log(desc);
      console.log(code);

      this.messageList = desc;
      this.api_code = code;

      loader.dismiss(); 
        this.navCtrl.push(HomeConsListPage, { 'value': this.check });
     


      if (this.api_code == "119") {
        let alert = this.alertCtrl.create({
          title: '',
          subTitle: "No Home Care appointments made",
          buttons: ['OK']
        });

      
        alert.present();
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


  prescription(){

 this.params = {
      
     
      "id": this.doctor_id,
     
    }

     console.log("LETS SEE ALL THE PARAMS " + JSON.stringify(this.params) )

   console.log("LETS SEE ALL THE PARAMS " + JSON.stringify(this.params) )


      let loader = this.loadingCtrl.create({
      content: "Please wait ..."

    });

    loader.present();

    this.data.prescription_list(this.params).then((result) => {

      console.log("THIS IS THE RESULT" + result);
      var jsonBody = result["_body"];
      console.log(jsonBody);

      jsonBody = JSON.parse(jsonBody);
      console.log(jsonBody)

      this.check = jsonBody
      console.log("RESULTS IS " + this.check);
      this.body = Array.of(this.check)


      var desc = jsonBody["resp_desc"];
      var code = jsonBody["resp_code"];


      console.log(desc);
      console.log(code);

      this.messageList = desc;
      this.api_code = code;

      loader.dismiss(); 
        this.navCtrl.push(PrescriptionConsListPage, { 'value': this.check });
     


      if (this.api_code == "119") {
        let alert = this.alertCtrl.create({
          title: '',
          subTitle: "No prescription requested by patients made",
          buttons: ['OK']
        });

      
        alert.present();
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








}
