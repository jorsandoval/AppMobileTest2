import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ApiServiceService } from '../../app/api-service.service'

@Component({
  selector: 'app-character',
  templateUrl: './character.page.html',
  styleUrls: ['./character.page.scss'],
})
export class CharacterPage implements OnInit {

  id: number;
  dataAPI2: any = {};
  constructor(private router: ActivatedRoute, private service: ApiServiceService, private routers: Router, private aRouter: ActivatedRoute) { 
    this.id = this.router.snapshot.params.id;
    // this.service.getById(this.id).subscribe((data) => this.dataAPI2 = data);
    // console.log(this.dataAPI2)
  }

  async ngOnInit() {
    // this.id = this.router.snapshot.params.id;
    // this.dataApi2 = await this.service.getById(this.id).subscribe((data) => data);
    this.service.getById(this.id).subscribe((res: any) => {this.dataAPI2 = res; this.dataAPI2['episodeLength'] = res.episode.length});
    console.log(this.dataAPI2)
  }

  volverHome() {
    this.routers.navigate(['home']);
  }

}
