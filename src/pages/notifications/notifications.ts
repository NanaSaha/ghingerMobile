import { Component, ViewChild } from '@angular/core';
import { NavController, NavParams, ViewController } from 'ionic-angular';
import { ToastController, LoadingController, AlertController, ModalController } from 'ionic-angular';
import { DataProvider } from '../../providers/data/data';
import { CompleteTestService } from '../../providers/complete-test-service/complete-test-service';
import 'rxjs/add/operator/map';

import { Storage } from '@ionic/storage';

import { BilldetailsPage } from '../billdetails/billdetails';
import { MedappointmentdetailsPage } from '../medappointmentdetails/medappointmentdetails';
import { MedicationdetailsPage } from "../medicationdetails/medicationdetails";
import { LabdetailsPage } from "../labdetails/labdetails";
import {VidConsultPage} from "../vid-consult/vid-consult";
import {VideoconsultdetailsPage} from "../videoconsultdetails/videoconsultdetails";


@Component({
  selector: 'page-notifications',
  templateUrl: 'notifications.html',
})
export class NotificationsPage {
  messageList: any;
  api_code: any;
  location: any;
  displayData: any;
  check: any;
  from_menu: any = [];
  body: any;
  jsonBody: any;
  params: any = [];
  newparams: any;
  from_login: any = [];
  from_login2: any = [];
  from_login3: any = [];
  sub_id: any;
  string: any;

  requester_id1: any;
  from_login_doc: any = [];
  from_login_pers: any = [];
  body1: any;
  retrieve1: any;
  jsonBody1: any;

  body2: any;
  jsonBod2: any;

  person_details: any = [];
  person_details2: any = [];
  person_details3: any = [];
  content: any = [];

  medappointmentdetails = { id: '' };
  rowid: any;
  person_details_code: any;
  video_consult_details: any = [];
  
  overall_list: string = "Overall";

  constructor( public navCtrl: NavController, public navParams: NavParams, public completeTestService: CompleteTestService, public data: DataProvider, public loadingCtrl: LoadingController, public alertCtrl: AlertController, public modalCtrl: ModalController, public viewCtrl: ViewController,public storage: Storage) {
 
    console.log("We are in Medication Appointments History page");
    this.from_login = this.navParams.get('value');

    this.from_login2 = this.navParams.get('pers_value');
    this.from_login3 = this.navParams.get('doc_value');
    console.log('VALUE IN TABS CONSTRUCTOR IS' + this.from_login);

    this.body = this.from_login; //this.body = Array.of(this.from_login);

    this.jsonBody = this.body; // this.jsonBody = JSON.parse(this.body);

    console.log('JSON BODY IS' + this.jsonBody);
    this.requester_id1 = this.jsonBody[0].id;
    this.check = this.jsonBody[0];

    console.log('VALUE IN medication history IS' + this.from_login);
    console.log('VALUE of requester IN medication appointment history  IS ' + this.requester_id1);

    this.params = {
      "requester_id": this.requester_id1
    }

    this.newparams = JSON.stringify(this.params);

    console.log("New params " + this.newparams);


    this.getMedicationAppointmentHistory();
    this.getAppointmentHistory();
    this.getLabAppointmentHistory();
    this.getVideoConsultAppointmentHistory();
  }

  
  getMedicationAppointmentHistory() {

    let loading = this.loadingCtrl.create({
      content: 'Please wait...'
    });

    loading.present();

    setTimeout(() => {

    this.jsonBody = JSON.parse(this.newparams);

    this.data.getMedicationHistory(this.jsonBody)
      .then(result => {
        // this.contacts = result;
        console.log(result);

        var jsonBody = result["_body"];
        jsonBody = JSON.parse(jsonBody);
        
        if(this.jsonBody){
          this.person_details = jsonBody;
        }else{
          this.person_details = '0';
        }
        loading.dismiss();

        console.log("Jsson body " +jsonBody);
        console.log("Jsson body " + JSON.stringify(jsonBody));

      }, (err) => {

        loading.dismiss();
        this.showalertmessage("Sorry. An Error occured. Kindly refresh and try again.");
        console.log("error = " + JSON.stringify(err));
      });

    }, 1);

  }

