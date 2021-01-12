import { Component, ViewChild } from '@angular/core';
import { NavController, NavParams, ViewController } from 'ionic-angular';
import { ToastController, LoadingController, AlertController, ModalController } from 'ionic-angular';
import { DataProvider } from '../../providers/data/data';
// import { Search2Page } from '../search2/search2';
// import { SearchPage } from '../search/search';
import { CompleteTestService } from '../../providers/complete-test-service/complete-test-service';
// // import { Keyboard } from '@ionic-native/keyboard';
import 'rxjs/add/operator/map';
import { PatientdoctorrecordsdetailsPage } from '../patientdoctorrecordsdetails/patientdoctorrecordsdetails';



@Component({
  selector: 'page-homecaredetails',
  templateUrl: 'homecaredetails.html',
})
export class HomecaredetailsPage {

  currenthomecareappointmentdetaildata = { id: 0, location: '', serviceprovider: '', requestcategory: '', beneficiary: '', requesturgency: '', proposeddateandtime: '', complaint: '', prevmedicalhistory: '', allergies: '', source: '', confirmstatus: '', medication: '', created_at: '', beneficiary_phone_number: '', beneficiary_age: '', beneficiary_gender: '' };
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
    public navCtrl: NavController, public navParams: NavParams, public completeTestService: CompleteTestService, public data: DataProvider, public loadingCtrl: LoadingController, public alertCtrl: AlertController, public modalCtrl: ModalController, public viewCtrl: ViewController) {

    this.appointment_id = navParams.get("homecare_appoint_history_id")
    this.appointmentType = navParams.get("appointmentType")

    this.params = {
      "appointment_id": this.appointment_id,
      "appointment_type_id": this.appointmentType
    }

    this.newparams = JSON.stringify(this.params);

    // console.log("appointment_id = " + this.newparams);
    if (this.newparams) {
      this.getCurrentHomeCareDetails();
    }

    this.read_appointment(this.appointment_id);
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad Home care appointment details Page');
  }

  getCurrentHomeCareDetails1(appointment_history) {

    this.jsonBody1 = Array.of(appointment_history);

    if (this.jsonBody1) {
      if (this.jsonBody1[0]) {
        //   this.currenthomecareappointmentdetaildata.id = data["id"];
        this.currenthomecareappointmentdetaildata.requestcategory = this.jsonBody1[0].category;
        this.currenthomecareappointmentdetaildata.beneficiary = this.jsonBody1[0].beneficiary_name;
        // this.currenthomecareappointmentdetaildata.beneficiary_age = this.jsonBody1[0].beneficiary_age;
        // this.currenthomecareappointmentdetaildata.beneficiary_gender = this.jsonBody1[0].beneficiary_gender;
        // console.log("this.jsonBody1[0].beneficiary_gender = "+JSON.stringify(this.jsonBody1[0].beneficiary_gender));
        this.currenthomecareappointmentdetaildata.beneficiary_phone_number = this.jsonBody1[0].beneficiary_phone_number;
        this.currenthomecareappointmentdetaildata.requesturgency = this.jsonBody1[0].urgency;
        this.currenthomecareappointmentdetaildata.proposeddateandtime = this.jsonBody1[0].proposed_date;
        this.currenthomecareappointmentdetaildata.complaint = this.jsonBody1[0].complaint_desc;
        this.currenthomecareappointmentdetaildata.created_at = this.jsonBody1[0].created_at;
        this.currenthomecareappointmentdetaildata.prevmedicalhistory = this.jsonBody1[0].prev_medical_history;
        this.currenthomecareappointmentdetaildata.allergies = this.jsonBody1[0].allergies;
        this.currenthomecareappointmentdetaildata.medication = this.jsonBody1[0].medication;
        // this.currenthomecareappointmentdetaildata.medications = this.jsonBody1[0].medication;

        if (this.jsonBody1[0].src == 'APP') {
          this.currenthomecareappointmentdetaildata.source = "Mobile App";
        }
        else {
          this.currenthomecareappointmentdetaildata.source = "Web Access";
        }

        if (this.jsonBody1[0].confirm_status == true) {
          this.currenthomecareappointmentdetaildata.confirmstatus = "Confirmed";
        }
        else {
          this.currenthomecareappointmentdetaildata.confirmstatus = "Not Confirmed";
        }

      }
    }

  }


  getCurrentHomeCareDetails() {

    let loader = this.loadingCtrl.create({
      content: "Please wait ...",
    });

    loader.present();

    setTimeout(() => {

      this.jsonBody = JSON.parse(this.newparams);

      console.log("medication details this.newparams = " + this.newparams + "jsonBody = " + this.jsonBody);

      this.data.getHomeCareAppointmentDetails(this.jsonBody)
        .then(data => {

          // ***********
          console.log("data[\"_body\"] = " + data["_body"]);

          var body1 = data["_body"];
          body1 = JSON.parse(body1);

          this.retrieve1 = JSON.stringify(body1)
          // console.log('LETS SEE THE DATA RETRIEVED ' + this.retrieve1);

          this.body1 = Array.of(this.retrieve1)
          this.jsonBody1 = JSON.parse(this.body1);

          if (this.jsonBody1) {
            console.log("this.jsonBody1 = " + JSON.stringify(this.jsonBody1));
            if (this.jsonBody1.resp_code) {

              if (this.jsonBody1.resp_code == "000") {

                // body1 = JSON.parse(this.jsonBody1.phone_consult_data);

                // this.retrieve1 = JSON.stringify(body1)
                // console.log('LETS SEE THE DATA RETRIEVED ' + this.retrieve1);
                // this.body1 = Array.of(this.jsonBody1.phone_consult_data)
                // this.jsonBodycurrentphoneconsultdetail = JSON.parse(this.jsonBody1.phone_consult_data);
                console.log("this.jsonBodycurrenthomcearetdetail = " + JSON.stringify(this.jsonBody1.home_care_data))

                if (this.jsonBody1.home_care_data) {
                  //   this.currentmedappointmentdetaildata.id = data["id"];
                  this.currenthomecareappointmentdetaildata.requestcategory = this.jsonBody1.home_care_data[0].category;
                  this.currenthomecareappointmentdetaildata.beneficiary = this.jsonBody1.home_care_data[0].beneficiary_name;
                  // console.log("this.jsonBodycurrenthomcearetdetail beneficiary_age = " + JSON.stringify(this.jsonBody1[0].beneficiary_age))

                  this.currenthomecareappointmentdetaildata.beneficiary_age = this.jsonBody1.home_care_data[0].beneficiary_age;
                  
                  
                  // this.currenthomecareappointmentdetaildata.beneficiary_gender = this.jsonBody1.home_care_data[0].beneficiary_gender;
                  this.currenthomecareappointmentdetaildata.beneficiary_phone_number = this.jsonBody1.home_care_data[0].beneficiary_phone_number;
                  this.currenthomecareappointmentdetaildata.requesturgency = this.jsonBody1.home_care_data[0].urgency;
                  this.currenthomecareappointmentdetaildata.proposeddateandtime = this.jsonBody1.home_care_data[0].proposed_date;
                  this.currenthomecareappointmentdetaildata.complaint = this.jsonBody1.home_care_data[0].complaint_desc;
                  this.currenthomecareappointmentdetaildata.created_at = this.jsonBody1.home_care_data[0].created_at;
                  this.currenthomecareappointmentdetaildata.prevmedicalhistory = this.jsonBody1.home_care_data[0].prev_medical_history;
                  this.currenthomecareappointmentdetaildata.allergies = this.jsonBody1.home_care_data[0].allergies;
                  this.currenthomecareappointmentdetaildata.medication = this.jsonBody1.home_care_data[0].medication;

                  switch (this.jsonBody1.home_care_data[0].beneficiary_gender) {
                    case "F":
                      this.currenthomecareappointmentdetaildata.beneficiary_gender = "Female";
                      break;

                    case "M":
                      this.currenthomecareappointmentdetaildata.beneficiary_gender = "Male";
                      break;
                    default:
                      break;
                  }
                  
                  if (this.jsonBody1.home_care_data[0].src == 'APP') {
                    this.currenthomecareappointmentdetaildata.source = "Mobile App";
                  }
                  else {
                    this.currenthomecareappointmentdetaildata.source = "Web Access";
                  }

                  if (this.jsonBody1.home_care_data[0].confirm_status == true) {
                    this.currenthomecareappointmentdetaildata.confirmstatus = "Confirmed";
                  }
                  else {
                    this.currenthomecareappointmentdetaildata.confirmstatus = "Not Confirmed";
                  }
                  loader.dismiss();

                }

                // if (this.jsonBody1.patient_med_records) {
                //   this.doctor_records = this.jsonBody1.patient_med_records;
                // }

                // loader.dismiss();

              } else {
                this.showalertmessage("Ghinger", this.jsonBody1.resp_desc);
                loader.dismiss();
              }
            }
          }
          // console.log("medappointdetails page line 92 : this.jsonBody1[0].id = " + this.jsonBody1[0].id);

          //***************


        }, (err) => {

          let alert = this.alertCtrl.create({
            title: "",
            subTitle: "An Error Occured. Please try again.",
            buttons: ['OK']
          });
          alert.present();

          loader.dismiss();
          console.log(err);
        });

    }, 1);
  }

  doctorrecords(doctor_records) {

    if (doctor_records) {
      console.log("doctor_records = " + JSON.stringify(doctor_records));
      this.navCtrl.push(PatientdoctorrecordsdetailsPage, { doctor_patient_records: doctor_records })
    } else {
      this.showalertmessage("Ghinger", "sorry, your appointment has not been attended to yet. Check back later. Thank you");
    }

  }

  read_appointment(data) {

    this.params = { "appointment_id": data }

    this.data.read_appointment(this.params)
      .then(result => { });

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
      buttons: ['OK']
    });
    alert.present();
  }

}
