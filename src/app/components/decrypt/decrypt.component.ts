import { Component, ElementRef, ViewChild, AfterViewInit, HostListener } from '@angular/core';
import { EncryptionService } from '../../services/encryption.service';

@Component({
  selector: 'app-decrypt',
  templateUrl: './decrypt.component.html',
  styleUrls: ['./decrypt.component.css'],
  standalone: false
})
export class DecryptComponent implements  AfterViewInit {

 @ViewChild('binaryCanvas') canvasRef!: ElementRef<HTMLCanvasElement>;
  private ctx!: CanvasRenderingContext2D;
  private fontSize = 18;
  private columns!: number[];
  private width!: number;
  private height!: number;

  encrypted = '';
  key = '';
  decrypted = '';
  error = '';
  copied = false;
  showKey = false;

  constructor(private encryptionService: EncryptionService) {}

  decrypt() {
    const result = this.encryptionService.decrypt(this.encrypted, this.key);
    if(result) {
      this.decrypted = result;
      this.error = '';
      this.copied = false;
    } else {
      this.decrypted = '';
      this.error = 'Clave incorrecta o texto invalido.';
      this.copied = false;
    }
  }

  toggleShowKey() {
    this.showKey = !this.showKey;
  }

  copyToClipboard() {
    if (this.decrypted) {
      navigator.clipboard.writeText(this.decrypted);
      this.copied = true;
      setTimeout(() => this.copied = false, 2000);
    }
  }

  ngAfterViewInit(): void {
    this.initializeCanvas();
    requestAnimationFrame(() => this.draw());
  }

  @HostListener('window:resize')
  onResize() {
    this.initializeCanvas();
  }

  initializeCanvas() {
    const canvas = this.canvasRef.nativeElement;
    this.ctx = canvas.getContext('2d')!;
    this.width = canvas.width = window.innerWidth;
    this.height = canvas.height = window.innerHeight;
    const columns = Math.floor(this.width / this.fontSize);
    this.columns = Array(columns).fill(1);
  }

  draw() {
    this.ctx.fillStyle = 'rgba(0, 0, 0, 0.08)';
    this.ctx.fillRect(0, 0, this.width, this.height);
    this.ctx.fillStyle = '#00FF00';
    this.ctx.font = `${this.fontSize}px monospace`;

    for (let i = 0; i < this.columns.length; i++) {
      const text = Math.random() > 0.5 ? '1' : '0';
      this.ctx.fillText(text, i * this.fontSize, this.columns[i] * this.fontSize);
      if (this.columns[i] * this.fontSize > this.height && Math.random() > 0.975) {
        this.columns[i] = 0;
      }
      this.columns[i]++;
    }

    requestAnimationFrame(() => this.draw());
  }
}