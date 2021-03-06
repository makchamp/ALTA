import { Component, OnInit, OnDestroy, ChangeDetectorRef } from '@angular/core';
import { Platform, AlertController, ToastController } from '@ionic/angular';
import { Subscription, fromEvent } from 'rxjs';
import { AuditService } from 'src/app/services/audit.service';
import { Audit } from 'src/app/models/audit';
import { BarcodeScanner } from '@ionic-native/barcode-scanner/ngx';
import { AndroidPermissions } from '@ionic-native/android-permissions/ngx';

@Component({
  selector: 'app-audits',
  templateUrl: './audits.page.html',
  styleUrls: ['./audits.page.scss'],
})
export class AuditsPage implements OnInit, OnDestroy {
  barcode: string;
  scannedMessage: string;
  keypressEvent: Subscription;
  audits: Array<Audit>;
  isScanning: boolean;

  constructor(
    private auditService: AuditService,
    public toastController: ToastController,
    public alertController: AlertController,
    private cd: ChangeDetectorRef,
    private cameraScanner: BarcodeScanner,
    private androidPermissions: AndroidPermissions,
    public platform: Platform,
  ) {
    this.barcode = '';
  }

  ngOnInit() {
    this.setPermissions();
    this.setExternalScanListener();
    this.getAudits();
  }

  getAudits() {
    // Fetch audits assigned to the stock keeper
    // TODO: replace with backend request
    this.audits = [
      { id: '711719047308', name: 'item0' },
      { id: '056394400360', name: 'item1' },
      { id: '06240021360', name: 'item2' },
      { id: 'X002DW4WYJ', name: 'item3' },
      { id: '71810326785 ', name: 'item4' },
      { id: '057800056621', name: 'item5' },
      { id: '068100084245 ', name: 'item6' },
      { id: '521910642751', name: 'item7' },
      { id: '831956442012 ', name: 'item8' },
    ];
    // this.auditService.getAudits().subscribe(res => {
    //   this.audits = res;
    // });
  }

  ngOnDestroy() {
    this.keypressEvent.unsubscribe();
  }

  setPermissions() {
    if (this.platform.is('android')) {
      this.androidPermissions.checkPermission(this.androidPermissions.PERMISSION.CAMERA).then(
        result => console.log('Has Android Camera Permission?', result.hasPermission),
        err => this.androidPermissions.requestPermission(this.androidPermissions.PERMISSION.CAMERA)
      );
    }
  }

  setExternalScanListener() {
    // A Keyboard Event is triggered from an external bluetooth scanner
    this.keypressEvent = fromEvent(document, 'keypress').subscribe(event => {
      this.scanStateChanged(true);
      this.handleKeyboardEvent(event as KeyboardEvent);
    });
  }

  handleKeyboardEvent(event: KeyboardEvent) {
    const key = event.key;
    // The last key is always 'Enter'
    if (key === 'Enter') {
      this.finishScan();
    }
    else {
      this.barcode += key;
    }
  }

  handleCameraScan() {
    this.cameraScanner.scan().then(barcodeData => {
      if (barcodeData.cancelled === false) {
        this.barcode = barcodeData.text;
        this.finishScan();
      }
    }).catch(async err => {
      console.log('Camera Scanner Error:', err);
      if (err === 'Illegal access') {
        const toast = await this.toastController.create({
          message: 'Camera Permission Denied',
          duration: 1000,
        });
        toast.present();
      }
    });
  }

  async handleManualInput() {
    const alert = await this.alertController.create({
      header: 'Input Barcode',
      inputs: [
        {
          name: 'barcode',
          type: 'text',
          placeholder: 'Barcode #'
        },
      ],
      buttons: [
        {
          text: 'Cancel',
          role: 'cancel',
          handler: () => {
            console.log('Confirm Cancel');
          }
        }, {
          text: 'Confirm',
          handler: input => {
            if (input && input.barcode) {
              this.barcode = input.barcode;
              this.finishScan();
            }
          }
        }
      ]
    });
    await alert.present();
  }

  finishScan() {
    this.validateItem();
    this.barcode = '';
    this.presentScanSuccessToast();
    this.scanStateChanged(false);
  }

  validateItem() {
    // Check if the scanned barcode matches an item
    // TODO: replace with backend request
    this.scannedMessage = `Scanned bardcode #${this.barcode}\nNo item match found.`;
    this.audits.forEach(audit => {
      if (audit.id === this.barcode) {
        this.scannedMessage = `Scanned bardcode #${this.barcode}\nMatch with ${audit.name} !`;
      }
    });
  }

  scanStateChanged(isScanning: boolean) {
    if (this.isScanning !== isScanning) {
      this.isScanning = isScanning;
      this.cd.detectChanges();
    }
  }

  async presentScanSuccessToast() {
    const toast = await this.toastController.create({
      message: this.scannedMessage,
      duration: 4000,
      position: 'bottom',
    });
    toast.present();
  }
}
