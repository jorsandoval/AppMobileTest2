import { Component, OnInit } from '@angular/core';
import { FirebaseService } from '../firebase.service';
import { FormBuilder, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-usuario',
  templateUrl: './usuario.page.html',
  styleUrls: ['./usuario.page.scss'],
})
export class UsuarioPage implements OnInit {
  user: FormGroup;
  userLocal = {image:""};
  contador = 0;
  private dataDB: any[];
  constructor(private service: FirebaseService, private fb: FormBuilder) {
    this.user = this.fb.group({
      correo: '',
      universe: '',
      username: '',
      apellido: '',
      favorite: 0,
    });
  }

  async ngOnInit() {
    const { apellido, correo, universo, username, image } =
      await this.service.getUserByID(localStorage.getItem('UserID'));
    console.log(this.userLocal);
    this.userLocal.image = image
    this.dataDB = await this.service.getFavoriteCharacters(
      localStorage.getItem('UserID')
    );
    this.contador = this.dataDB.length;
    this.user.setValue({
      correo,
      universe: universo,
      username,
      apellido,
      favorite: this.contador,
    });
  }

  async actualizarDatos() {
    const { username, universe, apellido } = this.user.value;
    const documentId = localStorage.getItem('UserID');
    await this.service.updateUser({ username, documentId, universe, apellido });
  }
}