  getAppointmentHistory() {
    let loading = this.loadingCtrl.create({
      content: 'Please wait...'
    });

    loading.present();

    setTimeout(() => {

    this.jsonBody = this.newparams;
    this.jsonBody = JSON.parse(this.newparams);
    this.data.med_appointment_history(this.jsonBody)
      .then(result => {

        console.log(result);

        var jsonBody = result["_body"];
        jsonBody = JSON.parse(jsonBody);
        this.person_details2 = jsonBody;
        this.person_details_code = JSON.stringify(this.person_details2.resp_code);
        
        console.log("Jsson body " + this.person_details_code);
        console.log("Person Details in Medical " + this.person_details2);
      });
      loading.dismiss();
    }, 1);
  }




  medical_appointment_history_details(medappointhistory) {

    this.navCtrl.push(MedappointmentdetailsPage, { value: this.from_login, doc_value: this.from_login_doc, pers_value: this.from_login_pers, medappointhistory: medappointhistory });

  }

  medication_appointment_history_details(medication_appoint_history) {
    console.log("in medication history page: rowid = "+ medication_appoint_history);

    this.navCtrl.push(MedicationdetailsPage, { value: this.from_login, doc_value: this.from_login_doc, pers_value: this.from_login_pers,medication_appoint_history: medication_appoint_history  });
    // rowid: rowid
  }

  getLabAppointmentHistory() {

    let loading = this.loadingCtrl.create({
      content: 'Please wait...'
    });

    loading.present();

    setTimeout(() => {

      this.jsonBody = JSON.parse(this.newparams);

      this.data.getLabAppointmentHistory(this.jsonBody)
        .then(result => {
          // this.contacts = result;
          console.log(result);

          var jsonBody = result["_body"];
          jsonBody = JSON.parse(jsonBody);
          this.person_details3 = jsonBody;
          //loading.dismiss();

          console.log("Jsson body " + jsonBody);
          console.log("Person Details in Lab " + this.person_details3);
        });
        loading.dismiss();

    }, 1);

  }

  lab_appointment_history_details(lab_appoint_history) {
    console.log("in lab history page: rowid = " + lab_appoint_history);

    this.navCtrl.push(LabdetailsPage, { value: this.from_login, doc_value: this.from_login3, pers_value: this.from_login2, lab_appoint_history: lab_appoint_history });
    // rowid: rowid
  }




  getVideoConsultAppointmentHistory() {

    let loading = this.loadingCtrl.create({
      content: 'Please wait...'
    });

    loading.present();

    setTimeout(() => {

    this.jsonBody = JSON.parse(this.newparams);

    this.data.getVideoConsultHistory(this.jsonBody)
      .then(result => {
        // this.contacts = result;
        console.log(result);

        var jsonBody = result["_body"];
        jsonBody = JSON.parse(jsonBody);
        this.video_consult_details = jsonBody;

        loading.dismiss();
        console.log("Jsson body " + JSON.stringify(jsonBody));
        // if()

        if (this.jsonBody.resp_code == "119") {
          let alert = this.alertCtrl.create({
            title: "Ghinger",
            subTitle: this.jsonBody.resp_desc,
            buttons: ['OK']
          });
          alert.present();
        }

        
      });

      

    }, 1);

  }


  video_appointment_history_details(video_consult_appoint_history_id,appointmentType) {
    // console.log("Video consult history detail this.appointmentType = "+appointmentType);
    this.navCtrl.push(VideoconsultdetailsPage, { value: this.from_login, doc_value: this.from_login_doc, pers_value: this.from_login_pers,video_consult_appoint_history_id: video_consult_appoint_history_id, appointmentType: appointmentType  });
    // rowid: rowid
  }


  public bill(data) {
    console.log(data);
    if (data) {
      this.storage.set("billdetails", JSON.stringify(data));
    } else {
        this.storage.set("billdetails", "empty");
    }
    this.navCtrl.push(BilldetailsPage, { value: this.from_login, doc_value: this.from_login_doc, pers_value: this.from_login_pers });
  }







  showalertmessage(mainmsg) {
    let alert = this.alertCtrl.create({
      title: "Ghinger Health Care",
      subTitle: mainmsg,
      buttons: ['OK']
    });
    alert.present();
  }

}
