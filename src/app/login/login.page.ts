import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { FirebaseService } from '../firebase.service';
import { Route, Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {
  login: FormGroup;

  constructor(
    private fb: FormBuilder,
    private service: FirebaseService,
    private router: Router
  ) {
    this.login = this.fb.group({
      usuario: [
        '',
        [Validators.required, Validators.minLength(4), Validators.maxLength(8)],
      ],
      password: [
        '',
        [Validators.required, Validators.minLength(4), Validators.maxLength(8)],
      ],
    });
  }

  ngOnInit() {}

  async enviarDatos() {
    const userDB = await this.service.getUserByName(this.login.value.usuario);
    console.log(userDB);
    console.log(this.login.value);

    if (this.login.value.password == userDB.password) {
      if (this.login.value.usuario == userDB.username) {
        localStorage.setItem('UserID', userDB.documentId);
        localStorage.setItem('logued', 'X');
        this.router.navigate(['inicio']);
      }
    }

    if (this.login.value.password != userDB.password) {
      alert('Contraseña Incorrecta');
    }

    if (this.login.value.usuario != userDB.username) {
      alert('Usuario Incorrecto');
    }
  }
}
