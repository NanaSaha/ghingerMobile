import { Component } from '@angular/core';
import { NavController, NavParams, App } from 'ionic-angular';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { DataProvider } from '../../providers/data/data';
import { MenuPage } from '../menu/menu';
import { Http } from '@angular/http';
import 'rxjs/add/operator/map';
// import { PatientDetailsPage } from '../patient-details/patient-details';
import { File } from '@ionic-native/file';
import { Transfer, TransferObject } from '@ionic-native/transfer';
import { FilePath } from '@ionic-native/file-path';
import { Camera } from '@ionic-native/camera';
import { ToastController, LoadingController, AlertController, ActionSheetController, Platform, Loading } from 'ionic-angular';
import { Storage } from '@ionic/storage';
import moment from 'moment';

import 'rxjs/add/operator/distinctUntilChanged';

import pdfMake from 'pdfmake/build/pdfmake';
import pdfFonts from 'pdfmake/build/vfs_fonts';
pdfMake.vfs = pdfFonts.pdfMake.vfs;
import { FileOpener } from '@ionic-native/file-opener';
import { EmailComposer } from '@ionic-native/email-composer';

declare var cordova: any;

@Component({
  selector: 'placeorderforpatient',
  templateUrl: 'placeorderforpatient.html',
})


export class Placeorderforpatient {
  public appointForm: any;
  from_hosp: any;
  from_login: any;
  from_login2: any;
  from_login3: any;
  raw: any;
  alph: any;
  submitAttempt: boolean = false;
  messageList: any;
  api_code: any;
  appointmentVal: any;
  jsonBody: any;
  params: any;
  body: any;
  requester_id: any;
  sub_id: any;
  minSelectabledate: any;
  date: any;
  appointment_types: any;
  service_providers: any;
  patient_id: any;
  doctor_id: any;
  patient_name: any;
  patient_age: any;
  doctor_name: any;

  loading: Loading;
  lastImage: string = null;
  preparedTags = [
    "Ionic",
    "Angular",
    "Javascript",
    "Mobile",

  ]

  pdfObj = null;


  private foo: boolean = false;
  private bar: boolean = true;

  // private conditions: any = {
  //   condition1: foo,
  //   condition2: !bar
  // };



