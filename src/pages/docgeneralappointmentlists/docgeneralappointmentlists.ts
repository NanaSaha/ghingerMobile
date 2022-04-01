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
// // import { Keyboard } from '@ionic-native/keyboard';
import "rxjs/add/operator/map";
import { MedicationdetailsPage } from "../medicationdetails/medicationdetails";
import { VidConsultPage } from "../vid-consult/vid-consult";
import { VideoconsultdetailsPage } from "../videoconsultdetails/videoconsultdetails";
import { HomeSearchPage } from "../home-search/home-search";
import { HomecaredetailsPage } from "../homecaredetails/homecaredetails";
import { DocgeneralappointmentDetailsPage } from "../docgeneralappointmentdetails/docgeneralappointmentdetails";
import { Storage } from "@ionic/storage";
import { ForkJoinObservable } from "rxjs/observable/ForkJoinObservable";

@Component({
  selector: "page-docgeneralappointmentlists",
  templateUrl: "docgeneralappointmentlists.html",
})
export class DocgeneralappointmentlistsPage {
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
  doctor_id: any;
  gen_appoint_details: any;
  gen_appoint_counter: any;
  gen_appointment_msg: any;
  my_person_type: string;
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
    // this.token = this.navParams.get("token");
    this.storage.get("token").then((token) => {
      this.token = token;
      console.log("TOKEN IN MENu " + this.token);

      this.getspecialistAppts(this.token);
    });
  }

  // ionViewWillEnter() {
  //   this.getspecialistAppts(this.token);
  // }

  closeModal() {
    this.viewCtrl.dismiss();
  }

  // openNewAppointment() {
  //   this.navCtrl.push(HomeSearchPage, {
  //     value: this.from_login,
  //     doc_value: this.from_login3,
  //     pers_value: this.from_login2,
  //     appointmentType: this.appointmentType,
  //   });
  // }

  getspecialistAppts(token) {
    let loading = this.loadingCtrl.create({
      content: "Please wait...",
    });

    loading.present();

    setTimeout(() => {
      console.log("TOKEN IN APPTS " + token);
      this.data.get_new_general_appointments(token).then(
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
        }
      );
    }, 1);
  }

  // event_getgeneralappointments(data, my_person_type) {
  //   if (data) {
  //     setTimeout(() => {
  //       this.data.get_new_general_appointments(this.token).then(
  //         (result) => {
  //           console.log(result);
  //           var jsonBody = result["_body"];
  //           jsonBody = JSON.parse(jsonBody);

  //           if (jsonBody["resp_code"]) {
  //             if (jsonBody["resp_code"] == "119") {
  //               this.gen_appointment_msg = jsonBody["resp_desc"];

  //               this.gen_appoint_details = "";

  //               this.gen_appoint_counter = "";
  //             } else {
  //               if (jsonBody["records"]) {
  //                 this.gen_appoint_details = jsonBody["records"];

  //                 this.gen_appoint_counter = jsonBody["count"];
  //                 // console.log(JSON.stringify(this.gen_appoint_counter));
  //                 this.storage.set(
  //                   "doc_new_gen_appoint_counter",
  //                   JSON.stringify(this.gen_appoint_counter)
  //                 );
  //               }
  //             }
  //           }
  //         },
  //         (err) => {
  //           this.showalertmessage(
  //             "Ghinger",
  //             "Please ensure all details provided are correct."
  //           );
  //           this.toastCtrl
  //             .create({
  //               message: "Please ensure all details provided are correct.",
  //               duration: 5000,
  //             })
  //             .present();
  //           // loader.dismiss();
  //           console.log("error = " + JSON.stringify(err));
  //         }
  //       );
  //     }, 1);
  //   }
  // }

  gen_appointment_history_details(gen_appoint_history) {
    this.navCtrl.push(DocgeneralappointmentDetailsPage, {
      value: this.from_login,
      doc_value: this.from_login_doc,
      pers_value: this.from_login_pers,
      gen_appoint_history: gen_appoint_history,
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
