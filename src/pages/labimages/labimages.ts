import { Component, ViewChild } from '@angular/core';
import { NavController, NavParams, ViewController, Events } from 'ionic-angular';
import { ToastController, LoadingController, AlertController, ModalController } from 'ionic-angular';
import { DataProvider } from '../../providers/data/data';
import { CompleteTestService } from '../../providers/complete-test-service/complete-test-service';
// // import { Keyboard } from '@ionic-native/keyboard';
import 'rxjs/add/operator/map';
import { HomeSearchPage } from "../home-search/home-search";
import { File } from '@ionic-native/file';
import { Transfer, TransferObject } from '@ionic-native/transfer';
import { FilePath } from '@ionic-native/file-path';
import { Camera } from '@ionic-native/camera';
import { Http } from '@angular/http';
import { Storage } from '@ionic/storage';

import 'rxjs/add/operator/map';

declare var cordova: any;

@Component({
  selector: 'page-labimages',
  templateUrl: 'labimages.html',
})
export class LabimagesPage {
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
  appt_id: string;
  gen_appoint_history: string;
  gen_appt_details: any;
  my_params: any;
  doctor_id : any;
  imageSrc:string
  image_url : string;
  appointment_details : any;

  constructor(
    // private keyboard: Keyboard,
    public navCtrl: NavController, public navParams: NavParams, public completeTestService: CompleteTestService, public data: DataProvider, public loadingCtrl: LoadingController, public alertCtrl: AlertController, public modalCtrl: ModalController, public viewCtrl: ViewController, public toastCtrl: ToastController, public events: Events,public storage: Storage,private transfer: Transfer) {
      
      
      this.appointment_details = navParams.get("appointment_details")

      this.jsonBody1 = Array.of(this.appointment_details);

      if (this.jsonBody1) {
        if (this.jsonBody1[0]) {
          this.image_url = this.data.main_url + '/pictures/' + this.jsonBody1[0].appointment_type_id + '/' + this.jsonBody1[0].image_name;
          this.LoadImage(this.image_url);
        }
      }
      

    if (!this.doctor_id) {
      this.storage.get('doctor_id').then((doctor_id) => {
        this.doctor_id = doctor_id;
      });
    }

  }


  LoadImage(my_url){

    // const transfer = new TransferObject();
    const fileTransfer: TransferObject = this.transfer.create();

    var url = my_url;
    this.image_url = url;
    var uri = encodeURI(url);
    var filepath = cordova.file.cacheDirectory + "/new_dir";//("/"+this.vacancy.attachment);
    fileTransfer.download(uri,  filepath, true ).then((entry) => {
        console.log('download complete: ' + entry );
        this.imageSrc = entry.toUrl();
        console.log(this.imageSrc);

      }).catch(error => {
        console.log(JSON.stringify(error));

      });
  }


  closeModal() {
    this.viewCtrl.dismiss();
  }

  openNewAppointment() {

    this.navCtrl.push(HomeSearchPage, {
      value: this.from_login, doc_value: this.from_login3, pers_value: this.from_login2, appointmentType: this.appointmentType
    });
  }

  get_gen_appt_detail(appt_id) {

    if (appt_id) {

      let loading = this.loadingCtrl.create({
        content: 'Please wait...'
      });

      loading.present();

      setTimeout(() => {
        this.data.get_new_general_appointments_details(appt_id)
          .then(result => {

            console.log(result);
            var jsonBody = result["_body"];
            jsonBody = JSON.parse(jsonBody);
            this.gen_appt_details = jsonBody;
            loading.dismiss();

            console.log("Jsson body " + jsonBody);
          }, (err) => {

            loading.dismiss();
            this.showalertmessage("Ghinger", "Sorry. An Error occured. Kindly refresh and try again.");
            this.showmessage("Sorry. An Error occured. Kindly refresh and try again.");
            console.log("error = " + JSON.stringify(err));
          });

      }, 1);
      // }
    }

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

  showalertmessage_modal(titlemsg, mainmsg) {
    let alert = this.alertCtrl.create({
      title: titlemsg,
      subTitle: mainmsg,
      buttons: [
        {
          text: 'OK',
          handler: () => {
            this.closeModal();
            this.events.publish('doc_total_new_appoint_counter:refreshpage');
            this.events.publish('doc_new_appoint_counter:refreshpage');
            this.events.publish('docgeneralappointmentlists:refreshpage');
          }
        }
      ]
    });
    alert.present();
  }


}
