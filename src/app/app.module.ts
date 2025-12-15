import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { HttpClient, HttpClientModule } from '@angular/common/http';

//Componentes
import { AppComponent } from './app.component';
import { LoginComponent } from './auth/login/login.component';
import { RegisterComponent } from './auth/register/register.component';
import { EncryptComponent } from './components/encrypt/encrypt.component';
import { DecryptComponent } from './components/decrypt/decrypt.component';
import { MenuPrincipalComponent } from './components/menu-principal/menu-principal.component';
import { routes } from '../app/app.routes';
@NgModule({
   declarations: [
      AppComponent,
      LoginComponent,
      RegisterComponent,
      EncryptComponent,
      DecryptComponent,
      MenuPrincipalComponent,
      // otros componentes...
   ],
   imports: [
      BrowserModule,
      FormsModule,
      HttpClientModule,
      RouterModule.forRoot(routes),
      // otros módulos...
   ],
  // declarations, bootstrap, etc...
  providers: [],
   bootstrap: [AppComponent],
})
export class AppModule {}