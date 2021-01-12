import { Component, ViewChild } from '@angular/core';
import { MenuController, NavController, NavParams, ViewController, App } from 'ionic-angular';
import { ToastController, LoadingController, AlertController, ActionSheetController, Platform, Loading, ModalController } from 'ionic-angular';
import { DataProvider } from '../../providers/data/data';
import { Http } from '@angular/http';
// import { Keyboard } from '@ionic-native/keyboard';
import 'rxjs/add/operator/map';
import { MenuPage } from '../menu/menu';
import { FormBuilder, Validators } from "@angular/forms";
import { PersonalWelPage } from "../personal-wel/personal-wel";
import { File } from '@ionic-native/file';
import { Transfer, TransferObject } from '@ionic-native/transfer';
import { FilePath } from '@ionic-native/file-path';
import { Camera } from '@ionic-native/camera';
import { IonicSelectableComponent } from 'ionic-selectable';

class Port {
  public id: number;
  public name: string;
  public price: string;
}
declare var cordova: any;

@Component({
  selector: 'page-prescription',
  templateUrl: 'prescription.html',
})
export class PrescriptionPage {
  ports: Port[];
  port: Port;
  lastImage: string = null;
  loading: Loading;

  messageList: any;
  api_code: any;
  location: any;
  displayData: any;
  check: any;
  from_menu: any = [];
  body: any;
  jsonBody: any;
  jsonBody3: any;
  params: any = [];
  params2: any = [];
  from_login: any = [];
  from_login_doc: any = [];
  from_login_pers: any = [];
  sub_id: any;
  string: any;
  medication: any;
  med_history: any;
  med_duration: any;
  email: any;
  requester_id: any;
  req_urgency: any;
  requester_cat: any;
  prescriptionVal: any;
  public prescriptionForm: any;
  submitAttempt: boolean = false;

  constructor(public toastCtrl: ToastController, public navCtrl: NavController, public navParams: NavParams, public data: DataProvider, public loadingCtrl: LoadingController, public _form: FormBuilder, public alertCtrl: AlertController, public modalCtrl: ModalController, public platform: Platform, public viewCtrl: ViewController, private camera: Camera, private transfer: Transfer, private file: File, private filePath: FilePath, public actionSheetCtrl: ActionSheetController) {

    this.from_login = this.navParams.get('value')
    this.from_login_doc = this.navParams.get('doc_value')
    this.from_login_pers = this.navParams.get('pers_value');
    this.requester_id = this.navParams.get('requester_id');

    this.prescriptionForm = this._form.group({

      "requester_cat": ["", Validators.compose([Validators.required])],
      "beneficiary_name": ["",
        ExtraValidators.conditional(group => group.controls.requester_cat.value == 'T', Validators.compose([Validators.required])),
      ],
      "beneficiary_phone_number": ["",
        ExtraValidators.conditional(group => group.controls.requester_cat.value == 'T', Validators.compose([Validators.maxLength(10)])),
      ],
      "beneficiary_age": ['',
        ExtraValidators.conditional(group => group.controls.requester_cat.value == 'T', Validators.compose([Validators.required])),
      ],

      "req_urgency": ["", Validators.compose([Validators.required])],
      // "appointment_type_id": [this.appointmentType],
      "medication": [""],
      "allergies": ["", Validators.compose([Validators.required])],
      "prev_medical_history": ["", Validators.compose([Validators.required])],
      "med_duration": [""],

    });

    let loading = this.loadingCtrl.create({
      content: 'Please wait...'
    });

    loading.present();

    setTimeout(() => {

      this.data.get_drug_services().then((result) => {

        console.log("RESULTS IS " + result);
        console.log("RESULTS IS" + this.data.get_drug_services());
        var body = result["_body"];
        body = JSON.parse(body);
        this.check = body
        console.log("LETS SEE ARRAY OF CHECK " + this.check);
        console.log("LETS SEE STRINGIFY OF CHECK " + JSON.stringify(this.check));
        this.body = Array.of(this.check)


     

      }, (err) => {

        loading.dismiss();
        console.log(err);
      });

      loading.dismiss();

    }, 1);


  }

 

