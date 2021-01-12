import { Component } from '@angular/core';
import { NavController, NavParams, ViewController } from 'ionic-angular';
import { ToastController, LoadingController, AlertController, ModalController } from 'ionic-angular';
import { DataProvider } from '../../providers/data/data';

import { Http } from '@angular/http';
// // import { Keyboard } from '@ionic-native/keyboard';
import 'rxjs/add/operator/map';

import { AddRegisPage } from '../add-regis/add-regis';
import { PdspatientdetailsPage } from '../pdspatientdetails/pdspatientdetails';
import { PatientDetailsPage } from '../patient-details/patient-details';


@Component({
  selector: 'page-accepted-app2',
  templateUrl: 'accepted-app2.html',
})
export class AcceptedApp2Page {

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
  patient_id: any;

  patient_params: any;
  no_data : any;

  constructor(public toastCtrl: ToastController, public navCtrl: NavController, public navParams: NavParams, public data: DataProvider, public loadingCtrl: LoadingController, public alertCtrl: AlertController, public modalCtrl: ModalController, public viewCtrl: ViewController) {

    this.from_login = this.navParams.get('value')

    this.getrecords();

    // view

  }

  ionViewWillEnter() {
    this.getrecords();
  }

  getrecords(){

    if (this.from_login) {
      console.log('VALUE IN ACCEPTED APPOINTMENT CONSTRUCTOR IS' + this.from_login);

      // this.jsonBody = JSON.parse(this.from_login);
      this.jsonBody = this.from_login;
      this.doctor_id = this.jsonBody[0].id
      console.log("LETS SEE THE DOCTOR ID " + this.doctor_id)

      this.params = {

        "id": this.doctor_id,

      }

      console.log("LETS SEE ALL THE PARAMS " + JSON.stringify(this.params));
      console.log("LETS SEE ALL THE PARAMS " + JSON.stringify(this.params));

      let loader = this.loadingCtrl.create({
        content: "Please wait ..."
      });

      loader.present();

      this.data.retrieve_accepted_appointment(this.params).then((result) => {

        console.log("THIS IS THE RESULT" + result);
        var jsonBody = result["_body"];
        console.log(jsonBody);

        jsonBody = JSON.parse(jsonBody);
        console.log(jsonBody)

        this.check = jsonBody
        console.log("RESULTS IS " + this.check);
        this.body = Array.of(this.check)

        console.log("--------------------------------------------")
        console.log("-------------------accepted-apps2.ts WHats is the value check-------------------------")
        console.log(this.check)
        console.log("--------------------------------------------")

        var desc = jsonBody["resp_desc"];
        var code = jsonBody["resp_code"];


        console.log(desc);
        console.log(code);

        this.messageList = desc;
        this.api_code = code;

        loader.dismiss();

        if (this.api_code == "119") {

          this.no_data = this.api_code;

        
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

  view(data_id) {

    
    this.navCtrl.push(PatientDetailsPage, { 'value': this.from_login  ,"user_data": this.from_login, "patient_id": data_id, "doctor_id": this.doctor_id })


  }



}
