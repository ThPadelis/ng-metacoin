import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { IAccountsResponse, IBalanceResponse } from '../interfaces';
import { SHA3 } from 'sha3';

@Injectable({ providedIn: 'root' })
export class BlockchainService {
  private readonly _me = new BehaviorSubject<string>('');
  readonly me$ = this._me.asObservable();

  constructor(private _http: HttpClient) {}

  getAccounts() {
    return this._http.get<IAccountsResponse>('/api/accounts');
  }

  getBalance(account: string) {
    return this._http.get<IBalanceResponse>(`/api/balance/${account}`);
  }

  transfer(sender: string, receiver: string, amount: number) {
    return this._http.post('/api/transfer', {
      sender,
      receiver,
      amount: amount.toString(),
    });
  }

  isAddress(address: string): boolean {
    if (!/^(0x)?[0-9a-f]{40}$/i.test(address)) return false;
    else if (
      /^(0x)?[0-9a-f]{40}$/.test(address) ||
      /^(0x)?[0-9A-F]{40}$/.test(address)
    )
      return true;
    else return this.isChecksumAddress(address);
  }

  private isChecksumAddress(address: string): boolean {
    address = address.replace('0x', '');
    const hash = new SHA3();
    const addressHash = hash.update(address.toLocaleLowerCase());

    for (var i = 0; i < 40; i++) {
      // the nth letter should be uppercase if the nth digit of casemap is 1
      if (
        (parseInt(addressHash[i], 16) > 7 &&
          address[i].toUpperCase() !== address[i]) ||
        (parseInt(addressHash[i], 16) <= 7 &&
          address[i].toLowerCase() !== address[i])
      ) {
        return false;
      }
    }
    return true;
  }

  /* Setters Getters */
  get me(): string {
    return this._me.getValue();
  }

  set me(val: string) {
    this._me.next(val);
  }
}