  portChange(event: {
    component: IonicSelectableComponent,
    value: any 
  }) {
    console.log('port:', event.value);
  }


  submit() {


    // this.from_login = this.navParams.get('value')
    console.log('VALUE IN TABS CONSTRUCTOR IS' + JSON.stringify(this.from_login));
    this.prescriptionVal = JSON.stringify(this.prescriptionForm.value);

    this.jsonBody3 = JSON.parse(this.prescriptionVal);

    if (!this.jsonBody3.medication) {
      
        this.showmessage("Kindly provide your list of medication by either selecting from the list or typing in the textfield");
        return
    
    }

    console.log("THIS IS THE REquester ID " + this.requester_id)

    this.params2 = {
      "requester_id": this.requester_id,
      "appointment_type_id": "PDDP",
      "medication": this.jsonBody3.medication,
      "duration": this.jsonBody3.med_duration,
      "req_urgency": this.jsonBody3.req_urgency,
      "requester_cat": this.jsonBody3.requester_cat,
      "prev_medical_history": this.jsonBody3.prev_medical_history,
      "allergies": this.jsonBody3.allergies,


      "beneficiary_name": this.jsonBody3.beneficiary_name,

      "beneficiary_age": this.jsonBody3.beneficiary_age,
      "beneficiary_phone_number": this.jsonBody3.beneficiary_phone_number,

    }

    console.log("LETS SEE ALL THE PARAMS " + JSON.stringify(this.params2));

    console.log("LETS SEE ALL THE PARAMS " + JSON.stringify(this.params2));

    let loader = this.loadingCtrl.create({
      content: "Please wait ..."

    });

    loader.present();

    this.data.prescription(this.params2).then((result) => {

      console.log("THIS IS THE RESULT" + result);
      var jsonBody = result["_body"];
      console.log(jsonBody);

      jsonBody = JSON.parse(jsonBody);
      console.log(jsonBody)


      var desc = jsonBody["resp_desc"];
      var code = jsonBody["resp_code"];


      console.log(desc);
      console.log(code);

      this.messageList = desc;
      this.api_code = code;

      loader.dismiss();



      if (this.api_code == "000") {
        let alert = this.alertCtrl.create({
          title: '',
          subTitle: "Prescriptions requested Successfully. You would be contacted shortly. Thank you!",
          buttons: ['OK']
        });


        this.navCtrl.setRoot(MenuPage, { value: this.from_login, doc_value: this.from_login_doc, pers_value: this.from_login_pers });
        alert.present();

      }

      if (this.api_code == "555") {
        let alert = this.alertCtrl.create({
          title: '',
          subTitle: "Prescriptions requested Successfully. You would be contacted shortly. Thank you!",
          buttons: ['OK']
        });

        this.navCtrl.setRoot(MenuPage, { value: this.from_login, doc_value: this.from_login_doc, pers_value: this.from_login_pers });

        alert.present();
      } else {
        let alert = this.alertCtrl.create({
          title: "",
          subTitle: this.messageList,
          buttons: ['OK']
        });
        alert.present();
        // loader.dismiss();
      }

    }, (err) => {
      loader.dismiss();
      this.toastCtrl.create({
        message: "Could not process this request successfully.",
        duration: 5000
      }).present();

      console.log(err);
    });

  }



  showmessage(message) {
    let alert = this.alertCtrl.create({
      title: "Prescription Order",
      subTitle: message,
      buttons: [
        {
          text: 'OK', handler: () => { }
        }

      ]
    });
    alert.present();
  }









  public presentActionSheet() {
    let actionSheet = this.actionSheetCtrl.create({
      title: 'Select Image Source',
      buttons: [
        {
          text: 'Load from Library',
          handler: () => {
            this.takePicture(this.camera.PictureSourceType.PHOTOLIBRARY);
          }
        },
        {
          text: 'Use Camera',
          handler: () => {
            this.takePicture(this.camera.PictureSourceType.CAMERA);
          }
        },
        {
          text: 'Cancel',
          role: 'cancel'
        }
      ]
    });
    actionSheet.present();
  }

