import { Component, ViewChild } from '@angular/core';
import { NavController, NavParams, ViewController } from 'ionic-angular';
import { ToastController, LoadingController, AlertController, ModalController, Events } from 'ionic-angular';
import { DataProvider } from '../../providers/data/data';
import { CompleteTestService } from '../../providers/complete-test-service/complete-test-service';
// // import { Keyboard } from '@ionic-native/keyboard';
import 'rxjs/add/operator/map';
// import { MedicationdetailsPage } from "../medicationdetails/medicationdetails";
// import {VidConsultPage} from "../vid-consult/vid-consult";
// import {VideoconsultdetailsPage} from "../videoconsultdetails/videoconsultdetails";
// import {HomeSearchPage} from "../home-search/home-search";
// import {HomecaredetailsPage} from "../homecaredetails/homecaredetails";
import { ReferPage } from '../refer/refer';

@Component({
  selector: 'page-referpatientlists',
  templateUrl: 'referpatientlists.html',
})
export class ReferpatientlistsPage {
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
  homecare_details: any = [];
  content: any = [];
  rowid: any;
  appointmentType: any;
  doctor_id: string;

  constructor(
    // private keyboard: Keyboard,
    public navCtrl: NavController, public navParams: NavParams, public completeTestService: CompleteTestService, public data: DataProvider, public loadingCtrl: LoadingController, public alertCtrl: AlertController, public modalCtrl: ModalController, public viewCtrl: ViewController, public events: Events) {

    this.get_referpatients_records();

    events.subscribe('ReferpatientlistsPage:refreshpage', () => {
      this.get_referpatients_records();
    });


  }


  get_referpatients_records() {
    let loading = this.loadingCtrl.create({
      content: 'Please wait...'
    });

    loading.present();
    setTimeout(() => {

      // console.log("We are in Home Care Consult Appointments History page");
      this.from_login = this.navParams.get('value');

      this.from_login2 = this.navParams.get('pers_value');
      this.from_login3 = this.navParams.get('doc_value');
      this.appointmentType = this.navParams.get("appointmentType");
      this.doctor_id = this.navParams.get("doctor_id");
      // console.log('VALUE IN TABS CONSTRUCTOR IS' + this.from_login);

      if (this.from_login) {

        this.body = Array.of(this.from_login);

        this.jsonBody = JSON.parse(this.body);

        if (this.jsonBody[0]) {
          if (this.jsonBody[0].id) {
            this.requester_id1 = this.jsonBody[0].id;
            // this.check = this.jsonBody[0];

            this.params = {
              "requester_id": this.requester_id1,
              "appointment_type_id": this.appointmentType
            }

            this.newparams = JSON.stringify(this.params);

            console.log("New params " + this.newparams);
          }
        }

      }

      if (this.doctor_id) {
        this.getpatientsreferred(this.doctor_id);
      } else {
        loading.dismiss();
      }

      loading.dismiss();
    }, 1);//}, 5000);
  }

  closeModal() {
    this.viewCtrl.dismiss();
  }

  referpatient() {

    let modal = this.modalCtrl.create(ReferPage, {
      doctor_id: this.doctor_id
    });

    modal.present();
  }

  getpatientsreferred(doctor_id) {

    if (doctor_id) {

      let loading = this.loadingCtrl.create({
        content: 'Please wait...'
      });

      loading.present();
      setTimeout(() => {

        console.log("Show doctor_id = " + doctor_id);

        this.jsonBody = JSON.parse(doctor_id);
        this.data.get_patients_referred(this.jsonBody)
          .then(result => {
            loading.dismiss();
            // this.contacts = result;
            console.log("patient_params THIS IS THE RESULT" + result);
            var jsonBody = result["_body"];
            console.log(jsonBody);

            jsonBody = JSON.parse(jsonBody);
            console.log(jsonBody)

            this.check = jsonBody;
            console.log("patient_params RESULTS IS " + this.check);
            this.body = Array.of(this.check);

            console.log("--------------------------------------------")
            console.log("-------------------WHats is the value check-------------------------")
            console.log(this.check)
            console.log("--------------------------------------------")
          }, (err) => {
            console.log(JSON.stringify(err));
          });

      }, 1);
    }



  }


}
