import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class ActorsService {

  actorsUrl = 'https://swapi.dev/api/people/';

  constructor(private http: HttpClient) { }

  getAll(): any {
    return this.http.get(this.actorsUrl)
      .pipe(
        map(response => response)
      );
  }
}