  constructor(public app: App, public navCtrl: NavController, public data: DataProvider, public _form: FormBuilder, public toastCtrl: ToastController, public navParams: NavParams, public http: Http, public loadingCtrl: LoadingController, public alertCtrl: AlertController, private camera: Camera, private transfer: Transfer, private file: File, private filePath: FilePath, public actionSheetCtrl: ActionSheetController, public platform: Platform, private fileOpener: FileOpener, public storage: Storage, private emailComposer: EmailComposer) {


    this.appointForm = this._form.group({
      // "service_provider": ["", Validators.compose([Validators.required])],
      "appointment_type_id": ["", Validators.compose([Validators.required])],
      "requester_cat": ['',
        ExtraValidators.conditional(
          group => group.controls.appointment_type_id.value != 'PDDP',
          Validators.compose([
            Validators.required,
            // Validators.minLength(6)
          ])
        ),
      ],
      // "requester_cat": ["", Validators.compose([Validators.required])],
      "beneficiary_name": ["",
        ExtraValidators.conditional(group => group.controls.requester_cat.value == 'T', Validators.compose([Validators.required])),
      ],
      "beneficiary_phone_number": ["",
        ExtraValidators.conditional(group => group.controls.requester_cat.value == 'T', Validators.compose([Validators.maxLength(10)])),
      ],
      "beneficiary_age": ['',
        ExtraValidators.conditional(group => group.controls.requester_cat.value == 'T', Validators.compose([Validators.required])),
      ],
      "beneficiary_gender": ['',
        ExtraValidators.conditional(group => group.controls.requester_cat.value == 'T', Validators.compose([Validators.required])),
      ],
      // "req_urgency": ["", Validators.compose([Validators.required])],
      "req_urgency": ['',
        ExtraValidators.conditional(
          group => group.controls.appointment_type_id.value != 'PDDP',
          Validators.compose([
            Validators.required
          ])
        ),
      ],
      // "proposed_date": ["", Validators.compose([Validators.required])],
      "proposed_date": ['',
        ExtraValidators.conditional(
          group => group.controls.appointment_type_id.value != 'PDDP',
          Validators.compose([Validators.required])
        ),
      ],
      // "proposed_time": ["", Validators.compose([Validators.required])],
      "proposed_time": ['',
        ExtraValidators.conditional(
          group => group.controls.appointment_type_id.value != 'PDDP',
          Validators.compose([Validators.required])
        ),
      ],

      // "complaint_desc": ["", Validators.compose([Validators.required])],
      "complaint_desc": ['',
        ExtraValidators.conditional(
          group => group.controls.appointment_type_id.value != 'PDDP',
          Validators.compose([Validators.required])
        ),
      ],
      // "prev_medical_history": ["", Validators.compose([Validators.required])],
      "prev_medical_history": ['',
        ExtraValidators.conditional(
          group => group.controls.appointment_type_id.value != 'PDDP', Validators.compose([Validators.required])
        ),
      ],
      "remark": [""],
      "test_list": ['',
        ExtraValidators.conditional(
          group => group.controls.appointment_type_id.value == 'LA', Validators.compose([Validators.required])
        ),
      ],
      "allergies": [""],
      "prescription_name": ['', ExtraValidators.conditional(group => group.controls.appointment_type_id.value == 'PDDP', Validators.compose([Validators.required,])),],
      "drugs_quantity": ['', ExtraValidators.conditional(group => group.controls.appointment_type_id.value == 'PDDP', Validators.compose([Validators.required,])),],
      "drugs_dosage": ['', ExtraValidators.conditional(group => group.controls.appointment_type_id.value == 'PDDP', Validators.compose([Validators.required,])),],
      "drugs_frequency": ['', ExtraValidators.conditional(group => group.controls.appointment_type_id.value == 'PDDP', Validators.compose([Validators.required,])),],
      "number_of_days": ['',
        ExtraValidators.conditional(
          group => group.controls.appointment_type_id.value == 'PDDP',
          Validators.compose([
            Validators.required,
            // Validators.minLength(6)
          ])
        ),
      ]


    });



    // function conditionalRequired(conditions: any) {

    //   return (control: Control): { [s: string]: boolean } => {
    //     let required: boolean = true;
    //     for (var elt in conditions) {
    //       var condition = conditions[elt];
    //       if (conditions === false) {
    //         required = false;
    //       }
    //     }
    //     if (required && !control.value) {
    //       return { required: true };
    //     }
    //   }
    // }

    // this.appointForm = this._form.group({

    //       'requester_cat': ['', Validators.compose([
    //         conditionalRequired(conditions)
    //       ])],
    //       ...
    // });

    this.storage.get('doctor_name').then((doctor_name) => {
      this.doctor_name = doctor_name;
      console.log(' Placeorderforpatient doctor_name = ' + doctor_name);
    });

    this.getappointmenttypes();
    this.getserviceproviders();

    this.patient_id = this.navParams.get('patient_id');
    this.patient_name = this.navParams.get('patient_name');
    this.doctor_id = this.navParams.get('doc_id');


    this.from_hosp = this.navParams.get('value');
    this.from_login = this.navParams.get('another');
    this.sub_id = this.navParams.get('sub_id');

    this.from_login2 = this.navParams.get('pers_value');
    this.from_login3 = this.navParams.get('doc_value');

    this.showvalues1();

    this.body = this.from_login; // this.body = Array.of(this.from_login);

    if (this.body) {
      this.jsonBody = this.body; // this.jsonBody = JSON.parse(this.body);
      if (this.jsonBody[0]) {
        this.requester_id = this.jsonBody[0].id;
        if (this.requester_id) {
          console.log("THIS IS THE requester_id ID is " + this.requester_id);
        }
      }
    }

    if (this.sub_id) {
      console.log("THIS IS SUBUR ID CONSTRUCTOR " + this.sub_id);
    }
    if (this.from_hosp) {
      this.raw = this.from_hosp;
    }
    // this.raw = JSON.stringify(this.from_hosp);

    this.body = this.from_login; // this.body = Array.of(this.from_login);

    this.jsonBody = this.body; // this.jsonBody = JSON.parse(this.body);

    console.log('Raw values from Hospital ' + this.raw);
    console.log('from Hospital ' + this.from_hosp);
    console.log('from LOgin' + this.from_login);

    this.date = new Date();
    this.minSelectabledate = this.formatDate(this.date);

  }


