import {
  Component,
  ElementRef,
  OnDestroy,
  OnInit,
  TemplateRef,
  ViewChild,
  ViewEncapsulation,
} from '@angular/core';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';
import { Subscription } from 'rxjs';
import { BlockchainService } from '../../services';
import * as qr from 'qrcode';

@Component({
  selector: 'navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss'],
  encapsulation: ViewEncapsulation.None,
})
export class NavbarComponent implements OnInit, OnDestroy {
  @ViewChild('canvas', { static: true }) canvas: ElementRef<HTMLCanvasElement>;

  account: string = '';
  subscriptions: Subscription[] = [];
  modalRef: BsModalRef;
  qrcodeURL: string;

  constructor(
    private _bcService: BlockchainService,
    private _modalService: BsModalService
  ) {}

  ngOnInit() {
    const account$ = this._bcService.me$.subscribe(async (val) => {
      if (val) {
        this.account = val;
        this.qrcodeURL = await this.drawQRCode(val);
      }
    });

    this.subscriptions.push(account$);
  }

  ngOnDestroy() {
    this.subscriptions.forEach((s) => s.unsubscribe());
    this.subscriptions = [];
  }

  openModal(template: TemplateRef<any>) {
    this.modalRef = this._modalService.show(template, {
      class: 'modal-dialog-centered modal-sm',
      backdrop: false,
    });
  }

  private async drawQRCode(text: string = '') {
    const opts: qr.QRCodeToDataURLOptions = {
      errorCorrectionLevel: 'H',
      width: 256,
      margin: 1,
      type: 'image/png',
    };

    try {
      const url = await qr.toDataURL(text, opts);
      return url;
    } catch (error) {
      console.log('Something went wrong generation the QRCode');
      console.log(error);
      return '';
    }
  }
}
