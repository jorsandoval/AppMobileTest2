import { Component, OnInit } from '@angular/core';
import { FirebaseService } from './../firebase.service';

@Component({
  selector: 'app-favorite-list',
  templateUrl: './favorite-list.page.html',
  styleUrls: ['./favorite-list.page.scss'],
})
export class FavoriteListPage implements OnInit {
  private dataDB: any[];
  constructor(private firebaseService: FirebaseService) {}

  async ngOnInit() {
    this.dataDB = await this.firebaseService.getFavoriteCharacters(localStorage.getItem('UserID'));
  }
}