  showvalues1() {
    console.log('-----------------------Book Med Appt Page -----------------------');
    console.log("this.from_login = " + this.from_login);
    console.log("this.from_login_doc = " + this.from_login3);
    console.log("this.from_login_pers = " + this.from_login2);
    console.log('-----------------------Book Med Appt Page -----------------------');
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad BookMedPage');
  }

  public event = {
    month: 'Year-Month-Day',
    // timeStarts: '07:43',
    timeStarts: '',
    timeEnds: '1990-02-20'
  }


  book_appoint() {

    // console.log()
    // this.showvalues();
    // this.navigate_to_Menu_page();

    this.appointmentVal = JSON.stringify(this.appointForm.value);
    this.jsonBody = JSON.parse(this.appointmentVal);

    console.log("THIS IS THE Appoint raw values VALUES" + this.appointmentVal)
    console.log("THIS IS THE Appoint VALUES " + this.jsonBody)
    console.log("THIS IS THE Provider ID " + this.from_hosp)
    console.log("THIS IS THE REQUESTER ID" + this.requester_id)
    console.log("THIS IS THE PROPOSED TIME" + this.jsonBody.proposed_time)
    console.log("THIS IS SUBUR ID" + this.sub_id)
    console.log("THIS IS THE ALERGIES" + this.jsonBody.allergies)

    this.params = {
      "suburb_id": this.sub_id,
      // "provider_id": this.jsonBody.service_provider,
      "requester_id": this.patient_id,
      "user_id": this.doctor_id,
      "requester_cat": this.jsonBody.requester_cat,
      "beneficiary_name": this.jsonBody.beneficiary_name,
      "beneficiary_gender": this.jsonBody.beneficiary_gender,
      "beneficiary_age": this.jsonBody.beneficiary_age,
      "beneficiary_phone_number": this.jsonBody.beneficiary_phone_number,
      "req_urgency": this.jsonBody.req_urgency,
      "appointment_type_id": this.jsonBody.appointment_type_id,
      "proposed_date": this.jsonBody.proposed_date + " " + this.jsonBody.proposed_time,
      "complaint_desc": this.jsonBody.complaint_desc,
      "prev_medical_history": this.jsonBody.prev_medical_history,
      "remark": this.jsonBody.remark,
      "allergies": this.jsonBody.allergies
    }

    console.log("this.params = " + JSON.stringify(this.params));

    let loader = this.loadingCtrl.create({
      content: "Please wait ..."
    });
    loader.present();

    this.data.appointment(this.params).then((result) => {

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
          title: "",
          subTitle: this.messageList,
          buttons: [
            {
              text: 'OK',
              handler: () => {
                // this.navCtrl.push(PatientDetailsPage);
                this.navCtrl.pop();
              }
            }
          ]
        });
        alert.present();
      }

      // console.log(this.app.getRootNav());
      //this.alph = this.app.getRootNavs()

      //this.alph =  this.app.getRootNavById('n4')
      // this.alph[0].setRoot(MenuPage, { value: this.from_login,doc_value: this.from_login3,pers_value: this.from_login2 });

