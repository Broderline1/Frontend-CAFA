import { Component } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css'],
  standalone: false,
})
export class RegisterComponent {
  username: string = '';
  email: string = '';
  password: string = '';
  error: string = '';
  success: string = '';

  usernameError: string = '';
  emailError: string = '';
  passwordError: string = '';
  passwordStrengthMessage: string = '';

  validateFields(): boolean {
    this.usernameError = '';
    this.emailError = '';
    this.passwordError = '';

    let valid = true;

    if (!this.username) {
      this.usernameError = 'El nombre de usuario es obligatorio';
      valid = false;
    }

    if (!this.email) {
      this.emailError = 'El correo es obligatorio';
      valid = false;
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(this.email)) {
      this.emailError = 'El correo no tiene un formato válido';
      valid = false;
    }

    if (!this.password) {
      this.passwordError = 'La contraseña es obligatoria';
      valid = false;
    } else if (this.password.length < 8) {
      this.passwordError = 'Mínimo 8 caracteres';
      valid = false;
    }

    return valid;
  }

  isPasswordStrong: boolean = false;

  checkPassword() {
    const lengthValid = this.password.length >= 8;
    const hasLower = /[a-z]/.test(this.password);
    const hasUpper = /[A-Z]/.test(this.password);
    const hasNumber = /\d/.test(this.password);
    const hasSpecial = /[\W_]/.test(this.password);

    if (!this.password) {
      this.passwordStrengthMessage = '';
      this.isPasswordStrong = false;
      return;
    }

    let messages = [];

    if (!lengthValid) messages.push("• Mínimo 8 caracteres");
    if (!hasLower) messages.push("• Una letra minúscula");
    if (!hasUpper) messages.push("• Una letra mayúscula");
    if (!hasNumber) messages.push("• Un número");
    if (!hasSpecial) messages.push("• Un símbolo especial (!@#$%-_ etc)");

    if (messages.length === 0) {
      this.passwordStrengthMessage = "Contraseña fuerte ✔";
      this.isPasswordStrong = true;
    } else {
      this.passwordStrengthMessage = "Te falta:\n" + messages.join("\n");
      this.isPasswordStrong = false;
    }
  }

  constructor(private authService: AuthService, private router: Router) {}

  onSubmit() {
    this.error = '';
    this.success = '';

    // Validación de fuerza de contraseña
    if (!this.isPasswordStrong) {
      this.error = "La contraseña debe ser más fuerte.";
      return;
    }

    // 2️⃣ Hacer registro SOLO si pasó validaciones
    this.authService.register({
      name: this.username,
      email: this.email,
      password: this.password
    }).subscribe({
      next: () => {
        this.success = 'Registro exitoso. Redirigiendo al login...';
        this.error = '';
        setTimeout(() => this.router.navigate(['/login']), 2000);
      },
      error: (err) => {
        this.error = err.error?.message || 'Error en el registro';
        this.success = '';
      }
    });
  }
}