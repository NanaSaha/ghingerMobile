import { Component } from "@angular/core";
import { NavController, NavParams } from "ionic-angular";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import {
  ToastController,
  LoadingController,
  AlertController,
  ActionSheetController,
  Platform,
  Loading,
  ViewController,
} from "ionic-angular";
import { DataProvider } from "../../providers/data/data";

import { File } from "@ionic-native/file";
import { Transfer, TransferObject } from "@ionic-native/transfer";
import { FilePath } from "@ionic-native/file-path";
import { Camera } from "@ionic-native/camera";

import { MenuPage } from "../menu/menu";
import { Http } from "@angular/http";
import "rxjs/add/operator/map";
import { PersonalWelPage } from "../personal-wel/personal-wel";

declare var cordova: any;

@Component({
  selector: "page-book-home",
  templateUrl: "book-home.html",
})
export class BookHomePage {
  lastImage: string = null;
  loading: Loading;

  public appointForm: any;
  from_hosp: any;
  from_login: any;
  from_login2: any;
  from_login3: any;
  raw: any;
  submitAttempt: boolean = false;
  messageList: any;
  api_code: any;
  appointmentVal: any;
  jsonBody: any;
  params: any;
  params3: any;
  tryparams: any;
  body: any;
  requester_id: any;
  check: any;
  sub_id: any;
  public proposed_date: string = new Date().toISOString();
  items: any;
  filtereditems: any;
  searchTerm: string = "";
  appointmentType: any;
  minSelectabledate: any;
  maxSelectabledate: any;
  date: any;
  amount: any;
  token;

  constructor(
    private camera: Camera,
    private transfer: Transfer,
    private file: File,
    private filePath: FilePath,
    public actionSheetCtrl: ActionSheetController,
    public platform: Platform,
    public navCtrl: NavController,
    public data: DataProvider,
    public _form: FormBuilder,
    public toastCtrl: ToastController,
    public navParams: NavParams,
    public http: Http,
    public loadingCtrl: LoadingController,
    public alertCtrl: AlertController,
    public viewCtrl: ViewController
  ) {
    this.appointmentType = this.navParams.get("appointmentType");
    // console
    this.appointForm = this._form.group({
      request_cat_id: ["", Validators.compose([Validators.required])],
      beneficiary_name: [
        "",
        ExtraValidators.conditional(
          (group) => group.controls.request_cat_id.value == "T",
          Validators.compose([Validators.required])
        ),
      ],
      beneficiary_phone_number: [
        "",
        ExtraValidators.conditional(
          (group) => group.controls.request_cat_id.value == "T",
          Validators.compose([Validators.maxLength(10)])
        ),
      ],
      beneficiary_age: [
        "",
        ExtraValidators.conditional(
          (group) => group.controls.request_cat_id.value == "T",
          Validators.compose([Validators.required])
        ),
      ],

      request_urgency_id: ["", Validators.compose([Validators.required])],
      proposed_date: ["", Validators.compose([Validators.required])],
      proposed_time: ["", Validators.compose([Validators.required])],
      apt_type_id: ["HC"],
      complaint: ["", Validators.compose([Validators.required])],
      prev_history: ["", Validators.compose([Validators.required])],
      allergies: [""],
      current_medications: ["", Validators.compose([Validators.required])],
    });

    this.from_hosp = this.navParams.get("value");
    this.from_login = this.navParams.get("another");
    this.sub_id = this.navParams.get("sub_id");
    this.token = this.navParams.get("token");

    console.log("THIS IS THE SUB ID IN MED BOOK" + this.sub_id);

    var results_body = JSON.parse(this.from_login);
    var user_id = results_body["data"]["user_infos"][0].user_id;

    this.body = this.from_login;
    this.jsonBody = this.body;
    this.requester_id = user_id;

    this.date = new Date();
    this.minSelectabledate = this.formatDate(this.date);
    this.maxSelectabledate = this.formatDatemax(this.date);
  }

  filterItems() {
    console.log(this.searchTerm);
    this.filtereditems = this.items.filter((item) => {
      return (
        item.title.toLowerCase().indexOf(this.searchTerm.toLowerCase()) > -1
      );
    });
  }

  options() {
    console.log("THIS IS THE LAB SERVICES VALUE" + this.appointForm.value);
    let item = JSON.stringify(this.appointForm.value);
    console.log("LETS SEE VALUES " + item);
  }

  ionViewDidLoad() {}

  public event = {
    month: "Year-Month-Day",
    // timeStarts: '07:43',
    timeStarts: "",
    timeEnds: "1990-02-22",
  };

  book_appoint() {
    this.appointmentVal = JSON.stringify(this.appointForm.value);

    this.jsonBody = JSON.parse(this.appointmentVal);

    console.log("THIS IS THE Appoint raw values VALUES" + this.appointmentVal);
    console.log("THIS IS THE Appoint VALUES " + this.jsonBody);
    console.log("THIS IS THE PROPOSED TIME" + this.jsonBody.proposed_time);

    //NEW PARAMS -- TO SATISFY API
    this.params = {
      proposed_date: this.jsonBody.proposed_date,
      proposed_time: this.jsonBody.proposed_time,
      apt_type_id: this.jsonBody.apt_type_id,
      request_cat_id: this.jsonBody.request_cat_id,
      request_urgency_id: this.jsonBody.request_urgency_id,
      complaint: this.jsonBody.complaint,
      allergies: this.jsonBody.allergies,
      prev_history: this.jsonBody.prev_history,
      bene_name: this.jsonBody.beneficiary_name,
      bene_age: this.jsonBody.beneficiary_age,
      bene_contact: this.jsonBody.beneficiary_phone_number,
      current_medications: this.jsonBody.current_medications,
      suburb_id: this.sub_id,
    };

    console.log("PARAMS FOR APPOINTMENT " + JSON.stringify(this.params));

    let loader = this.loadingCtrl.create({
      content: "Please wait ...",
    });

    loader.present();

    this.data.homecare_appointment(this.params, this.token).then(
      (result) => {
        console.log("THIS IS THE RESULT" + result);

        loader.dismiss();

        this.navCtrl.setRoot(MenuPage, {
          value: this.from_login,
        });

        let alert = this.alertCtrl.create({
          title: "GHinger Healthcare",
          subTitle:
            "Home Care Appointment has been booked successfully. The Ghinger team will call you shortly",
          buttons: ["OK"],
        });

        alert.present();
      },
      (err) => {
        loader.dismiss();
        this.toastCtrl
          .create({
            message: "Could not process this request successfully.",
            duration: 5000,
          })
          .present();

        console.log(err);
      }
    );
  }

