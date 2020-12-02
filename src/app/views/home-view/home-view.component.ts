import { Component, OnInit } from '@angular/core';
import { BlockchainService } from 'src/app/shared/services';

@Component({
  selector: 'app-home-view',
  templateUrl: './home-view.component.html',
  styleUrls: ['./home-view.component.scss'],
})
export class HomeViewComponent implements OnInit {
  me: string;
  balance: number;
  accounts: string[];

  amount: number = 0;
  toAddress: string = '';

  isLoading: boolean = false;

  constructor(private _bcService: BlockchainService) {
    this._bcService.me$.subscribe((val) => {
      this.me = val;
    });
  }

  async ngOnInit() {
    try {
      await this.getAccounts();
      await this.getBalance(this._bcService.me);
    } catch (error) {
      console.log('ngOnInit()', error);
    }
  }

  async getAccounts() {
    try {
      const { accounts } = await this._bcService.getAccounts().toPromise();
      this._bcService.me = accounts[0];
      this.accounts = accounts.slice(1);
    } catch (error) {
      console.log('getAccounts()', error);
    }
  }

  async getBalance(account: string) {
    try {
      const { balance } = await this._bcService.getBalance(account).toPromise();
      this.balance = balance;
    } catch (error) {
      console.log('getBalance()', error);
    }
  }
}
