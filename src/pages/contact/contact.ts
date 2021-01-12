import { Component, OnInit, ChangeDetectorRef } from "@angular/core";
import { NavController, NavParams, App } from "ionic-angular";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import {
  ToastController,
  LoadingController,
  AlertController,
  ActionSheetController,
  Platform,
  Loading,
} from "ionic-angular";
import {
  FileTransfer,
  FileUploadOptions,
  FileTransferObject,
} from "@ionic-native/file-transfer";
import { File, FileEntry } from "@ionic-native/file";
import { Transfer, TransferObject } from "@ionic-native/transfer";
import { FilePath } from "@ionic-native/file-path";
import { Camera } from "@ionic-native/camera";
import { Storage } from "@ionic/storage";
import { WebView } from "@ionic-native/ionic-webview/ngx";
import { text } from "@angular/core/src/render3/instructions";

const STORAGE_KEY = "my_images";

@Component({
  selector: "page-contact",
  templateUrl: "contact.html",
})
export class ContactPage implements OnInit {
  images = [];

  constructor(
    private ref: ChangeDetectorRef,
    public webview: WebView,
    public fileTransfer: FileTransfer,
    public app: App,
    private camera: Camera,
    private transfer: Transfer,
    private file: File,
    private filePath: FilePath,
    public actionSheetCtrl: ActionSheetController,
    public platform: Platform,
    public navCtrl: NavController,
    public toastCtrl: ToastController,
    public navParams: NavParams,
    public loadingCtrl: LoadingController,
    public alertCtrl: AlertController,
    public storage: Storage
  ) {
    console.log("CONSTRUCTIOR LOADING STORED IMAGES");
    console.log(this.loadStoredImages());
    this.loadStoredImages();
  }

  ngOnInit() {
    this.platform.ready().then(() => {
      console.log("LOADING STORED IMAGES");
      console.log(this.loadStoredImages());
      this.loadStoredImages();
    });
  }

  loadStoredImages() {
    this.storage.get(STORAGE_KEY).then((images) => {
      if (images) {
        let arr = JSON.parse(images);
        //this.images = [];
        for (let img of arr) {
          let filePath = this.file.dataDirectory + img;
          let resPath = this.pathForImage(filePath);
          this.images.push({
            name: img,
            path: resPath,
            filePath: filePath,
          });

          console.log("images " + images);
          console.log("filePath " + filePath);
          console.log("resPath " + resPath);
        }
      }
    });
  }

  public pathForImage(img) {
    if (img === null) {
      return "";
    } else {
      //return cordova.file.dataDirectory + img;
      let converted = this.webview.convertFileSrc(img);
      console.log("CONERTER IMAGE ---------------- " + converted);
      return converted;
    }
  }

  async presentToast(text) {
    const toast = await this.toastCtrl.create({
      message: text,
      position: "top",
      duration: 100000,
    });

    toast.present;
  }

  async selectImage() {
    const actionSheet = await this.actionSheetCtrl.create({
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
    await actionSheet.present();
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
        var currentName = imagePath.substr(imagePath.lastIndexOf("/") + 1);
        var correctPath = imagePath.substr(0, imagePath.lastIndexOf("/") + 1);
        this.copyFileToLocalDir(
          correctPath,
          currentName,
          this.createFileName()
        );
      },
      (err) => {
        this.presentToast("Error while selecting image.");
      }
    );
  }

  private copyFileToLocalDir(namePath, currentName, newFileName) {
    this.file
      .copyFile(namePath, currentName, this.file.dataDirectory, newFileName)
      .then(
        (success) => {
          this.updateStoredImages(newFileName);

          console.log(
            "updateStoredImages ---------------- " +
              this.updateStoredImages(newFileName)
          );
        },
        (err) => {
          this.presentToast("Error while storing file.");
        }
      );
  }

  private createFileName() {
    var d = new Date(),
      n = d.getTime(),
      newFileName = n + ".jpg";
    return newFileName;
  }

  updateStoredImages(name) {
    this.storage.get(STORAGE_KEY).then((images) => {
      let arr = JSON.parse(images);
      if (!arr) {
        let newImages = [name];
        this.storage.set(STORAGE_KEY, JSON.stringify(newImages));
      } else {
        arr.push(name);
        this.storage.set(STORAGE_KEY, JSON.stringify(arr));
      }

      let filePath = this.file.dataDirectory + name;
      let resPath = this.pathForImage(filePath);

      let newEntry = {
        name: name,
        path: resPath,
        filePath: filePath,
      };

      this.images = [newEntry, ...this.images];
      this.ref.detectChanges(); //trigger change detection cycle
    });
  }

  deleteImage(imgEntry, position) {
    this.images.splice(position, 1);

    this.storage.get(STORAGE_KEY).then((images) => {
      let arr = JSON.parse(images);
      let filtered = arr.filter((name) => name != imgEntry.name);

      this.storage.set(STORAGE_KEY, JSON.stringify(filtered));

      var correctPath = imgEntry.filePath.substr(
        0,
        imgEntry.filePath.lastIndexOf("/") + 1
      );

      this.file.removeFile(correctPath, imgEntry.name).then((res) => {
        this.presentToast("File removed");
      });
    });
  }

  startUpload(imgEntry) {
    this.file
      .resolveLocalFilesystemUrl(imgEntry.filePath)
      .then((entry) => {
        (<FileEntry>entry).file((file) => this.readFile(file));
      })
      .catch((err) => {
        this.presentToast("Error whiles reading file");
      });
  }

  readFile(file: any) {
    const reader = new FileReader();

    reader.onloadend = () => {
      const formData = new FormData();
      const imgBlob = new Blob([reader.result], {
        type: file.type,
      });
      formData.append("file", imgBlob, file.name);
      //this.uploadImageData(formData)
    };
    reader.readAsArrayBuffer(file);
  }
}