  formatDate(date) {
    var d = new Date(date),
      month = "" + (d.getMonth() + 1),
      day = "" + d.getDate(),
      year = d.getFullYear();

    if (month.length < 2) month = "0" + month;
    if (day.length < 2) day = "0" + day;

    console.log("year" + year + "and day = " + day);

    return [year, month, day].join("-");
  }

  formatDatemax(date) {
    var d = new Date(date),
      month = "" + d.getMonth(),
      day = "" + d.getDate(),
      year = d.getFullYear() + 1;

    console.log("year" + year + "and day = " + day);

    if (month.length < 2) month = "0" + month;
    if (day.length < 2) day = "0" + day;

    console.log("year" + year + "and day = " + day);
    return [year, month, day].join("-");
  }

  public presentActionSheet() {
    let actionSheet = this.actionSheetCtrl.create({
      title: "Select Image Source",
      buttons: [
        {
          text: "Load from Library",
          handler: () => {
            this.takePicture(this.camera.PictureSourceType.PHOTOLIBRARY);
          },
        },
        {
          text: "Use Camera",
          handler: () => {
            this.takePicture(this.camera.PictureSourceType.CAMERA);
          },
        },
        {
          text: "Cancel",
          role: "cancel",
        },
      ],
    });
    actionSheet.present();
  }

  public takePicture(sourceType) {
    // Create options for the Camera Dialog
    var options = {
      quality: 100,
      sourceType: sourceType,
      saveToPhotoAlbum: false,
      correctOrientation: true,
    };

    // Get the data of an image
    this.camera.getPicture(options).then(
      (imagePath) => {
        // Special handling for Android library
        if (
          this.platform.is("android") &&
          sourceType === this.camera.PictureSourceType.PHOTOLIBRARY
        ) {
          this.filePath.resolveNativePath(imagePath).then((filePath) => {
            let correctPath = filePath.substr(0, filePath.lastIndexOf("/") + 1);
            let currentName = imagePath.substring(
              imagePath.lastIndexOf("/") + 1,
              imagePath.lastIndexOf("?")
            );
            this.copyFileToLocalDir(
              correctPath,
              currentName,
              this.createFileName()
            );
          });
        } else {
          var currentName = imagePath.substr(imagePath.lastIndexOf("/") + 1);
          var correctPath = imagePath.substr(0, imagePath.lastIndexOf("/") + 1);
          this.copyFileToLocalDir(
            correctPath,
            currentName,
            this.createFileName()
          );
        }
      },
      (err) => {
        this.presentToast("Error while selecting image.");
      }
    );
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
    this.file
      .copyFile(namePath, currentName, cordova.file.dataDirectory, newFileName)
      .then(
        (success) => {
          this.lastImage = newFileName;
        },
        (error) => {
          this.presentToast("Error while storing file.");
        }
      );
  }

  private presentToast(text) {
    let toast = this.toastCtrl.create({
      message: text,
      duration: 3000,
      position: "top",
    });
    toast.present();
  }

  // Always get the accurate path to your apps folder
  public pathForImage(img) {
    if (img === null) {
      return "";
    } else {
      return cordova.file.dataDirectory + img;
    }
  }

  public uploadImage() {
    // Destination URL
    // var url = "http://yoururl/upload.php";

    var url = "https://api.ghingerhealth.com/save_image";

    // File for Upload
    var targetPath = this.pathForImage(this.lastImage);
    console.log("LETS SEE THE TARGET PATH" + targetPath);

    // File name only
    var filename = this.lastImage;
    console.log("LETS SEE THE FILE ABOUT TO BE UPLOADED" + filename);

    //options
    var options = {
      fileKey: "fileName",
      fileName: filename,
      chunkedMode: false,
      mimeType: "multipart/form-data",
      params: { fileName: filename },
    };

    const fileTransfer: TransferObject = this.transfer.create();

    this.loading = this.loadingCtrl.create({
      content: "Uploading...",
    });
    this.loading.present();

    // Use the FileTransfer to upload the image
    fileTransfer.upload(targetPath, url, options).then(
      (data) => {
        console.log("LETS SEE THE DATA COMING" + data);
        console.log("LETS SEE THE DATA COMING IN JSON" + JSON.stringify(data));
        this.loading.dismissAll();
        this.presentToast("Image uploaded successfully.");
      },
      (err) => {
        this.loading.dismissAll();
        this.presentToast("Error while uploading file.");
      }
    );
  }

  home() {
    this.navCtrl.setRoot(MenuPage);
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
    control._parent.valueChanges
      .distinctUntilChanged((a, b) => {
        // These will always be plain objects coming from the form, do a simple comparison
        if ((a && !b) || (!a && b)) {
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
