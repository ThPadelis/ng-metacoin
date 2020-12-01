import {
  AfterViewInit,
  Component,
  ElementRef,
  Input,
  OnInit,
  ViewChild,
} from '@angular/core';
import * as qr from 'qrcode';

@Component({
  selector: 'account',
  templateUrl: './account.component.html',
  styleUrls: ['./account.component.scss'],
})
export class AccountComponent implements OnInit, AfterViewInit {
  @ViewChild('canvas', { static: true }) canvas: ElementRef<HTMLCanvasElement>;

  @Input() address: string = '';
  @Input() title: string = 'Account 1';

  constructor() {}

  ngOnInit() {}

  ngAfterViewInit() {
    this.drawQRCode(this.address);
  }

  private async drawQRCode(text: string) {
    if (this.canvas) {
      // try {
      //   await qr.toCanvas(this.canvas.nativeElement, text);
      // } catch (error) {
      //   console.log('Failed to draw QRCode');
      //   console.log(error);
      // }
    }

    const opts: qr.QRCodeToDataURLOptions = {
      errorCorrectionLevel: 'H',
      type: 'image/jpeg',
      margin: 1,
      width: 200,
      rendererOpts: {
        quality: 1,
      },
    };
    await qr.toDataURL(this.canvas.nativeElement, text, opts);
  }
}
