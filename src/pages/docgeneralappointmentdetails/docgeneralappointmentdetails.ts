import { Component, ViewChild } from '@angular/core';
import { NavController, NavParams, ViewController, Events } from 'ionic-angular';
import { ToastController, LoadingController, AlertController, ModalController } from 'ionic-angular';
import { DataProvider } from '../../providers/data/data';
import { CompleteTestService } from '../../providers/complete-test-service/complete-test-service';
// // import { Keyboard } from '@ionic-native/keyboard';
import 'rxjs/add/operator/map';
import { MedicationdetailsPage } from "../medicationdetails/medicationdetails";
import { VidConsultPage } from "../vid-consult/vid-consult";
import { VideoconsultdetailsPage } from "../videoconsultdetails/videoconsultdetails";
import { HomeSearchPage } from "../home-search/home-search";
import { HomecaredetailsPage } from "../homecaredetails/homecaredetails";
import { PersonaldoctorserviceappointmentsDeclinePage } from '../personaldoctorserviceappointmentsdecline/personaldoctorserviceappointmentsdecline';
import { Storage } from '@ionic/storage';

@Component({
  selector: 'page-docgeneralappointmentdetails',
  templateUrl: 'docgeneralappointmentdetails.html',
})
export class DocgeneralappointmentDetailsPage {
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
  appt_id: string;
  gen_appoint_history: string;
  gen_appt_details: any;
  my_params: any;
  doctor_id : any;
  my_person_type : string;

  constructor(
    // private keyboard: Keyboard,
    public navCtrl: NavController, public navParams: NavParams, public completeTestService: CompleteTestService, public data: DataProvider, public loadingCtrl: LoadingController, public alertCtrl: AlertController, public modalCtrl: ModalController, public viewCtrl: ViewController, public toastCtrl: ToastController, public events: Events,public storage: Storage) {

    this.get_genappointment_records();

    if (!this.doctor_id) {
      this.storage.get('doctor_id').then((doctor_id) => {
        this.doctor_id = doctor_id;
      });
    }

    this.storage.get('person_type').then((person_type) => {
      this.my_person_type = person_type
    });

  }



  get_genappointment_records() {
    // console.log("We are in Home Care Consult Appointments History page");
    this.from_login = this.navParams.get('value');

    this.from_login2 = this.navParams.get('pers_value');
    this.from_login3 = this.navParams.get('doc_value');
    this.appointmentType = this.navParams.get("appointmentType");
    this.appt_id = this.navParams.get("appt_id");
    this.gen_appoint_history = this.navParams.get("gen_appoint_history");

    if (this.gen_appoint_history) {
      // console.log("this.gen_appoint_history = "+JSON.stringify(this.gen_appoint_history));
      // var jsonBody = JSON.parse(this.gen_appoint_history);
      this.gen_appt_details = Array.of(this.gen_appoint_history);

      // this.get_gen_appt_detail(this.gen_appoint_history_id);
    }
    // console.log('VALUE IN TABS CONSTRUCTOR IS' + this.from_login);

    if (this.from_login) {
      this.body = Array.of(this.from_login);
      this.jsonBody = JSON.parse(this.body);

      if (this.jsonBody[0]) {
        if (this.jsonBody[0].id) {
          this.requester_id1 = this.jsonBody[0].id;
        }
      }
    }


    // this.check = this.jsonBody[0];

    if (this.requester_id1) {
      if (this.appointmentType) {
        this.params = {
          "requester_id": this.requester_id1,
          "appointment_type_id": this.appointmentType
        }

        if (this.params) {
          this.newparams = JSON.stringify(this.params);
          console.log("New params " + this.newparams);
        }
      }
    }

    if (this.appt_id) {
      //do this.
      // this.get_gen_appt_detail(this.appt_id);
    }
  }

  closeModal() {
    this.viewCtrl.dismiss();
  }

  accept_gen_appt(appt_id, confirmed_id) {
    //make request to accept pds appt with id= appt_id
    if (appt_id) {

      let alert = this.alertCtrl.create({
        title: "Ghinger",
        subTitle: "You are about to accept the selected appointment, do you want to continue?",
        buttons: [
          {
            text: 'NO',
            handler: () => {

              this.closeModal();

            }
          }, {
            text: 'YES',
            handler: () => {

              this.my_params = {
                "appt_id": appt_id,
                "pre_confirmed_id": confirmed_id,
                "action": "A",
                "professional_id": this.doctor_id,
                "person_type" : this.my_person_type
              }

              let loading = this.loadingCtrl.create({
                content: 'Please wait...'
              });

              loading.present();

              setTimeout(() => {
                this.data.new_doc_appointment_accept_decline(this.my_params)
                  .then(result => {

                    console.log(result);
                    var jsonBody = result["_body"];
                    jsonBody = JSON.parse(jsonBody);
                    // this.gen_appt_details = jsonBody;
                    loading.dismiss();
                    console.log("Jsson body " + jsonBody);

                    var desc = jsonBody["resp_desc"];
                    // var code = jsonBody["resp_code"];

                    this.showalertmessage_modal("Ghinger", desc);
                  }, (err) => {

                    loading.dismiss();
                    this.showalertmessage("Ghinger", "Sorry. An Error occured. Kindly refresh and try again.");
                    this.showmessage("Sorry. An Error occured. Kindly refresh and try again.");
                    console.log("error = " + JSON.stringify(err));
                  });

              }, 1);

            }
          }
        ]
      });
      alert.present();



    }
    // this.showalertmessage("Ghinger","This action cannot be taken at the moment.");

    //the desired action: show this prompt: You are about to accept the selected appointment, do you want to continue?
  }

  decline_gen_appt(appt_id, pre_confirmed_id) {
    //make request to decline pds appt with id= appt_id
    this.navCtrl.push(PersonaldoctorserviceappointmentsDeclinePage, { appt_id: appt_id, pre_confirmed_id: pre_confirmed_id,person_type: this.my_person_type, page: 'DocgeneralappointmentDetailsPage' });
  }

  openNewAppointment() {

    this.navCtrl.push(HomeSearchPage, {
      value: this.from_login, doc_value: this.from_login3, pers_value: this.from_login2, appointmentType: this.appointmentType
    });
  }

  get_gen_appt_detail(appt_id) {

    if (appt_id) {

      let loading = this.loadingCtrl.create({
        content: 'Please wait...'
      });

      loading.present();

      setTimeout(() => {
        this.data.get_new_general_appointments_details(appt_id)
          .then(result => {

            console.log(result);
            var jsonBody = result["_body"];
            jsonBody = JSON.parse(jsonBody);
            this.gen_appt_details = jsonBody;
            loading.dismiss();

            console.log("Jsson body " + jsonBody);
          }, (err) => {

            loading.dismiss();
            this.showalertmessage("Ghinger", "Sorry. An Error occured. Kindly refresh and try again.");
            this.showmessage("Sorry. An Error occured. Kindly refresh and try again.");
            console.log("error = " + JSON.stringify(err));
          });

      }, 1);
      // }
    }

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

  showalertmessage_modal(titlemsg, mainmsg) {
    let alert = this.alertCtrl.create({
      title: titlemsg,
      subTitle: mainmsg,
      buttons: [
        {
          text: 'OK',
          handler: () => {
            this.closeModal();
            this.events.publish('doc_total_new_appoint_counter:refreshpage');
            this.events.publish('doc_new_appoint_counter:refreshpage');
            this.events.publish('docgeneralappointmentlists:refreshpage');
          }
        }
      ]
    });
    alert.present();
  }


}
