import { Component, ViewChild } from "@angular/core";
import {
  IonicPage,
  NavController,
  NavParams,
  ViewController,
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

@Component({
  selector: "page-medappointmentdetails",
  templateUrl: "medappointmentdetails.html",
})
export class MedappointmentdetailsPage {
  currentmedappointmentdetail: any;
  currentvidappointmentdetaildata = {
    id: 0,
    location: "",
    serviceprovider: "",
    requestcategory: "",
    beneficiary: "",
    requesturgency: "",
    proposeddateandtime: "",
    complaint: "",
    prevmedicalhistory: "",
    allergies: "",
    source: "",
    confirmstatus: "",
    beneficiary_phone_number: "",
    beneficiary_age: "",
    beneficiary_gender: "",
    confirmed_date: "",
  };
  params: any = [];
  newparams: any;
  appointment_id: any;
  jsonBody: any;
  body: any;
  retrieve1: string;
  body1: any;
  jsonBody1: any;
  appointment: any;

  confirmed_details;
  complaint_desc;
  comment;
  suburb_name;
  confirmed_date;
  provider_name;
  api_code;

  constructor(
    // private keyboard: Keyboard,
    public navCtrl: NavController,
    public navParams: NavParams,
    public completeTestService: CompleteTestService,
    public data: DataProvider,
    public loadingCtrl: LoadingController,
    public alertCtrl: AlertController,
    public modalCtrl: ModalController,
    public viewCtrl: ViewController
  ) {
    this.appointment = navParams.get("medappointhistory");

    this.getCurrentMedAppointmentdetails();
    // this.read_appointment(this.appointment.id);
    // this.getMedicalPreConfirmedDetails();

    this.params = {
      appointment_id: this.appointment.id,
    };

    this.newparams = JSON.stringify(this.params);

    console.log("New params " + this.newparams);
  }

  ionViewDidLoad() {
    console.log("ionViewDidLoad MedappointmentdetailsPage");
  }

  getCurrentMedAppointmentdetails() {
    let loading = this.loadingCtrl.create({
      content: "Please wait...",
    });

    loading.present();

    setTimeout(() => {
      this.data.getMedicalPreConfirmed(this.appointment).then(
        (result) => {
          let results = result["data"];

          console.log("LEST SEE DATA COMING FOR DETAILS---::--", results);
          console.log("COMPLAINTS---::--", results.complaint);

          this.currentvidappointmentdetaildata.complaint = results.complaint;
          this.currentvidappointmentdetaildata.prevmedicalhistory =
            results.prev_history;
          this.currentvidappointmentdetaildata.allergies = results.allergies;

          this.currentvidappointmentdetaildata.proposeddateandtime =
            results.proposed_date;
          this.currentvidappointmentdetaildata.confirmstatus =
            results.confirm_status;

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

  read_appointment(data) {
    this.params = { appointment_id: data };

    this.data.read_appointment(this.params).then((result) => {});
  }

  closeModal() {
    this.viewCtrl.dismiss();
  }

  showalertmessage(mainmsg) {
    let alert = this.alertCtrl.create({
      title: "Ghinger Health Care",
      subTitle: mainmsg,
      buttons: ["OK"],
    });
    alert.present();
  }
}
