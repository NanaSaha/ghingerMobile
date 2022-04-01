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
import "rxjs/add/operator/map";

import { Storage } from "@ionic/storage";

import { BilldetailsPage } from "../billdetails/billdetails";
import { MedappointmentdetailsPage } from "../medappointmentdetails/medappointmentdetails";
import { MedicationdetailsPage } from "../medicationdetails/medicationdetails";
import { LabdetailsPage } from "../labdetails/labdetails";
import { VidConsultPage } from "../vid-consult/vid-consult";
import { VideoconsultdetailsPage } from "../videoconsultdetails/videoconsultdetails";
import { analyzeAndValidateNgModules } from "@angular/compiler";

@Component({
  selector: "page-notifications",
  templateUrl: "notifications.html",
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
  no_appointments: any;

  medappointmentdetails = { id: "" };
  rowid: any;
  person_details_code: any;
  video_consult_details: any = [];

  overall_list: string = "Overall";
  token;
  history_list: any = [];
  history_list2: any = [];
  history_list3: any = [];

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
    this.storage.get("doc_value").then((doc_value) => {
      this.from_login3 = doc_value;

      console.log(
        "LOGIN DETAILS from LOGIN DOC IN MENU PAGE FOR CONSTRUCTOR IS" +
          this.from_login_doc
      );
    });

    this.storage.get("pers_value").then((pers_value) => {
      this.from_login2 = pers_value;
    });

    this.storage.get("token").then((token) => {
      this.token = token;
      console.log("TOKEN IN MENu " + this.token);
    });

    console.log("We are in Medication Appointments History page");
    // this.from_login = this.navParams.get('value');

    // this.from_login2 = this.navParams.get('pers_value');
    // this.from_login3 = this.navParams.get('doc_value');

    this.storage.get("value").then((value) => {
      this.from_login = value;
      console.log("VALUE IN TABS CONSTRUCTOR IS" + this.from_login);

      this.body = this.from_login; //this.body = Array.of(this.from_login);

      this.jsonBody = this.body; // this.jsonBody = JSON.parse(this.body);

      console.log("JSON BODY IS" + this.jsonBody);
      this.requester_id1 = this.jsonBody[0].id;
      this.check = this.jsonBody[0];

      console.log("VALUE IN medication history IS" + this.from_login);
      console.log(
        "VALUE of requester IN medication appointment history  IS " +
          this.requester_id1
      );

      console.log("REQUESTER ID ------------" + this.requester_id1);

      this.params = {
        requester_id: this.requester_id1,
      };

      this.newparams = JSON.stringify(this.params);

      console.log("New params " + this.newparams);

      this.getMedicationAppointmentHistory();
      this.getAppointmentHistory();
      this.getLabAppointmentHistory();
      this.getVideoConsultAppointmentHistory();
    });
  }

  getMedicationAppointmentHistory() {
    let loading = this.loadingCtrl.create({
      content: "Please wait...",
    });

    loading.present();

    setTimeout(() => {
      this.jsonBody = JSON.parse(this.newparams);

      this.data.getMedicationHistory(this.token).then(
        (result) => {
          console.log("THIS IS THE RESULT" + result);
          console.log("THIS IS THE ONLY DATARESULT" + result["data"]);
          this.person_details = result["data"];
          let new_list = [];

          for (let x in this.person_details) {
            if (
              this.person_details[x]["appointment_type"].id == "MD" &&
              this.person_details[x]["apt_type_id"] == "MD"
            ) {
              new_list.push({
                title: this.person_details[x]["appointment_type"].title,
                price: this.person_details[x]["appointment_type"].price,
                date: this.person_details[x].created_at,
                status: this.person_details[x].confirm_status,
                complaint: this.person_details[x].complaint,
                id: this.person_details[x].id,
              });
            }
          }
          this.history_list = new_list;
          loading.dismiss();
        },
        (err) => {
          loading.dismiss();
          this.showalertmessage(
            "Sorry. An Error occured. Kindly refresh and try again."
          );
          console.log("error = " + JSON.stringify(err));
        }
      );
    }, 1);
  }

  getAppointmentHistory() {
    let loading = this.loadingCtrl.create({
      content: "Please wait...",
    });

    loading.present();

    setTimeout(() => {
      this.data.med_appointment_history(this.token).then((result) => {
        console.log(result);

        this.person_details2 = result["data"];
        let new_list = [];

        for (let x in this.person_details) {
          if (
            this.person_details2[x]["appointment_type"].id == "MA" &&
            this.person_details2[x]["apt_type_id"] == "MA"
          ) {
            new_list.push({
              title: this.person_details2[x]["appointment_type"].title,
              price: this.person_details2[x]["appointment_type"].price,
              date: this.person_details2[x].created_at,
              status: this.person_details2[x].confirm_status,
              complaint: this.person_details2[x].complaint,
              id: this.person_details2[x].id,
            });
          }
        }
        this.history_list2 = new_list;
      });
      loading.dismiss();
    }, 1);
  }

  medical_appointment_history_details(medappointhistory) {
    this.navCtrl.push(MedappointmentdetailsPage, {
      value: this.from_login,
      doc_value: this.from_login_doc,
      pers_value: this.from_login_pers,
      medappointhistory: medappointhistory,
      token: this.token,
    });
  }

  medication_appointment_history_details(medication_appoint_history) {
    console.log(
      "in medication history page: rowid = " + medication_appoint_history
    );

    this.navCtrl.push(MedicationdetailsPage, {
      value: this.from_login,
      doc_value: this.from_login_doc,
      pers_value: this.from_login_pers,
      medication_appoint_history: medication_appoint_history,
      token: this.token,
    });
    // rowid: rowid
  }

  getLabAppointmentHistory() {
    let loading = this.loadingCtrl.create({
      content: "Please wait...",
    });

    loading.present();

    setTimeout(() => {
      this.jsonBody = JSON.parse(this.newparams);

      this.data.getLabAppointmentHistory(this.token).then((result) => {
        this.person_details3 = result["data"];

        let new_list = [];

        for (let x in this.person_details) {
          if (
            this.person_details3[x]["appointment_type"].id == "LA" &&
            this.person_details3[x]["apt_type_id"] == "LA"
          ) {
            new_list.push({
              title: this.person_details3[x]["appointment_type"].title,
              price: this.person_details3[x]["appointment_type"].price,
              date: this.person_details3[x].created_at,
              status: this.person_details3[x].confirm_status,
              complaint: this.person_details3[x].complaint,
              id: this.person_details3[x].id,
            });
          }
        }
        this.history_list3 = new_list;
      });
      loading.dismiss();
    }, 1);
  }

  lab_appointment_history_details(lab_appoint_history) {
    console.log("in lab history page: rowid = " + lab_appoint_history);

    this.navCtrl.push(LabdetailsPage, {
      value: this.from_login,
      doc_value: this.from_login3,
      pers_value: this.from_login2,
      lab_appoint_history: lab_appoint_history,
      token: this.token,
    });
    // rowid: rowid
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
      token: this.token,
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

  showalertmessage(mainmsg) {
    let alert = this.alertCtrl.create({
      title: "Ghinger Health Care",
      subTitle: mainmsg,
      buttons: ["OK"],
    });
    alert.present();
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
