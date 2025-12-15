import { Component, ElementRef, ViewChild, AfterViewInit, HostListener } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-menu-principal',
  templateUrl: './menu-principal.component.html',
  styleUrls: ['./menu-principal.component.css'],
  standalone: false
})
export class MenuPrincipalComponent implements AfterViewInit {

  constructor(
    private authService: AuthService,
    private router: Router
  ) {}

  logout() {
    this.authService.logout();
    this.router.navigate(['/login']);
  }

 @ViewChild('binaryCanvas') canvasRef!: ElementRef<HTMLCanvasElement>;
  private ctx!: CanvasRenderingContext2D;
  private fontSize = 18;
  private columns!: number[];
  private width!: number;
  private height!: number;

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