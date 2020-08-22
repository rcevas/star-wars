import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';


@Injectable({
  providedIn: 'root'
})
export class ShipsService {

  shipsUrl = 'https://swapi.dev/api/starships/';

  //how the API doesn´t have any image I decided to create an array of images of the ships and then hook them up into the iteration at the component
  photosShips = [
    { imgUrl: '' },
    { imgUrl: '' },
    { imgUrl: 'https://starwars-visualguide.com/assets/img/starships/5.jpg' },
    { imgUrl: 'https://starwars-visualguide.com/assets/img/starships/9.jpg' },
    { imgUrl: 'https://starwars-visualguide.com/assets/img/starships/10.jpg' },
    { imgUrl: 'https://starwars-visualguide.com/assets/img/starships/11.jpg' },
    { imgUrl: 'https://starwars-visualguide.com/assets/img/starships/12.jpg' },
    { imgUrl: 'https://starwars-visualguide.com/assets/img/starships/13.jpg' },
    { imgUrl: 'https://starwars-visualguide.com/assets/img/starships/15.jpg' },
    { imgUrl: '' }
  ];

  constructor(private http: HttpClient) { }

  getAll(): any {
    return this.http.get(this.shipsUrl)
      .pipe(
        map(response => response)
      );
  }
}
