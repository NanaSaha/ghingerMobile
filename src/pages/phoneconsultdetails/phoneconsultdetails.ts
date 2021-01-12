import { Component, ViewChild } from '@angular/core';
import { NavController, NavParams, ViewController } from 'ionic-angular';
import { ToastController, LoadingController, AlertController, ModalController } from 'ionic-angular';
import { DataProvider } from '../../providers/data/data';
import { CompleteTestService } from '../../providers/complete-test-service/complete-test-service';
// import { Keyboard } from '@ionic-native/keyboard';
import 'rxjs/add/operator/map';
import { PatientdoctorrecordsdetailsPage } from '../patientdoctorrecordsdetails/patientdoctorrecordsdetails';


@Component({
  selector: 'page-phoneconsultdetails',
  templateUrl: 'phoneconsultdetails.html',
})
export class PhoneconsultdetailsPage {

  currentphoneconsultdetail: any;
  currentphoneconsultdetaildata = { id: 0, location: '', serviceprovider: '', requestcategory: '', beneficiary: '', requesturgency: '', proposeddateandtime: '', complaint: '', prevmedicalhistory: '', allergies: '', source: '', confirmstatus: '', medications: '', duration: '', created_at: '', beneficiary_phone_number: '',beneficiary_gender : '', beneficiary_age: '' };
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
  jsonBodycurrentphoneconsultdetail: any;


  constructor(
    // private keyboard: Keyboard,
    public navCtrl: NavController, public navParams: NavParams, public completeTestService: CompleteTestService, public data: DataProvider, public loadingCtrl: LoadingController, public alertCtrl: AlertController, public modalCtrl: ModalController, public viewCtrl: ViewController, public toastCtrl: ToastController) {

    this.appointment_id = navParams.get("phoneconsult_history_id")
    this.appointmentType = navParams.get("appointmentType")

    // this.appointment_id = "333";
    // this.appointmentType = "PC";
    this.params = {
      "appointment_id": this.appointment_id,
      "appointment_type_id": this.appointmentType
    }

    this.newparams = JSON.stringify(this.params);

    if (this.newparams) {
      this.getCurrentPhoneConsultDetails();
    }

    // this.read_appointment(this.appointment_id);

  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad Current Phone Consult details Page');
  }


  getCurrentPhoneConsultDetails() {

    let loader = this.loadingCtrl.create({
      content: "Please wait ...",
    });

    loader.present();

    setTimeout(() => {

      this.jsonBody = JSON.parse(this.newparams);

      console.log("medication details this.newparams = " + this.newparams + "jsonBody = " + this.jsonBody);

      this.data.getPhoneConsultHistoryDetails(this.jsonBody)
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
                console.log("this.jsonBodycurrentphoneconsultdetail = " + JSON.stringify(this.jsonBody1.phone_consult_data))

                if (this.jsonBody1.phone_consult_data) {
                  //   this.currentmedappointmentdetaildata.id = data["id"];
                  this.currentphoneconsultdetaildata.requestcategory = this.jsonBody1.phone_consult_data[0].category;
                  this.currentphoneconsultdetaildata.beneficiary = this.jsonBody1.phone_consult_data[0].beneficiary_name;
                  switch (this.jsonBody1.phone_consult_data[0].beneficiary_gender) {
                    case 'M':
                      this.currentphoneconsultdetaildata.beneficiary_gender = "Male";
                      break;
                    case 'F':
                      this.currentphoneconsultdetaildata.beneficiary_gender = "Female";
                      break;
    
                    default:
                      break;
                  }
                  // this.currentpersonaldoctorprescriptiondetaildata.beneficiary_gender = this.jsonBody1[0].beneficiary_gender;
                  this.currentphoneconsultdetaildata.beneficiary_age = this.jsonBody1.phone_consult_data[0].beneficiary_age;
                  this.currentphoneconsultdetaildata.beneficiary_phone_number = this.jsonBody1.phone_consult_data[0].beneficiary_phone_number;                  
                  this.currentphoneconsultdetaildata.requesturgency = this.jsonBody1.phone_consult_data[0].urgency;
                  this.currentphoneconsultdetaildata.proposeddateandtime = this.jsonBody1.phone_consult_data[0].proposed_date;
                  this.currentphoneconsultdetaildata.medications = this.jsonBody1.phone_consult_data[0].medication;
                  this.currentphoneconsultdetaildata.complaint = this.jsonBody1.phone_consult_data[0].complaint_desc;
                  this.currentphoneconsultdetaildata.prevmedicalhistory = this.jsonBody1.phone_consult_data[0].prev_medical_history;
                  this.currentphoneconsultdetaildata.allergies = this.jsonBody1.phone_consult_data[0].allergies;
                  

                  if (this.jsonBody1.phone_consult_data[0].src == 'APP') {
                    this.currentphoneconsultdetaildata.source = "Mobile App";
                  }
                  else {
                    this.currentphoneconsultdetaildata.source = "Web Access";
                  }

                  if (this.jsonBody1.phone_consult_data[0].confirm_status == true) {
                    this.currentphoneconsultdetaildata.confirmstatus = "Confirmed";
                  }
                  else {
                    this.currentphoneconsultdetaildata.confirmstatus = "Not Confirmed";
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

    this.params = {"appointment_id": data}
    
    this.data.read_appointment(this.params)
      .then(result => {});
  
  }


  closeModal() {
    this.viewCtrl.dismiss();
  }

  showmessage(message) {
    let toast = this.toastCtrl.create({
      message: message,
      duration: 3000,
      position: 'top'
    });
    toast.present();
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
