import { Component, ViewChild } from '@angular/core';
import { NavController, NavParams, ViewController } from 'ionic-angular';
import { ToastController, LoadingController, AlertController, ModalController, Events } from 'ionic-angular';
import { DataProvider } from '../../providers/data/data';
import { CompleteTestService } from '../../providers/complete-test-service/complete-test-service';

import 'rxjs/add/operator/map';

import { HomeSearchPage } from "../home-search/home-search";
import { DocgeneralappointmentDetailsPage } from '../docgeneralappointmentdetails/docgeneralappointmentdetails';
import { PersonaldoctorserviceappointmentsPage } from '../personaldoctorserviceappointments/personaldoctorserviceappointments';
import { Storage } from '@ionic/storage';

@Component({
  selector: 'page-personaldoctorserviceappointmentlists',
  templateUrl: 'personaldoctorserviceappointmentlists.html',
})
export class PersonaldoctorserviceappointmentlistsPage {
  @ViewChild('searchbar') myInput;
  @ViewChild('input')
  // searchbar: any;

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
  pds_appointments: any = [];
  content: any = [];
  rowid: any;
  appointmentType: any;
  pds_appoint_details: any;
  doctor_id: string;

  constructor(
    
    public navCtrl: NavController, public navParams: NavParams, public completeTestService: CompleteTestService, public data: DataProvider, public loadingCtrl: LoadingController, public alertCtrl: AlertController, public modalCtrl: ModalController, public viewCtrl: ViewController, public toastCtrl: ToastController, public storage: Storage, public events: Events) {

    this.get_gen_pds_records();

    events.subscribe('personaldoctorserviceappointmentlists:refreshpage', () => {
      this.event_get_gen_pds_records();
    });

  }

  ionViewWillEnter() {
    this.get_gen_pds_records();
  }



  get_gen_pds_records() {
    this.from_login = this.navParams.get('value');

    this.from_login2 = this.navParams.get('pers_value');
    this.from_login3 = this.navParams.get('doc_value');
    this.appointmentType = this.navParams.get("appointmentType");
    

    if (this.doctor_id) {
      this.getgeneralpdsappointments(this.doctor_id);
    } else {
      this.storage.get('doctor_id').then((doctor_id) => {
        this.doctor_id = doctor_id;
        console.log(' Docgeneralpdsappointmentlists page doctor_id = ' + doctor_id);

        this.getgeneralpdsappointments(this.doctor_id);
      });
    }


  }

  event_get_gen_pds_records() {
    this.from_login = this.navParams.get('value');

    this.from_login2 = this.navParams.get('pers_value');
    this.from_login3 = this.navParams.get('doc_value');
    this.appointmentType = this.navParams.get("appointmentType");
    // console.log('VALUE IN TABS CONSTRUCTOR IS' + this.from_login);

    if (this.doctor_id) {
      this.event_getgeneralpdsappointments(this.doctor_id);
    } else {
      this.storage.get('doctor_id').then((doctor_id) => {
        this.doctor_id = doctor_id;
        console.log(' Docgeneralpdsappointmentlists page doctor_id = ' + doctor_id);

        this.event_getgeneralpdsappointments(this.doctor_id);
      });
    }


  }

  closeModal() {
    this.viewCtrl.dismiss();
  }

  accept_pds_appt(appt_id) {
    //make request to accept pds appt with id= appt_id
    this.showalertmessage("Ghinger", "This action cannot be taken at the moment.");

    //the desired action: show this prompt: You are about to accept the selected appointment, do you want to continue?
  }

  decline_pds_appt(appt_id) {
    //make request to decline pds appt with id= appt_id
    this.showalertmessage("Ghinger", "This action cannot be taken at the moment.");
  }

  getgeneralpdsappointments(data) {

    if (data) {

      let loading = this.loadingCtrl.create({
        content: 'Please wait...'
      });

      loading.present();
      setTimeout(() => {

        this.data.get_new_personaldoctorserviceappointments(data)
          .then(result => {
            console.log(result);
            var jsonBody = result["_body"];
            jsonBody = JSON.parse(jsonBody);
            this.pds_appoint_details = jsonBody;
            loading.dismiss();

            console.log("Jsson body " + jsonBody);
          }, (err) => {

            loading.dismiss();
            this.showalertmessage("Ghinger", "Please ensure all details provided are correct.");
            this.toastCtrl.create({
              message: "Please ensure all details provided are correct.",
              duration: 5000
            }).present();
            // loader.dismiss();
            console.log("error = " + JSON.stringify(err));
          });

      }, 1);
    }

  }



  event_getgeneralpdsappointments(data) {

    if (data) {

      setTimeout(() => {

        this.data.get_new_personaldoctorserviceappointments(data)
          .then(result => {
            console.log(result);
            var jsonBody = result["_body"];
            jsonBody = JSON.parse(jsonBody);
            this.pds_appoint_details = jsonBody;

            console.log("Jsson body " + jsonBody);
          }, (err) => {

            this.showalertmessage("Ghinger", "Please ensure all details provided are correct.");
            this.toastCtrl.create({
              message: "Please ensure all details provided are correct.",
              duration: 5000
            }).present();
            // loader.dismiss();
            console.log("error = " + JSON.stringify(err));
          });

      }, 1);
    }

  }

  doRefresh(refresher) {
    // console.log('Begin async operation', refresher);

    setTimeout(() => {
      if (this.doctor_id) {
        this.getgeneralpdsappointments(this.doctor_id);
      } else {
        this.storage.get('doctor_id').then((doctor_id) => {
          this.doctor_id = doctor_id;
          console.log(' Docgeneralpdsappointmentlists page doctor_id = ' + doctor_id);

          this.getgeneralpdsappointments(this.doctor_id);
          this.events.publish('doc_total_new_appoint_counter:refreshpage');
          this.events.publish('doc_new_appoint_counter:refreshpage');
          this.events.publish('docgeneralappointmentlists:refreshpage');
        });
      }
      refresher.complete();
    }, 1);
  }


  pds_appointment_history_details(gen_appoint_history_id, appointmentType) {
    this.navCtrl.push(DocgeneralappointmentDetailsPage, { value: this.from_login, doc_value: this.from_login_doc, pers_value: this.from_login_pers, gen_appoint_history_id: gen_appoint_history_id, appointmentType: appointmentType });
    // rowid: rowid
  }

  pds_appt_details(pds_appt_detail) {

    this.navCtrl.push(PersonaldoctorserviceappointmentsPage, { pds_appt_detail: pds_appt_detail });

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
