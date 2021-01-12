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
import { Storage } from '@ionic/storage';
import { PatientNewRecordPage } from '../patient-new-record/patient-new-record';

@Component({
  selector: 'page-docgeneralvidconsult',
  templateUrl: 'docgeneralvidconsult.html',
})
export class DocgeneralvidconsultPage {
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
  doc_gen_vidconsult : any;
  general_vidconsults : any;
  doctor_id : any;

  constructor(
    // private keyboard: Keyboard, 
    public navCtrl: NavController, public navParams: NavParams, public completeTestService: CompleteTestService, public data: DataProvider, public loadingCtrl: LoadingController, public alertCtrl: AlertController, public modalCtrl: ModalController, public viewCtrl: ViewController,public toastCtrl: ToastController,public storage: Storage) {

    // console.log("We are in Home Care Consult Appointments History page");
    // this.from_login = this.navParams.get('value');

    // this.from_login2 = this.navParams.get('pers_value');
    // this.from_login3 = this.navParams.get('doc_value');
    this.doc_gen_vidconsult = this.navParams.get("doc_gen_vidconsult");
    if(this.doc_gen_vidconsult){
      this.general_vidconsults = Array.of(this.doc_gen_vidconsult);
      // this.getdoc_genvidconsult_details(this.doc_gen_vidconsult);
    }

    this.storage.get('doctor_id').then((doctor_id) => {

      this.doctor_id = doctor_id;

    });
    // console.log('VALUE IN TABS CONSTRUCTOR IS' + this.from_login);

    // if(this.from_login){
    //   this.body = Array.of(this.from_login);
    //   this.jsonBody = JSON.parse(this.body);

    //   if(this.jsonBody[0]){
    //     if(this.jsonBody[0].id){
    //       this.requester_id1 = this.jsonBody[0].id;
    //     }    
    //   }
    // }

    
    // // this.check = this.jsonBody[0];

    // if(this.requester_id1){
    //   if(this.appointmentType){
    //     this.params = {
    //       "requester_id": this.requester_id1,
    //       "appointment_type_id": this.appointmentType
    //     }

    //     if(this.params){
    //       this.newparams = JSON.stringify(this.params);
    //       console.log("New params " + this.newparams);
    //     }
    //   }
    // }

    
 
  }

  closeModal() {
    this.viewCtrl.dismiss();
  }

  attend_to(appt_id){
    //make request to accept pds appt with id= appt_id

    if(this.doc_gen_vidconsult){

      var full_name = this.doc_gen_vidconsult.surname + " " + this.doc_gen_vidconsult.other_names;
      console.log("this.doc_gen_vidconsult = "+JSON.stringify(this.doc_gen_vidconsult) + " and appt_id = "+JSON.stringify(appt_id) + JSON.stringify(this.doc_gen_vidconsult.id) + " " + JSON.stringify(this.doc_gen_vidconsult.patient_id) + " " +JSON.stringify(full_name) + " " + JSON.stringify(this.doctor_id));
      
      if(this.doc_gen_vidconsult.id && this.doc_gen_vidconsult.patient_id && full_name && this.doctor_id){
        // this.viewCtrl.dismiss();
        this.navCtrl.popToRoot();
        this.navCtrl.push(PatientNewRecordPage, {'appointment_id' : this.doc_gen_vidconsult.id,'patient_id': this.doc_gen_vidconsult.patient_id, 'full_name': full_name, 'doc_id':this.doctor_id})
  
      }

    }
    // this.showalertmessage("Ghinger","This action cannot be taken at the moment.");

    //the desired action: show this prompt: You are about to accept the selected appointment, do you want to continue?
  }

  

  getdoc_genvidconsult_details(appt_id) {

    if(appt_id){
      
      let loading = this.loadingCtrl.create({
        content: 'Please wait...'
      });
  
      loading.present();
  
      setTimeout(() => {        
        this.data.get_general_appointments_videoconsult_details(appt_id)
          .then(result => {
            
            console.log(result);
            var jsonBody = result["_body"];
            jsonBody = JSON.parse(jsonBody);
            this.general_vidconsults = jsonBody;
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