  public takePicture(sourceType) {
    // Create options for the Camera Dialog
    var options = {
      quality: 100,
      sourceType: sourceType,
      saveToPhotoAlbum: false,
      correctOrientation: true
    };

    // Get the data of an image
    this.camera.getPicture(options).then((imagePath) => {
      // Special handling for Android library
      if (this.platform.is('android') && sourceType === this.camera.PictureSourceType.PHOTOLIBRARY) {
        this.filePath.resolveNativePath(imagePath)
          .then(filePath => {
            let correctPath = filePath.substr(0, filePath.lastIndexOf('/') + 1);
            let currentName = imagePath.substring(imagePath.lastIndexOf('/') + 1, imagePath.lastIndexOf('?'));
            this.copyFileToLocalDir(correctPath, currentName, this.createFileName());
          });
      } else {
        var currentName = imagePath.substr(imagePath.lastIndexOf('/') + 1);
        var correctPath = imagePath.substr(0, imagePath.lastIndexOf('/') + 1);
        this.copyFileToLocalDir(correctPath, currentName, this.createFileName());
      }
    }, (err) => {
      this.presentToast('Error while selecting image.');
    });
  }

  // Create a new name for the image
  private createFileName() {
    var d = new Date(),
      n = d.getTime(),
      newFileName = n + ".jpg";
    return newFileName;
  }

  // Copy the image to a local folder
  private copyFileToLocalDir(namePath, currentName, newFileName) {
    this.file.copyFile(namePath, currentName, cordova.file.dataDirectory, newFileName).then(success => {
      this.lastImage = newFileName;
    }, error => {
      this.presentToast('Error while storing file.');
    });
  }

  private presentToast(text) {
    let toast = this.toastCtrl.create({
      message: text,
      duration: 3000,
      position: 'top'
    });
    toast.present();
  }

  // Always get the accurate path to your apps folder
  public pathForImage(img) {
    if (img === null) {
      return '';
    } else {
      return cordova.file.dataDirectory + img;
    }
  }

  public uploadImage() {
    // Destination URL
    // var url = "http://yoururl/upload.php";

    var url = "http://67.205.74.208:6099/save_image";

    // File for Upload
    var targetPath = this.pathForImage(this.lastImage);
    console.log("LETS SEE THE TARGET PATH" + targetPath)

    // File name only
    var filename = this.lastImage;
    console.log("LETS SEE THE FILE ABOUT TO BE UPLOADED" + filename)


    //options
    var options = {
      fileKey: "fileName",
      fileName: filename,
      chunkedMode: false,
      mimeType: "multipart/form-data",
      params: { 'fileName': filename }

    };

    const fileTransfer: TransferObject = this.transfer.create();

    this.loading = this.loadingCtrl.create({
      content: 'Uploading...',
    });
    this.loading.present();

    // Use the FileTransfer to upload the image
    fileTransfer.upload(targetPath, url, options).then(data => {

      console.log("LETS SEE THE DATA COMING" + data)
      console.log("LETS SEE THE DATA COMING IN JSON" + JSON.stringify(data));
      this.loading.dismissAll()
      this.presentToast('Image uploaded successfully.');
    }, err => {

      this.loading.dismissAll()
      this.presentToast('Error while uploading file.');
    });
  }


  closeModal() {


    this.viewCtrl.dismiss();
  }




}


export class ExtraValidators {
  static conditional(conditional, validator) {
    return function (control) {
      revalidateOnChanges(control);

      if (control && control._parent) {
        if (conditional(control._parent)) {
          return validator(control);
        }
      }
    };
  }
}

function revalidateOnChanges(control): void {
  if (control && control._parent && !control._revalidateOnChanges) {
    control._revalidateOnChanges = true;
    control._parent
      .valueChanges
      .distinctUntilChanged((a, b) => {
        // These will always be plain objects coming from the form, do a simple comparison
        if (a && !b || !a && b) {
          return false;
        } else if (a && b && Object.keys(a).length !== Object.keys(b).length) {
          return false;
        } else if (a && b) {
          for (let i in a) {
            if (a[i] !== b[i]) {
              return false;
            }
          }
        }
        return true;
      })
      .subscribe(() => {
        control.updateValueAndValidity();
      });

    control.updateValueAndValidity();
  }
  return;
}



