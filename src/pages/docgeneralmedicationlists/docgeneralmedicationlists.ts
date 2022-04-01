import { Component, ViewChild } from "@angular/core";
import {
  NavController,
  NavParams,
  ViewController,
  Events,
} from "ionic-angular";
import {
  ToastController,
  LoadingController,
  AlertController,
  ModalController,
} from "ionic-angular";
import { DataProvider } from "../../providers/data/data";
import { CompleteTestService } from "../../providers/complete-test-service/complete-test-service";

import "rxjs/add/operator/map";

import { HomeSearchPage } from "../home-search/home-search";

import { DocgeneralappointmentDetailsPage } from "../docgeneralappointmentdetails/docgeneralappointmentdetails";

import { Storage } from "@ionic/storage";
import { DocgeneralmedicationPage } from "../docgeneralmedication/docgeneralmedication";

@Component({
  selector: "page-docgeneralmedicationlists",
  templateUrl: "docgeneralmedicationlists.html",
})
export class DocgeneralmedicationlistsPage {
  @ViewChild("searchbar") myInput;
  @ViewChild("input")
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
  doctor_id: string;
  doc_med_appoint_lists: any;
  doc_gen_med_appoint_counter: any;
  token;

  constructor(
    // private keyboard: Keyboard,
    public navCtrl: NavController,
    public navParams: NavParams,
    public completeTestService: CompleteTestService,
    public data: DataProvider,
    public loadingCtrl: LoadingController,
    public alertCtrl: AlertController,
    public modalCtrl: ModalController,
    public viewCtrl: ViewController,
    public toastCtrl: ToastController,
    public storage: Storage,
    public events: Events
  ) {
    this.storage.get("token").then((token) => {
      this.token = token;
      console.log("TOKEN IN MENu " + this.token);

      this.getdocgeneralmedicationsappointments(this.token);
    });
  }

  // ionViewWillEnter() {
  //   this.get_records();
  //   this.events.subscribe("docgeneralappointmentlists:refreshpage", () => {
  //     if (this.doctor_id) {
  //       this.event_getdocgeneralmedicationsappointments(this.doctor_id);
  //     } else {
  //       this.storage.get("doctor_id").then((doctor_id) => {
  //         this.doctor_id = doctor_id;
  //         this.event_getdocgeneralmedicationsappointments(this.doctor_id);
  //       });
  //     }
  //   });
  // }

  // get_records() {
  //   if (this.doctor_id) {
  //     this.getdocgeneralmedicationsappointments(this.doctor_id);
  //   } else {
  //     this.storage.get("doctor_id").then((doctor_id) => {
  //       this.doctor_id = doctor_id;
  //       console.log(
  //         " Docgeneralpdsappointmentlists page doctor_id = " + doctor_id
  //       );

  //       this.getdocgeneralmedicationsappointments(this.doctor_id);
  //     });
  //   }
  // }

  closeModal() {
    this.viewCtrl.dismiss();
  }

  // accept_pds_appt(appt_id) {

  //   this.showalertmessage(
  //     "Ghinger",
  //     "This action cannot be taken at the moment."
  //   );

  // }

  // decline_pds_appt(appt_id) {

  //   this.showalertmessage(
  //     "Ghinger",
  //     "This action cannot be taken at the moment."
  //   );
  // }

  // openNewAppointment() {
  //   this.navCtrl.push(HomeSearchPage, {
  //     value: this.from_login,
  //     doc_value: this.from_login3,
  //     pers_value: this.from_login2,
  //     appointmentType: this.appointmentType,
  //   });
  // }

  getdocgeneralmedicationsappointments(token) {
    let loading = this.loadingCtrl.create({
      content: "Please wait...",
    });
    loading.present();
    setTimeout(() => {
      this.data.get_general_appointments_medication(token).then(
        (result) => {
          console.log("THIS IS THE RESULT" + result);

          loading.dismiss();
        },
        (err) => {
          loading.dismiss();

          this.toastCtrl
            .create({
              message: "Sorry! Something wrong happened. Please try again.",
              duration: 5000,
            })
            .present();
          // loader.dismiss();
          console.log("error = " + JSON.stringify(err));
        }
      );
    }, 1);
  }

  event_getdocgeneralmedicationsappointments(data) {
    this.events.publish("doc_gen_appoint_counter:refreshpage"); //
    if (data) {
      setTimeout(() => {
        this.data.get_general_appointments_medication(data).then(
          (result) => {
            console.log(result);
            var jsonBody = result["_body"];
            jsonBody = JSON.parse(jsonBody);
            this.doc_med_appoint_lists = jsonBody["records"];

            this.doc_gen_med_appoint_counter = jsonBody["count"][0].counter;

            console.log("Jsson body " + jsonBody);
          },
          (err) => {
            this.showalertmessage(
              "Ghinger",
              "Please ensure all details provided are correct."
            );
            this.toastCtrl
              .create({
                message: "Please ensure all details provided are correct.",
                duration: 5000,
              })
              .present();
            // loader.dismiss();
            console.log("error = " + JSON.stringify(err));
          }
        );
      }, 1);
    }
  }

  doc_gen_med_appointment_details(gen_med) {
    this.navCtrl.push(DocgeneralmedicationPage, {
      value: this.from_login,
      doc_value: this.from_login_doc,
      pers_value: this.from_login_pers,
      gen_med: gen_med,
    });
    // rowid: rowid
  }

  showmessage(message) {
    let toast = this.toastCtrl.create({
      message: message,
      duration: 3000,
      position: "top",
    });
    toast.present();
  }

  showalertmessage(titlemsg, mainmsg) {
    let alert = this.alertCtrl.create({
      title: titlemsg,
      subTitle: mainmsg,
      buttons: ["OK"],
    });
    alert.present();
  }
}
