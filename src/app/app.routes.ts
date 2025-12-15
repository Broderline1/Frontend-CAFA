//Imports importantes de Angular
import { Routes } from '@angular/router';
import { AuthGuard } from './guards/auth.guard';

// Componentes importados para las rutas
import { LoginComponent } from '../app/auth/login/login.component';
import { RegisterComponent } from '../app/auth/register/register.component';
import { EncryptComponent } from './components/encrypt/encrypt.component';
import { DecryptComponent } from './components/decrypt/decrypt.component';
import { MenuPrincipalComponent } from './components/menu-principal/menu-principal.component';

export const routes: Routes = [
   { path: 'login', component: LoginComponent },
   { path: 'register', component: RegisterComponent },
   { path: 'encrypt', component: EncryptComponent, canActivate: [AuthGuard] },
   { path: 'decrypt', component: DecryptComponent, canActivate: [AuthGuard] },
   { path: 'menu-principal', component: MenuPrincipalComponent, canActivate: [AuthGuard] },
   { path: '', component: MenuPrincipalComponent, canActivate: [AuthGuard] },
   { path: '**', redirectTo: ''}
];
