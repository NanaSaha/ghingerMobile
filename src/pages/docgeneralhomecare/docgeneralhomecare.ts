import { Component, ViewChild } from '@angular/core';
import { NavController, NavParams, ViewController } from 'ionic-angular';
import { ToastController, LoadingController, AlertController, ModalController } from 'ionic-angular';
import { DataProvider } from '../../providers/data/data';
import { CompleteTestService } from '../../providers/complete-test-service/complete-test-service';
// // import { Keyboard } from '@ionic-native/keyboard';
import 'rxjs/add/operator/map';
import { MedicationdetailsPage } from "../medicationdetails/medicationdetails";
import {VidConsultPage} from "../vid-consult/vid-consult";
import {VideoconsultdetailsPage} from "../videoconsultdetails/videoconsultdetails";
import {HomeSearchPage} from "../home-search/home-search";
import {HomecaredetailsPage} from "../homecaredetails/homecaredetails";
import { PatientNewRecordPage } from '../patient-new-record/patient-new-record';
import { Storage } from '@ionic/storage';


@Component({
  selector: 'page-docgeneralhomecare',
  templateUrl: 'docgeneralhomecare.html',
})
export class DocgeneralhomecarePage {
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
  doc_gen_homecare : any;
  general_homecare : any;
  doctor_id : any;

  constructor(
    // private keyboard: Keyboard, 
    public navCtrl: NavController, public navParams: NavParams, public completeTestService: CompleteTestService, public data: DataProvider, public loadingCtrl: LoadingController, public alertCtrl: AlertController, public modalCtrl: ModalController, public viewCtrl: ViewController,public toastCtrl: ToastController,public storage: Storage) {

    // console.log("We are in Home Care Consult Appointments History page");
    this.from_login = this.navParams.get('value');

    this.from_login2 = this.navParams.get('pers_value');
    this.from_login3 = this.navParams.get('doc_value');
    this.doc_gen_homecare = navParams.get("doc_gen_homecare");

    if(this.doc_gen_homecare){
      this.general_homecare = Array.of(this.doc_gen_homecare);
      // this.getdocgenhomecare_details(this.doc_gen_homecare_id);
    }
    
    // console.log('VALUE IN TABS CONSTRUCTOR IS' + this.from_login);

    if(this.from_login){
      this.body = Array.of(this.from_login);
      this.jsonBody = JSON.parse(this.body);

      if(this.jsonBody[0]){
        if(this.jsonBody[0].id){
          this.requester_id1 = this.jsonBody[0].id;
        }    
      }
    }

    
    // this.check = this.jsonBody[0];

    if(this.requester_id1){
      if(this.appointmentType){
        this.params = {
          "requester_id": this.requester_id1,
          "appointment_type_id": this.appointmentType
        }

        if(this.params){
          this.newparams = JSON.stringify(this.params);
          console.log("New params " + this.newparams);
        }
      }
    }

    this.storage.get('doctor_id').then((doctor_id) => {

      this.doctor_id = doctor_id;

    });
 
  }

  closeModal() {
    this.viewCtrl.dismiss();
  }

  attend_to(appt_id){
    //make request to accept pds appt with id= appt_id

    

    if(this.doc_gen_homecare){

      var full_name = this.doc_gen_homecare.surname + " " + this.doc_gen_homecare.other_names;
      console.log("this.doc_gen_homecare = "+JSON.stringify(this.doc_gen_homecare) + " and appt_id = "+JSON.stringify(appt_id) + JSON.stringify(this.doc_gen_homecare.id) + " " + JSON.stringify(this.doc_gen_homecare.patient_id) + " " +JSON.stringify(full_name) + " " + JSON.stringify(this.doctor_id));
      if(this.doc_gen_homecare.id && this.doc_gen_homecare.patient_id && full_name && this.doctor_id){

        // this.viewCtrl.dismiss();
        this.navCtrl.popToRoot();
        this.navCtrl.push(PatientNewRecordPage, {'appointment_id' : this.doc_gen_homecare.id,'patient_id': this.doc_gen_homecare.patient_id, 'full_name': full_name, 'doc_id':this.doctor_id})
  
      }

    }

    // this.showalertmessage("Ghinger","This action cannot be taken at the moment.");

    //the desired action: show this prompt: You are about to accept the selected appointment, do you want to continue?
  }

  

  getdocgenhomecare_details(appt_id) {

    if(appt_id){
      
      let loading = this.loadingCtrl.create({
        content: 'Please wait...'
      });
  
      loading.present();
  
      setTimeout(() => {        
        this.data.get_general_appointments_homecare_details(appt_id)
          .then(result => {
            
            console.log(result);
            var jsonBody = result["_body"];
            jsonBody = JSON.parse(jsonBody);
            this.general_homecare = jsonBody;
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
