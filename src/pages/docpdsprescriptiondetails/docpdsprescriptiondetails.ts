import { Component, ViewChild } from '@angular/core';
import { NavController, NavParams, ViewController } from 'ionic-angular';
import { ToastController, LoadingController, AlertController, ModalController } from 'ionic-angular';
import { DataProvider } from '../../providers/data/data';
import { CompleteTestService } from '../../providers/complete-test-service/complete-test-service';
import { PatientNewRecordPage } from '../patient-new-record/patient-new-record';
import { Pdsprescription } from '../pdsprescription/pdsprescription';
import 'rxjs/add/operator/map';

@Component({
  selector: 'page-docpdsprescriptiondetails',
  templateUrl: 'docpdsprescriptiondetails.html',
})
export class DocpdsprescriptionDetailsPage {
  @ViewChild('searchbar') myInput;
  @ViewChild('input')
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
  pds_prescription : any;
  doc_pds_prescription : any;
  doctor_id: any;

  constructor(
    
    public navCtrl: NavController, public navParams: NavParams, public completeTestService: CompleteTestService, public data: DataProvider, public loadingCtrl: LoadingController, public alertCtrl: AlertController, public modalCtrl: ModalController, public viewCtrl: ViewController,public toastCtrl: ToastController) {

    this.pds_prescription = this.navParams.get("pds_prescription");
    this.doctor_id = this.navParams.get("doctor_id");
    if(this.pds_prescription){
        console.log("this.pds_prescription = "+JSON.stringify(this.pds_prescription));

      this.doc_pds_prescription = Array.of(this.pds_prescription);
    
    }
    
  }

  closeModal() {
    this.viewCtrl.dismiss();
  }

  attend_to(appt_id) {
  
    this.pds_prescription.appointment_type == "PDDP"

     console.log("this.pds_prescription = " + JSON.stringify(this.pds_prescription) + " and appt_id = " + JSON.stringify("PDDP"));


    if (this.pds_prescription) {

      var full_name = this.pds_prescription.surname + " " + this.pds_prescription.other_names;

      if (this.pds_prescription.id && this.pds_prescription.requester_id && full_name && this.doctor_id) {

        if (this.pds_prescription.appointment_type == "Personal Doctor Digital Prescription") {
        
          this.navCtrl.popToRoot();
          this.navCtrl.push(Pdsprescription, { 'appointment_id': this.pds_prescription.id, 'patient_id': this.pds_prescription.requester_id, 'full_name': full_name,'beneficiary_age':this.pds_prescription.beneficiary_age,'email':this.pds_prescription.email,  'doc_id': this.doctor_id })

        } else {
          // this.viewCtrl.dismiss();
          this.navCtrl.popToRoot();
         
          this.navCtrl.push(PatientNewRecordPage, { 'appointment_id': this.pds_prescription.id, 'patient_id': this.pds_prescription.requester_id, 'full_name': full_name, 'doc_id': this.doctor_id })

        }


      }

    }

      }

  

  getdoc_pdsprescription_details(appt_id) {

    if(appt_id){
      
      let loading = this.loadingCtrl.create({
        content: 'Please wait...'
      });
  
      loading.present();
  
      setTimeout(() => {        
        this.data.get_doc_pds_appointments_prescription_details(appt_id)
          .then(result => {
            
            console.log(result);
            var jsonBody = result["_body"];
            jsonBody = JSON.parse(jsonBody);
            this.doc_pds_prescription = jsonBody;
            loading.dismiss();

            console.log("Jsson body " +JSON.stringify(jsonBody));
          }, (err) => {

            loading.dismiss();
            this.showalertmessage("Ghinger", "Sorry. An Error occured. Kindly refresh and try again.");
            this.showmessage("Sorry. An Error occured. Kindly refresh and try again.");
            console.log("error = "+JSON.stringify(err));
          });
    
        }, 1);
    } 

  }

  showmessage(message){
    let toast = this.toastCtrl.create({
      message: message,
      duration: 3000,
      position: 'top'
    });
    toast.present();
  }

  showalertmessage(titlemsg, mainmsg){
    let alert = this.alertCtrl.create({
      title: titlemsg,
      subTitle: mainmsg,
      buttons: ['OK']
    });
    alert.present();
  }


}
