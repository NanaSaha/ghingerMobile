import { Component, ViewChild } from '@angular/core';
import { NavController, NavParams, ViewController } from 'ionic-angular';
import { ToastController, LoadingController, AlertController, ModalController } from 'ionic-angular';
import { DataProvider } from '../../providers/data/data';
import { CompleteTestService } from '../../providers/complete-test-service/complete-test-service';
// import { Keyboard } from '@ionic-native/keyboard';
import 'rxjs/add/operator/map';
import { PatientdoctorrecordsdetailsPage } from '../patientdoctorrecordsdetails/patientdoctorrecordsdetails';

@Component({
  selector: 'page-prescriptiondetails',
  templateUrl: 'prescriptiondetails.html',
})
export class PrescriptiondetailsPage {

  currentpersonaldoctorprescriptiondetail: any;
  currentpersonaldoctorprescriptiondetaildata = { id: 0, location: '', serviceprovider: '', requestcategory: '', beneficiary: '', requesturgency: '', proposeddateandtime: '', complaint: '', prevmedicalhistory: '', allergies: '', source: '', confirmstatus: '', medications: '', duration: '', created_at: '', beneficiary_phone_number: '', beneficiary_age: '', beneficiary_gender: '' };
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

    this.appointment_id = navParams.get("personaldoctorprescription_history_id")
    this.appointmentType = navParams.get("appointmentType")

    this.params = {
      "appointment_id": this.appointment_id,
      "appointment_type_id": this.appointmentType
    }

    this.newparams = JSON.stringify(this.params);

     console.log("appointment_id = " + this.newparams);

     if (this.newparams) {
      this.getCurrentPersonalDoctorPrescriptionDetails();
    }

    this.read_appointment(this.appointment_id);
  
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad Current Personal Doctor Digital Prescription details Page');
  }

  getCurrentPersonalDoctorPrescriptionDetails() {
    // console.log("medication_appoint_history_id = " + medication_appoint_history_id);
    this.jsonBody = JSON.parse(this.newparams);

    console.log("medication details this.newparams = " + this.newparams + "jsonBody = " + this.jsonBody);

    this.data.getPersonalDoctorPrescriptionDetails(this.jsonBody)
      .then(data => {

        // ***********
        console.log("data[\"_body\"] = " + data["_body"]);

        var body1 = data["_body"];
        body1 = JSON.parse(body1);

        this.retrieve1 = JSON.stringify(body1)
        // console.log('LETS SEE THE DATA RETRIEVED ' + this.retrieve1);

        this.body1 = Array.of(this.retrieve1)
        this.jsonBody1 = JSON.parse(this.body1);
        console.log("JSON BODY IS " + this.jsonBody1);


        //****************

        if (this.jsonBody1) {
          console.log("this.jsonBody1 = " + JSON.stringify(this.jsonBody1));
          if (this.jsonBody1.resp_code == "000") {
            if (this.jsonBody1.pdsprescription_history_data) {
              //   this.currentmedappointmentdetaildata.id = data["id"];
              this.currentpersonaldoctorprescriptiondetaildata.requestcategory = this.jsonBody1.pdsprescription_history_data[0].category;
              switch (this.jsonBody1.pdsprescription_history_data[0].beneficiary_gender) {
                case 'M':
                  this.currentpersonaldoctorprescriptiondetaildata.beneficiary_gender = "Male";
                  break;
                case 'F':
                  this.currentpersonaldoctorprescriptiondetaildata.beneficiary_gender = "Female";
                  break;

                default:
                  break;
              }
              // this.currentpersonaldoctorprescriptiondetaildata.beneficiary_gender = this.jsonBody1[0].beneficiary_gender;
              this.currentpersonaldoctorprescriptiondetaildata.beneficiary_age = this.jsonBody1.pdsprescription_history_data[0].beneficiary_age;
              this.currentpersonaldoctorprescriptiondetaildata.beneficiary_phone_number = this.jsonBody1.pdsprescription_history_data[0].beneficiary_phone_number;
              this.currentpersonaldoctorprescriptiondetaildata.beneficiary = this.jsonBody1.pdsprescription_history_data[0].beneficiary_name;
              this.currentpersonaldoctorprescriptiondetaildata.requesturgency = this.jsonBody1.pdsprescription_history_data[0].urgency;
              this.currentpersonaldoctorprescriptiondetaildata.proposeddateandtime = this.jsonBody1.pdsprescription_history_data[0].proposed_date;
              this.currentpersonaldoctorprescriptiondetaildata.created_at = this.jsonBody1.pdsprescription_history_data[0].created_at;
              this.currentpersonaldoctorprescriptiondetaildata.medications = this.jsonBody1.pdsprescription_history_data[0].medication;
              this.currentpersonaldoctorprescriptiondetaildata.duration = this.jsonBody1.pdsprescription_history_data[0].duration;

              if (this.jsonBody1.pdsprescription_history_data[0].src == 'APP') {
                this.currentpersonaldoctorprescriptiondetaildata.source = "Mobile App";
              }
              else {
                this.currentpersonaldoctorprescriptiondetaildata.source = "Web Access";
              }

              if (this.jsonBody1.pdsprescription_history_data[0].confirm_status == true) {
                this.currentpersonaldoctorprescriptiondetaildata.confirmstatus = "Confirmed";
              }
              else {
                this.currentpersonaldoctorprescriptiondetaildata.confirmstatus = "Not Confirmed";
              }

            }

            // if (this.jsonBody1.patient_med_records) {
            //   this.doctor_records = this.jsonBody1.patient_med_records;
            // }
          } else {
            // this.showalertmessage("Ghinger", this.jsonBody1.resp_desc);
            this.showalertmessage("Ghinger", "Could not process. Try again!");
          }
        }



      });
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

  showalertmessage(titlemsg, mainmsg) {
    let alert = this.alertCtrl.create({
      title: titlemsg,
      subTitle: mainmsg,
      buttons: ['OK']
    });
    alert.present();
  }

}
