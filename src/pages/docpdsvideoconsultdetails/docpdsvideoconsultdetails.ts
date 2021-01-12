import { Component, ViewChild } from '@angular/core';
import { NavController, NavParams, ViewController } from 'ionic-angular';
import { ToastController, LoadingController, AlertController, ModalController } from 'ionic-angular';
import { DataProvider } from '../../providers/data/data';
import { CompleteTestService } from '../../providers/complete-test-service/complete-test-service';
import { PatientNewRecordPage } from '../patient-new-record/patient-new-record';
import { Pdsprescription } from '../pdsprescription/pdsprescription';
import 'rxjs/add/operator/map';

@Component({
  selector: 'page-docpdsvideoconsultdetails',
  templateUrl: 'docpdsvideoconsultdetails.html',
})
export class DocpdsvideoconsultDetailsPage {
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
  doc_pds_videoconsult : any;
  doc_pds_videoconsults : any;
  doctor_id: any;

  constructor(
    // private keyboard: Keyboard, 
    public navCtrl: NavController, public navParams: NavParams, public completeTestService: CompleteTestService, public data: DataProvider, public loadingCtrl: LoadingController, public alertCtrl: AlertController, public modalCtrl: ModalController, public viewCtrl: ViewController,public toastCtrl: ToastController) {

    
    this.doc_pds_videoconsult = this.navParams.get("doc_pds_videoconsult");
    this.doctor_id = this.navParams.get("doctor_id");
    if(this.doc_pds_videoconsult){
      this.doc_pds_videoconsults = Array.of(this.doc_pds_videoconsult);
      
    }
  
 
  }

  closeModal() {
    this.viewCtrl.dismiss();
  }

  attend(appt_id) {
  
   

    console.log("this.pds_prescription = " + JSON.stringify(this.doc_pds_videoconsults) + " and appt_id = " + JSON.stringify("PC"));


   if (this.doc_pds_videoconsults) {

     var full_name = this.doc_pds_videoconsults.surname + " " + this.doc_pds_videoconsults.other_names;

     if (this.doc_pds_videoconsults.id && this.doc_pds_videoconsults.requester_id && full_name && this.doctor_id) {

       if (this.doc_pds_videoconsults.appointment_type == "Personal Doctor Digital Prescription") {
       
         this.navCtrl.popToRoot();
         this.navCtrl.push(Pdsprescription, { 'appointment_id': this.doc_pds_videoconsults.id, 'patient_id': this.doc_pds_videoconsults.requester_id, 'full_name': full_name,'beneficiary_age':this.doc_pds_videoconsults.beneficiary_age,'email':this.doc_pds_videoconsults.email,  'doc_id': this.doctor_id })

       } else {
         
         this.navCtrl.popToRoot();
        
         this.navCtrl.push(PatientNewRecordPage, { 'appointment_id': this.doc_pds_videoconsults.id, 'patient_id': this.doc_pds_videoconsults.requester_id, 'full_name': full_name, 'doc_id': this.doctor_id })

       }


     }

   }

     }

  

  getdoc_pdsvideoconsult_details(appt_id) {

    if(appt_id){
      
      let loading = this.loadingCtrl.create({
        content: 'Please wait...'
      });
  
      loading.present();
  
      setTimeout(() => {        
        this.data.get_doc_pds_appointments_videoconsult_details(appt_id)
          .then(result => {
            
            console.log(result);
            var jsonBody = result["_body"];
            jsonBody = JSON.parse(jsonBody);
            this.doc_pds_videoconsults = jsonBody;
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
