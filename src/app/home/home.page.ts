import { Component, OnInit } from '@angular/core';
import { Router,ActivatedRoute } from '@angular/router';
import { ApiServiceService } from '../../app/api-service.service';
import { FirebaseService } from './../firebase.service';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage implements OnInit {
  dataAPI: any[] = [];
  infoAPI: any[] = [];
  dataDB: any[] = [];

  pageId: string;
  id;

  constructor(
    private consultaAPI: ApiServiceService,
    private aRouter: ActivatedRoute,
    private router: Router,
    private firebaseService: FirebaseService
  ) {
  }

  async ngOnInit() {
    this.pageId = this.aRouter.snapshot.params.pageId;
    this.consultaAPI.getAllData(this.pageId).subscribe((data: any) => {
      console.log(data);
      this.dataAPI = data.results;
      this.infoAPI = data.info;
    });
    // console.log(this.aRouter.snapshot.params)

    this.dataDB = await this.firebaseService.getFavoriteCharacters(localStorage.getItem('UserID'));
    // console.log(this.dataDB);
    // console.log(this.validateFavorite('1'));
  }

  async characterInfo(id: number) {
    // this.router.navigate(['character', id]);
    const data = this.dataAPI.filter((el) => el.id === id)[0];
    // console.log(this.dataAPI);
    const response = await this.firebaseService.insertFavoriteCharacter({
      gender: data.gender,
      id,
      image: data.image,
      species: data.species,
      status: data.status,
      type: data.type,
      name: data.name,
      idUsers : localStorage.getItem('UserID'),
    });

    if (response) {
      this.dataDB = await this.firebaseService.getFavoriteCharacters(localStorage.getItem('UserID'));
    }
  }
  nextPage() {
    // console.log(this.pageId)
    // console.log(this.aRouter.snapshot.params)
    this.router.navigate(['home', Number.parseInt(this.pageId) + 1]);
  }

  previewPage(){
    // console.log(this.pageId)
    this.router.navigate(['home', Number.parseInt(this.pageId) - 1]);
    
  }
  validateFavorite = (id) => this.dataDB.filter((el) => el.id === id).length;
}
