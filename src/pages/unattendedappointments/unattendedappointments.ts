import { Component, ViewChild } from '@angular/core';
import { NavController, NavParams, ViewController, ToastController, LoadingController, AlertController, ModalController,Events } from 'ionic-angular';

import { DataProvider } from '../../providers/data/data';
import { CompleteTestService } from '../../providers/complete-test-service/complete-test-service';
// import { Keyboard } from '@ionic-native/keyboard';
import 'rxjs/add/operator/map';
import { MedicationdetailsPage } from "../medicationdetails/medicationdetails";
import {VidConsultPage} from "../vid-consult/vid-consult";
import {VideoconsultdetailsPage} from "../videoconsultdetails/videoconsultdetails";
import {PhoneConsultPage} from "../phone-consult/phone-consult";
import {PrescriptionPage} from "../prescription/prescription";
import {PrescriptiondetailsPage} from "../prescriptiondetails/prescriptiondetails";
import {PhoneconsultdetailsPage} from "../phoneconsultdetails/phoneconsultdetails";
import { PatientNewRecordPage } from '../patient-new-record/patient-new-record';
import { UnattendedappointmentdetailsPage } from '../unattendedappointmentdetails/unattendedappointmentdetails';
import { DocgeneralmedicationPage } from '../docgeneralmedication/docgeneralmedication';


@Component({
  selector: 'page-unattendedappointments',
  templateUrl: 'unattendedappointments.html',
})
export class UnattendedappointmentsPage {
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
  appointmentType: any;

  // person_type3: any;

  phoneconsult_details: any = [];
  content: any = [];
  // items: any = [];
  // videoconsultappointmentdetails = { id: '' };
  rowid: any;
  action : any;
  doctor_id : any;
  patient_id : any;
  appointments : any;
  nodata_msg : any;

  constructor(
    // private keyboard: Keyboard,
     public navCtrl: NavController, public navParams: NavParams, public completeTestService: CompleteTestService, public data: DataProvider, public loadingCtrl: LoadingController, public alertCtrl: AlertController, public modalCtrl: ModalController, public viewCtrl: ViewController, public events: Events) {

    console.log("We are in Phone Consult History page");
    this.from_login = this.navParams.get('value');

    this.from_login2 = this.navParams.get('pers_value');
    this.from_login3 = this.navParams.get('doc_value');
    this.appointmentType =  this.navParams.get('appointmentType');


    this.action =  this.navParams.get('action');
    this.doctor_id =  this.navParams.get('doctor_id');
    this.patient_id =  this.navParams.get('patient_id');
  
    this.getappointments();
   
  }

  ionViewWillEnter() {
   
    this.events.subscribe('unattended_appointments:refreshpage', () => {
      this.getappointments();
    });
  }

  ionViewDidLoad() {
    this.getappointments();
  }

  getappointments(){
    if(this.patient_id){
      this.get_confirmed_appointments(this.patient_id);
    }
  }
  

  closeModal() {
    this.viewCtrl.dismiss();
  }

 


  get_confirmed_appointments(patient_id) {

    let loader = this.loadingCtrl.create({
      content: "Please wait ...",
    });

    loader.present();

    setTimeout(() => {

   

    this.data.get_confirmed_appointments_by_patient(patient_id)
      .then(result => {
       
        

        var jsonBody = result["_body"];
        console.log(JSON.stringify(jsonBody));
        jsonBody = JSON.parse(jsonBody);
        if(jsonBody["records"]){
          console.log(jsonBody["resp_code"]);
          if(jsonBody["resp_code"]){
            if(jsonBody["resp_code"]== "000"){
              this.appointments = jsonBody["records"];
            }
          }
        }
        else{
          this.nodata_msg = jsonBody["resp_desc"];
        }
        
        loader.dismiss();

        console.log("Jsson body " + JSON.stringify(jsonBody));
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


  doc_unattended_appointment_details(appointments){

    console.log("doc_unattended_appointment_details - appointments = "+JSON.stringify(appointments));
    this.navCtrl.push(DocgeneralmedicationPage, { gen_med: appointments });

  }

  // doc_gen_med_appointment_details(gen_med) {
  //   this.navCtrl.push(DocgeneralmedicationPage, { value: this.from_login, doc_value: this.from_login_doc, pers_value: this.from_login_pers, gen_med: gen_med });
  //   // rowid: rowid
  // }

  attend(appointment_id,patient_id,surname,other_names){
    var full_name = surname + " " + other_names;
    this.navCtrl.push(PatientNewRecordPage, {'appointment_id' : appointment_id,'patient_id': patient_id, 'full_name': full_name, 'doc_id':this.doctor_id})
  }


  phone_consult_history_details(phoneconsult_history_id,appointmentType) {

    this.navCtrl.push(PhoneconsultdetailsPage, { value: this.from_login, doc_value: this.from_login_doc, pers_value: this.from_login_pers,phoneconsult_history_id: phoneconsult_history_id, appointmentType: appointmentType  });
    // rowid: rowid
  }
}
