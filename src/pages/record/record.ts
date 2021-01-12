import { Component, ViewChild } from '@angular/core';
import { MenuController,NavController, NavParams, ViewController ,App} from 'ionic-angular';
import { ToastController, LoadingController, AlertController, ModalController } from 'ionic-angular';
import { DataProvider } from '../../providers/data/data';
import { Http } from '@angular/http';
// import { Keyboard } from '@ionic-native/keyboard';
import 'rxjs/add/operator/map';


@Component({
  selector: 'page-record',
  templateUrl: 'record.html',
})
export class RecordPage {
    public record: any;
 from_login: any = [];
  messageList: any;
  api_code: any;
  location: any;
  displayData: any;
  check: any;
  from_menu: any = [];
  body: any;
  body2: any;
  jsonBody: any;
  params: any = [];
  doctor_id: any;
  data: any = [];
  requester_id: any;
  doc_id: any;
  recordValue: any;
  doc_details: any;
  retrieve: any;
  item_list: any;
  record_list: any;

 constructor(public app: App,public menu: MenuController,public toastCtrl: ToastController, public navCtrl: NavController, public navParams: NavParams, public data1: DataProvider, public loadingCtrl: LoadingController, public alertCtrl: AlertController,public modalCtrl: ModalController, public viewCtrl: ViewController) {

     this.check = this.navParams.get('value')
     this.data = this.navParams.get('user_data')
     this.doc_details = this.navParams.get('doc_details')
     this.retrieve = this.navParams.get('retrieve')
     this.item_list = this.navParams.get('item_list')
    console.log('VALUE IN PATIENT DETAIL CONSTRUCTOR IS' + this.check); 
    console.log("Value of User data in patient details page is " + this.data)
     console.log("Value of doc_details in patient details page is " + this.doc_details)
     console.log("Value of item list in patient details page is " + this.item_list)

     this.record_list = Array.of(this.item_list)
     console.log("Value of item list in patient details page is " + this.record_list)
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad RecordPage');
  }


  closeModal() {
    this.viewCtrl.dismiss();
  }

}
