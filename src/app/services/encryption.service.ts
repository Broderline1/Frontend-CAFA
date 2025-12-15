import * as CryptoJS from 'crypto-js';
import { Injectable } from '@angular/core';

@Injectable({ providedIn: 'root'})

export class EncryptionService {
   encrypt(text: string, key: string): string {
      return CryptoJS.AES.encrypt(text, key).toString();
   }

   decrypt(ciphertext: string, key: string): string {
      try {
         const bytes = CryptoJS.AES.decrypt(ciphertext, key);
         return bytes.toString(CryptoJS.enc.Utf8);
      } catch {
         return '';
      }
   }
}
