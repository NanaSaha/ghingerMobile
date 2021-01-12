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

  requester_id1: any;
  from_login_doc: any = [];
  from_login_pers: any = [];
  body1: any;
  retrieve1: any;
  jsonBody1: any;

  body2: any;
  jsonBod2: any;
  appointmentType: any;

  // person_type3: any;

  video_consult_details: any = [];
  content: any = [];
  // items: any = [];
  // videoconsultappointmentdetails = { id: '' };
  rowid: any;

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    public completeTestService: CompleteTestService,
    public data: DataProvider,
    public loadingCtrl: LoadingController,
    public alertCtrl: AlertController,
    public modalCtrl: ModalController,
    public viewCtrl: ViewController,
    public storage: Storage
  ) {
    console.log("We are in Video Consult Appointments History page");
    this.from_login = this.navParams.get("value");

    this.from_login2 = this.navParams.get("pers_value");
    this.from_login3 = this.navParams.get("doc_value");
    this.appointmentType = this.navParams.get("appointmentType");

    console.log("this.appointmentType = " + this.appointmentType);

    console.log("VALUE IN TABS CONSTRUCTOR IS" + this.from_login);

    this.body = this.from_login;

    this.jsonBody = this.body;

    this.requester_id1 = this.jsonBody[0].id;

    this.params = {
      requester_id: this.requester_id1,
      appointment_type_id: this.appointmentType,
    };

    this.newparams = JSON.stringify(this.params);

    console.log("New params " + this.newparams);

    this.getVideoConsultAppointmentHistory();
  }

  closeModal() {
    this.viewCtrl.dismiss();
  }

  openNewAppointment() {
    let confirm = this.alertCtrl.create({
      title: "Video Consultation",
      message:
        "Consultation Fee :: GHc 80. Would you want to proceed to book the appointment?",

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
                doc_value: this.from_login3,
                pers_value: this.from_login2,
                appointmentType: this.appointmentType,
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
      this.jsonBody = JSON.parse(this.newparams);

      this.data.getVideoConsultHistory(this.jsonBody).then((result) => {
        // this.contacts = result;
        console.log(result);

        var jsonBody = result["_body"];
        jsonBody = JSON.parse(jsonBody);
        this.video_consult_details = jsonBody;

        console.log("Jsson body " + JSON.stringify(jsonBody));
        // if()

        if (this.jsonBody.resp_code == "119") {
          let alert = this.alertCtrl.create({
            title: "Ghinger",
            subTitle: this.jsonBody.resp_desc,
            buttons: ["OK"],
          });
          alert.present();
        }

        // loading.dismiss();
      });

      loading.dismiss();
    }, 1);
  }

  video_appointment_history_details(
    video_consult_appoint_history_id,
    appointmentType
  ) {
    // console.log("Video consult history detail this.appointmentType = "+appointmentType);
    this.navCtrl.push(VideoconsultdetailsPage, {
      value: this.from_login,
      doc_value: this.from_login_doc,
      pers_value: this.from_login_pers,
      video_consult_appoint_history_id: video_consult_appoint_history_id,
      appointmentType: appointmentType,
    });
    // rowid: rowid
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
}
