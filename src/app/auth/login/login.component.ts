import { Component, ElementRef, ViewChild, AfterViewInit, HostListener } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
  standalone: false
})
export class LoginComponent implements AfterViewInit {
  
  email: string = '';
  password: string = '';
  error: string = '';

  emailError: string = '';
  passwordError: string = '';
  serverError: string = '';

  validateFields(): boolean {
    this.emailError = '';
    this.passwordError = '';
    this.serverError = '';

    let valid = true;

    if (!this.email) {
      this.emailError = 'El correo es obligatorio';
      valid = false;
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(this.email)) {
      this.emailError = 'Correo electrónico inválido';
      valid = false;
    }

    if (!this.password) {
      this.passwordError = 'La contraseña es obligatoria';
      valid = false;
    }

    return valid;
  }

  @ViewChild('binaryCanvas') canvasRef!: ElementRef<HTMLCanvasElement>;
  private ctx!: CanvasRenderingContext2D;
  private fontSize = 18;
  private columns!: number[];
  private width!: number;
  private height!: number;

  constructor(private AuthService: AuthService, private router: Router) {}

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

  goToRegister() {
    this.router.navigate(['/register']);
  }

  onSubmit() {
    if (!this.validateFields()) return;

    this.AuthService.login({ email: this.email, password: this.password }).subscribe({
      next: (res) => {
        sessionStorage.setItem('token', res.token);
        this.router.navigate(['/menu-principal']);
      },
      error: (err) => {
        if (err.error?.message === 'Usuario no encontrado') {
          this.serverError = 'El usuario no existe';
        } else if (err.error?.message === 'Contraseña incorrecta') {
          this.serverError = 'La contraseña es incorrecta';
        } else {
          this.serverError = 'Error al iniciar sesión';
        }
      }
    });
  }
}
