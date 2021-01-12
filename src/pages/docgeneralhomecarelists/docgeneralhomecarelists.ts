import { Component, ViewChild } from '@angular/core';
import { NavController, NavParams, ViewController,Events } from 'ionic-angular';
import { ToastController, LoadingController, AlertController, ModalController } from 'ionic-angular';
import { DataProvider } from '../../providers/data/data';
import { CompleteTestService } from '../../providers/complete-test-service/complete-test-service';
// // import { Keyboard } from '@ionic-native/keyboard';
import 'rxjs/add/operator/map';
// import { MedicationdetailsPage } from "../medicationdetails/medicationdetails";
// import {VidConsultPage} from "../vid-consult/vid-consult";
// import {VideoconsultdetailsPage} from "../videoconsultdetails/videoconsultdetails";
import {HomeSearchPage} from "../home-search/home-search";
// import {HomecaredetailsPage} from "../homecaredetails/homecaredetails";
import { DocgeneralappointmentDetailsPage } from '../docgeneralappointmentdetails/docgeneralappointmentdetails';
// import { DocgeneralmedicationPage } from '../docgeneralmedication/docgeneralmedication';
// import { DocgeneralvidconsultPage } from '../docgeneralvidconsult/docgeneralvidconsult';
import { DocgeneralhomecarePage } from '../docgeneralhomecare/docgeneralhomecare';
import { Storage } from '@ionic/storage';

@Component({
  selector: 'page-docgeneralhomecarelists',
  templateUrl: 'docgeneralhomecarelists.html',
})
export class DocgeneralhomecarelistsPage {
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
  doctor_id: string;
  doc_gen_homecare_appoints: any;
  my_person_type : string;

  constructor(
    // private keyboard: Keyboard, 
    public navCtrl: NavController, public navParams: NavParams, public completeTestService: CompleteTestService, public data: DataProvider, public loadingCtrl: LoadingController, public alertCtrl: AlertController, public modalCtrl: ModalController, public viewCtrl: ViewController,public toastCtrl: ToastController,public storage: Storage, public events: Events) {

      this.storage.get('person_type').then((person_type) => {
        this.my_person_type = person_type
      });

    // console.log("We are in Home Care Consult Appointments History page");
    this.get_records();
 
  }

  get_records(){
    this.from_login = this.navParams.get('value');

    this.from_login2 = this.navParams.get('pers_value');
    this.from_login3 = this.navParams.get('doc_value');
    this.appointmentType = this.navParams.get("appointmentType");
    // console.log('VALUE IN TABS CONSTRUCTOR IS' + this.from_login);


    if (this.doctor_id) {
      this.getdocgeneralhomecareappointments(this.doctor_id,this.my_person_type);
    } else {
      this.storage.get('doctor_id').then((doctor_id) => {
        this.doctor_id = doctor_id;
        this.getdocgeneralhomecareappointments(this.doctor_id,this.my_person_type);
      });
    }


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
  }

  ionViewWillEnter() {
    this.get_records();

    this.events.subscribe('doc_gen_hc_appoint_counter:refreshpage', () => {
      // this.get_genappointment_records();
      this.event_getdocgeneralhomecareappointments(this.doctor_id,this.my_person_type);
    });
  }

  closeModal() {
    this.viewCtrl.dismiss();
  }

  accept_pds_appt(appt_id){
    //make request to accept pds appt with id= appt_id
    this.showalertmessage("Ghinger","This action cannot be taken at the moment.");

    //the desired action: show this prompt: You are about to accept the selected appointment, do you want to continue?
  }

  decline_pds_appt(appt_id){
    //make request to decline pds appt with id= appt_id
    this.showalertmessage("Ghinger","This action cannot be taken at the moment.");
  }

  openNewAppointment() {

    this.navCtrl.push(HomeSearchPage, {
          value: this.from_login, doc_value: this.from_login3, pers_value: this.from_login2,appointmentType: this.appointmentType
    });
  }

  getdocgeneralhomecareappointments(data,person_type) {

    this.events.publish('doc_gen_appoint_counter:refreshpage'); //total doc general appointments counter on appointments menu

    if(data){

      let loading = this.loadingCtrl.create({
        content: 'Please wait...'
      });

      loading.present();
      setTimeout(() => {

        this.data.get_general_appointments_homecare(data,person_type)
          .then(result => {
            console.log(result);
            var jsonBody = result["_body"];
            jsonBody = JSON.parse(jsonBody);
            this.doc_gen_homecare_appoints = jsonBody["records"];
            loading.dismiss();

            console.log("Jsson body " +jsonBody);
          }, (err) => {

            loading.dismiss();
            this.showalertmessage("Ghinger","Please ensure all details provided are correct.");
            this.toastCtrl.create({
              message: "Please ensure all details provided are correct.",
              duration: 5000
            }).present();
            // loader.dismiss();
            console.log("error = "+JSON.stringify(err));
          });
  
        }, 1);
    }  

  }


  event_getdocgeneralhomecareappointments(data,my_person_type) {

    this.events.publish('doc_gen_appoint_counter:refreshpage'); //total doc general appointments counter on appointments menu

    if(data){

      setTimeout(() => {

        this.data.get_general_appointments_homecare(data,my_person_type)
          .then(result => {
            console.log(result);
            var jsonBody = result["_body"];
            jsonBody = JSON.parse(jsonBody);
            this.doc_gen_homecare_appoints = jsonBody["records"];
            console.log("Jsson body " +jsonBody);
          }, (err) => {

            this.showalertmessage("Ghinger","Please ensure all details provided are correct.");
            this.toastCtrl.create({
              message: "Please ensure all details provided are correct.",
              duration: 5000
            }).present();
            // loader.dismiss();
            console.log("error = "+JSON.stringify(err));
          });
  
        }, 1);
    }  

  }

  public doRefresh(refresher) {

    setTimeout(() => {
      this.get_records();
      //general appointments
      this.events.publish('doc_gen_appoint_counter:refreshpage'); //total doc general appointments counter on appointments menu
      this.events.publish('docgeneralappointmentlists:refreshpage'); // general md appointments counter on appointments menu
      this.events.publish('doc_gen_hc_appoint_counter:refreshpage'); //general hc appointments counter on appointments menu
      this.events.publish('doc_gen_vc_appoint_counter:refreshpage'); // doc general vc appointments counter on appointments menu

      //new appointments
      // this.events.publish('doc_total_new_appoint_counter:refreshpage');
      // this.events.publish('doc_new_appoint_counter:refreshpage');
      // this.events.publish('docgeneralappointmentlists:refreshpage');
      

      refresher.complete();
    }, 1);
  }


  doc_gen_homecare_details(doc_gen_homecare) {
    this.navCtrl.push(DocgeneralhomecarePage, { value: this.from_login, doc_value: this.from_login_doc, pers_value: this.from_login_pers,doc_gen_homecare: doc_gen_homecare });
    // rowid: rowid
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