      //this.navCtrl.popToRoot()

    }, (err) => {
      loader.dismiss();
      this.toastCtrl.create({
        message: "Could not complete this request successfully.",
        duration: 5000
      }).present();

      console.log(err);
    });

  }

  navigate_to_Menu_page() {
    console.log('--------------Moving to Menu -------------------');
    console.log("this.from_login = " + this.from_login);
    console.log("this.from_login3 = " + this.from_login3);
    console.log("this.from_login2 = " + this.from_login2);
    console.log('--------------Moving to Menu End -------------------');
    this.navCtrl.setRoot(MenuPage, { value: this.from_login, doc_value: this.from_login3, pers_value: this.from_login2 });
  }

  showvalues() {
    // this.from_login);
    // console.log("this.from_login_doc = "+ this.from_login3);
    // console.log("this.from_login_pers = "+ this.from_login2);

    console.log("this.from_login = " + this.from_login);
    console.log("this.from_login3 = " + this.from_login3);
    console.log("this.from_login2 = " + this.from_login2);
    // console.log("this.from_login = "+ this.from_login);
  }


  getappointmenttypes() {

    this.data.get_appointment_types1().then((result) => {

      console.log("RESULTS IS " + result);
      var body = result["_body"];
      console.log("result body = " + JSON.stringify(result["_body"]));
      body = JSON.parse(body);
      this.appointment_types = body;
      console.log("RESULTS IS " + this.appointment_types);
      this.body = Array.of(this.appointment_types);

    }, (err) => {
      console.log(err);
    });
  }

  getserviceproviders() {

    this.data.get_service_providers().then((result) => {

      console.log("RESULTS IS " + result);
      var body = result["_body"];
      console.log("result body = " + JSON.stringify(result["_body"]));
      body = JSON.parse(body);
      this.service_providers = body;
      console.log("RESULTS IS " + this.service_providers);
      this.body = Array.of(this.service_providers);

    }, (err) => {
      console.log(err);
    });
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


  formatDate(date) {
    var d = new Date(date),
      month = '' + (d.getMonth() + 1),
      day = '' + (d.getDate()),
      year = d.getFullYear();

    // console.log("year" + year + "and day = " + day);


    if (month.length < 2) month = '0' + month;
    if (day.length < 2) day = '0' + day;

    console.log("year" + year + "and day = " + day);

    return [year, month, day].join('-');
  }

  formatDatemax(date) {
    var d = new Date(date),
      month = '' + (d.getMonth() + 1),
      day = '' + (d.getDate() - 14),
      year = d.getFullYear();

    console.log("year" + year + "and day = " + day);


    if (month.length < 2) month = '0' + month;
    if (day.length < 2) day = '0' + day;

    console.log("year" + year + "and day = " + day);

    return [year, month, day].join('-');
  }

  closeModal() {
    // this.viewCtrl.dismiss();
  }



  createPdf() {

    if (!this.patient_name) {
      this.patient_name = "";
    }

    if (!this.doctor_name) {
      this.doctor_name = "";
    }

    console.log("PDF Created");
    var docDefinition = {
      content: [
        { text: 'PRESCRIPTION', style: 'header' },
        { text: moment().format('MMMM Do, YYYY'), alignment: 'right' },

        // { text: 'From', style: 'subheader' },
        // { text: this.appointForm.value.prescription_name },

        { text: 'Patient Name: ' + this.patient_name, style: 'subheader' },
        { text: 'Patient Age: ' + this.patient_age, style: 'subheader' },

        // { text: ' ', style: 'subheader' },
        // { text: ' ', style: 'subheader' },
        // this.appointForm.value.prescription_name,

        // { text: this.appointForm.value.prescription_name, style: 'story', margin: [0, 20, 0, 20] },

        // {
        //   ul: [
        //     'Bacon',
        //     'Rips',
        //     'BBQ',
        //   ]
        // },

        { text: 'Prescription: ' + this.appointForm.value.prescription_name, style: 'body' },
        // { text: 'Quantity: ' + this.appointForm.value.drugs_quantity, style: 'body' },
        { text: 'Dosage: ' + this.appointForm.value.drugs_dosage, style: 'body' },
        { text: 'Frequency per day: ' + this.appointForm.value.drugs_frequency, style: 'body' },
        { text: 'Number of days: ' + this.appointForm.value.number_of_days, style: 'body' },


        { text: 'Signature: ', style: 'signature' },
        { text: '...........................', style: 'signature' },
        { text: "Dr. " + this.doctor_name, style: 'signature' },
        { text: 'RG843208432 ', style: 'signature' },
        { text: '0541840988 ', style: 'signature' },

      ],
      styles: {
        header: {
          fontSize: 28,
          bold: true,
          alignment: 'center',
        },
        subheader: {
          fontSize: 24,
          bold: true,
          margin: [15, 15, 15, 15]
        },
        body: {
          fontSize: 24,
          italic: true,
          alignment: 'left',
          width: '100%',
        },
        story: {
          fontSize: 24,
          italic: true,
          alignment: 'center',
          width: '50%',
        },
        signature: {
          fontSize: 24,
          italic: true,
          alignment: 'right',
          width: '50%',
        }
      }
    }
    this.pdfObj = pdfMake.createPdf(docDefinition);
    this.downloadPdf();
  }

  downloadPdf() {
    if (this.platform.is('cordova')) {
      this.pdfObj.getBuffer((buffer) => {
        var blob = new Blob([buffer], { type: 'application/pdf' });

        // Save the PDF to the data Directory of our App
        this.file.writeFile(this.file.dataDirectory, 'prescription.pdf', blob, { replace: true }).then(fileEntry => {
          // Open the PDf with the correct OS tools
          this.fileOpener.open(this.file.dataDirectory + 'prescription.pdf', 'application/pdf');
        })
      });
    } else {
      // On a browser simply use download!
      this.pdfObj.download();
    }
  }

  emailPdf() {

    let confirm = this.alertCtrl.create({
      title: 'Email File?',
      message: 'Are you sure you want to send this prescription file to ' + this.patient_name + ' via Email? You can click No and then click on the Create Pdf button  in order to preview the file first.',
      buttons: [
        {
          text: 'No',
          handler: () => {
            // console.log('Disagree clicked');
            // this.storage.set("user_login_type Doctor Patient

            // this.navCtrl.pop();

            // if(this.user_login_type){
            //   if(this.user_login_type == "Doctor"){
            //     this.navCtrl.push(DoctorHomePage);
            //   }
            //   else if(this.user_login_type == "Patient"){
            //     this.navCtrl.push(MenuPage);
            //   }

            // }


          }
        },
        {
          text: 'Yes',
          handler: () => {
            let loader = this.loadingCtrl.create({
              content: "Sending email...",
              duration: 5000
            });

            loader.present();

            setTimeout(() => {
              console.log("sending file via email");
              this.email_func();
            }, 3);

            setTimeout(() => {
              loader.dismiss();
            }, 3);

          }
        }
      ]
    });
    confirm.present();
  }


  email_func() {

    this.emailComposer.isAvailable().then((available: boolean) => {
      if (available) {
        //Now we know we can send

        // Send a text message using default options

      }
    });

    let email = {
      to: 'padmorey@gmail.com',
      cc: 'padmore@appsnmobilesolutions.com',
      //  bcc: ['john@doe.com', 'jane@doe.com'],
      attachments: [
        'file://img/logo.png',
        'res://icon.png',
        //  'base64:icon.png//iVBORw0KGgoAAAANSUhEUg...',
        'file://README.pdf',
        this.file.dataDirectory + 'prescription.pdf',
      ],
      subject: 'Prescription',
      body: 'Hello ' + this.patient_name + ', you can find below a copy of your prescriptions. Kindly adhere to the instructions given. Have a lovely day. Dr. ' + this.doctor_name,
      isHtml: true
    };

    this.emailComposer.open(email);
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
