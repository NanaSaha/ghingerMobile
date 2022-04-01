import { Component, ViewChild } from "@angular/core";
import { NavController, NavParams, ViewController } from "ionic-angular";
import {
  ToastController,
  LoadingController,
  AlertController,
  ModalController,
} from "ionic-angular";
import { DataProvider } from "../../providers/data/data";
// import { Search2Page } from '../search2/search2';
// import { SearchPage } from '../search/search';
import { CompleteTestService } from "../../providers/complete-test-service/complete-test-service";
// // import { Keyboard } from '@ionic-native/keyboard';
import "rxjs/add/operator/map";
import { PatientdoctorrecordsdetailsPage } from "../patientdoctorrecordsdetails/patientdoctorrecordsdetails";

@Component({
  selector: "page-homecaredetails",
  templateUrl: "homecaredetails.html",
})
export class HomecaredetailsPage {
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
    medication: "",
    created_at: "",
    beneficiary_phone_number: "",
    beneficiary_age: "",
    beneficiary_gender: "",
  };
  params: any = [];
  newparams: any;
  appointment_id: any;
  jsonBody: any;
  body: any;
  retrieve1: string;
  body1: any;
  jsonBody1: any;
  appointmentType: any;
  doctor_records: any;

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
    public toastCtrl: ToastController
  ) {
    this.appointment_id = navParams.get("homecare_appoint_history_id");

    this.getCurrentHomeCareDetails();

    //   if (this.newparams) {
    //     this.getCurrentHomeCareDetails();
    //   }

    //   this.read_appointment(this.appointment_id);
  }

  getCurrentHomeCareDetails() {
    let loader = this.loadingCtrl.create({
      content: "Please wait ...",
    });

    loader.present();

    this.data.getHomeCareAppointmentDetails(this.appointment_id).then(
      (data) => {
        let results = data["data"];

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

        loader.dismiss();
      },
      (err) => {
        this.showtoast("No Appointments Details");
        loader.dismiss();
      }
    );
  }

  doctorrecords(doctor_records) {
    if (doctor_records) {
      console.log("doctor_records = " + JSON.stringify(doctor_records));
      this.navCtrl.push(PatientdoctorrecordsdetailsPage, {
        doctor_patient_records: doctor_records,
      });
    } else {
      this.showalertmessage(
        "Ghinger",
        "sorry, your appointment has not been attended to yet. Check back later. Thank you"
      );
    }
  }

  read_appointment(data) {
    this.params = { appointment_id: data };

    this.data.read_appointment(this.params).then((result) => {});
  }

  closeModal() {
    this.viewCtrl.dismiss();
  }

  // showmessage(message) {
  //   let toast = this.toastCtrl.create({
  //     message: message,
  //     duration: 3000,
  //     position: 'top'
  //   });
  //   toast.present();
  // }

  showalertmessage(titlemsg, mainmsg) {
    let alert = this.alertCtrl.create({
      title: titlemsg,
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
