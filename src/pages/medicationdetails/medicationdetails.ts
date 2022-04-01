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
// import { Search2Page } from '../search2/search2';
// import { SearchPage } from '../search/search';
import { CompleteTestService } from "../../providers/complete-test-service/complete-test-service";
// import { Keyboard } from '@ionic-native/keyboard';
import "rxjs/add/operator/map";
import { LabimagesPage } from "../labimages/labimages";

@Component({
  selector: "page-medicationdetails",
  templateUrl: "medicationdetails.html",
})
export class MedicationdetailsPage {
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
    medications: "",
    created_at: "",
    beneficiary_phone_number: "",
    beneficiary_age: "beneficiary_age",
    beneficiary_gender: "",
    confirmed_date: "",
    image_name: "",
    appointment_type_id: "",
  };
  params: any = [];
  newparams: any;
  appointment_id: any;
  jsonBody: any;
  body: any;
  retrieve1: string;
  body1: any;
  jsonBody1: any;
  medication_appoint_history: any;
  confirmed_details;

  complaint_desc;
  comment;
  suburb_name;
  confirmed_date;
  api_code;
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
    public viewCtrl: ViewController
  ) {
    this.medication_appoint_history = navParams.get(
      "medication_appoint_history"
    );
    this.token = navParams.get("token");

    console.log("MEDICAION APPOINTMENT ID " + this.medication_appoint_history);

    this.getCurrentMedicationDetails();
    // this.read_appointment(this.medication_appoint_history.id);
    // this.getMedicationPreConfirmedDetails();

    // this.params = {
    //   appointment_id: this.medication_appoint_history.id,
    // };

    // this.newparams = JSON.stringify(this.params);

    // console.log("New params " + this.newparams);
  }

  // getCurrentMedicationDetails(medication_appoint_history) {
  //   let loading = this.loadingCtrl.create({
  //     content: "Please wait...",
  //   });

  //   loading.present();

  //   this.jsonBody1 = Array.of(medication_appoint_history);

  //   // loading.dismiss();

  //   if (this.jsonBody1) {
  //     if (this.jsonBody1[0]) {
  //       //   this.currentmedappointmentdetaildata.id = data["id"];
  //       this.currentmedappointmentdetaildata.location = this.jsonBody1[0].suburb_name;
  //       this.currentmedappointmentdetaildata.requestcategory = this.jsonBody1[0].category;
  //       this.currentmedappointmentdetaildata.beneficiary = this.jsonBody1[0].beneficiary_name;
  //       this.currentmedappointmentdetaildata.beneficiary_phone_number = this.jsonBody1[0].beneficiary_phone_number;
  //       this.currentmedappointmentdetaildata.beneficiary_age = this.jsonBody1[0].beneficiary_age;

  //       if (this.jsonBody1[0].beneficiary_gender) {
  //         if (this.jsonBody1[0].beneficiary_gender == "F") {
  //           this.currentmedappointmentdetaildata.beneficiary_gender = "Female";
  //         } else if (this.jsonBody1[0].beneficiary_gender == "M") {
  //           this.currentmedappointmentdetaildata.beneficiary_gender = "Male";
  //         } else {
  //           this.currentmedappointmentdetaildata.beneficiary_gender = "";
  //         }
  //       }
  //       // this.currentmedappointmentdetaildata.beneficiary_gender = this.jsonBody1[0].beneficiary_gender;

  //       this.currentmedappointmentdetaildata.requesturgency = this.jsonBody1[0].urgency;
  //       this.currentmedappointmentdetaildata.created_at = this.jsonBody1[0].created_at;
  //       this.currentmedappointmentdetaildata.confirmed_date = this.jsonBody1[0].confirmed_date;
  //       this.currentmedappointmentdetaildata.complaint = this.jsonBody1[0].complaint_desc;
  //       this.currentmedappointmentdetaildata.prevmedicalhistory = this.jsonBody1[0].prev_medical_history;
  //       this.currentmedappointmentdetaildata.allergies = this.jsonBody1[0].allergies;
  //       this.currentmedappointmentdetaildata.medications = this.jsonBody1[0].medication;

  //       if (this.jsonBody1[0].src == "APP") {
  //         this.currentmedappointmentdetaildata.source = "Mobile App";
  //       }

  //       if (this.jsonBody1[0].confirm_status == true) {
  //         this.currentmedappointmentdetaildata.confirmstatus = "Confirmed";
  //       } else {
  //         this.currentmedappointmentdetaildata.confirmstatus = "Not Confirmed";
  //       }
  //       this.currentmedappointmentdetaildata.image_name = this.jsonBody1[0].image_name;
  //       this.currentmedappointmentdetaildata.appointment_type_id = this.jsonBody1[0].appointment_type_id;

  //       loading.dismiss();
  //     }
  //   }
  // }

  getCurrentMedicationDetails() {
    let loading = this.loadingCtrl.create({
      content: "Please wait...",
    });

    loading.present();

    setTimeout(() => {
      this.data
        .getMedicationPreConfirmed(this.medication_appoint_history, this.token)
        .then(
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

  show_appointment_image(data) {
    //show image in a modal view
    this.navCtrl.push(LabimagesPage, { appointment_details: data });
  }

  read_appointment(data) {
    this.params = { appointment_id: data };

    console.log("READ APPOINTM PARAMS " + this.params);

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
