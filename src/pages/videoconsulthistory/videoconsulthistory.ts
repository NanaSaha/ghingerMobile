import { Component, ViewChild } from "@angular/core";
import { NavController, NavParams, ViewController } from "ionic-angular";
import {
  ToastController,
  LoadingController,
  AlertController,
  ModalController,
} from "ionic-angular";
import { DataProvider } from "../../providers/data/data";
import { CompleteTestService } from "../../providers/complete-test-service/complete-test-service";
// import { Keyboard } from '@ionic-native/keyboard';
import "rxjs/add/operator/map";
import { MedicationdetailsPage } from "../medicationdetails/medicationdetails";
import { VidConsultPage } from "../vid-consult/vid-consult";
import { VideoconsultdetailsPage } from "../videoconsultdetails/videoconsultdetails";
import { Storage } from "@ionic/storage";
import { BilldetailsPage } from "../billdetails/billdetails";

@Component({
  selector: "page-videoconsulthistory",
  templateUrl: "videoconsulthistory.html",
})
export class VideoconsulthistoryPage {
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

  requester_id: any;
  from_login_doc: any = [];
  from_login_pers: any = [];
  body1: any;
  retrieve1: any;
  jsonBody1: any;

  body2: any;
  jsonBod2: any;
  appointmentType: any;
  resp_code;
  no_appointments;

  // person_type3: any;

  video_consult_details: any = [];
  content: any = [];
  // items: any = [];
  // videoconsultappointmentdetails = { id: '' };
  rowid: any;
  token;

  history_list: any = [];

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    public completeTestService: CompleteTestService,
    public data: DataProvider,
    public loadingCtrl: LoadingController,
    public alertCtrl: AlertController,
    public modalCtrl: ModalController,
    public viewCtrl: ViewController,
    public storage: Storage,
    public toastCtrl: ToastController
  ) {
    this.from_login = this.navParams.get("value");
    console.log("VALUE from Login " + this.from_login);
    this.token = this.navParams.get("token");

    var results_body = JSON.parse(this.from_login);
    var user_id = results_body["data"]["user_infos"][0].user_id;

    this.body = this.from_login;

    this.jsonBody = this.body;

    this.requester_id = user_id;
    this.check = this.jsonBody[0];

    console.log("VALUE IN medication history IS" + this.from_login);
    console.log(
      "VALUE of requester IN medication appointment history  IS " +
        this.requester_id
    );

    this.getVideoConsultAppointmentHistory();
  }

  closeModal() {
    this.viewCtrl.dismiss();
  }

  openNewAppointment() {
    let confirm = this.alertCtrl.create({
      title: "Video / Phone Consultation",
      message:
        "Video Consultation Fee :: GHc 80.<br> Phone Consultation Fee :: GHc 60 Would you want to proceed to book the appointment?",

      buttons: [
        {
          text: "No",
          handler: () => {},
        },
        {
          text: "Yes",
          handler: () => {
            let loader = this.loadingCtrl.create({
              content: "Please Hold on...",
              duration: 1000,
            });

            loader.present();

            setTimeout(() => {
              this.navCtrl.push(VidConsultPage, {
                value: this.from_login,
                appointmentType: this.appointmentType,
                token: this.token,
              });
            }, 1000);

            setTimeout(() => {
              loader.dismiss();
            }, 800);
          },
        },
      ],
    });
    confirm.present();
  }

  getVideoConsultAppointmentHistory() {
    let loading = this.loadingCtrl.create({
      content: "Please wait...",
    });

    loading.present();

    setTimeout(() => {
      this.data.getVideoConsultHistory(this.token).then(
        (result) => {
          console.log("THIS IS THE RESULT" + result);
          console.log("THIS IS THE ONLY DATARESULT" + result["data"]);
          this.video_consult_details = result["data"];

          let new_list = [];

          for (let x in this.video_consult_details) {
            console.log(
              "XXXXX" +
                JSON.stringify(
                  this.video_consult_details[x]["appointment_type"]
                )
            );

            if (
              this.video_consult_details[x]["appointment_type"].id == "VC" &&
              this.video_consult_details[x]["apt_type_id"] == "VC"
            ) {
              new_list.push({
                title: this.video_consult_details[x]["appointment_type"].title,
                price: this.video_consult_details[x]["appointment_type"].price,
                date: this.video_consult_details[x].created_at,
                status: this.video_consult_details[x].confirm_status,
                complaint: this.video_consult_details[x].complaint,
                id: this.video_consult_details[x].id,
              });
            }
          }

          console.log("NEW LIST" + JSON.stringify(new_list));
          this.history_list = new_list;
          loading.dismiss();
        },
        (err) => {
          this.no_appointments = "no";

          this.showtoast("No Appointments");
          loading.dismiss();
        }
      );
    }, 1);
  }

  video_appointment_history_details(video_consult_appoint_history_id) {
    this.navCtrl.push(VideoconsultdetailsPage, {
      value: this.from_login,
      video_consult_appoint_history_id: video_consult_appoint_history_id,
    });
  }

  public bill(data) {
    console.log(data);
    if (data) {
      this.storage.set("billdetails", JSON.stringify(data));
    } else {
      this.storage.set("billdetails", "empty");
    }
    this.navCtrl.push(BilldetailsPage, {
      value: this.from_login,
      doc_value: this.from_login_doc,
      pers_value: this.from_login_pers,
    });
  }

  showtoast(message) {
    let toast = this.toastCtrl.create({
      message: message,
      duration: 3000,
      position: "bottom",
    });
    toast.present();
  }
}
