import { ActorsService } from './../../services/actors.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-actors',
  templateUrl: './actors.component.html',
  styleUrls: ['./actors.component.css']
})
export class ActorsComponent implements OnInit {

  error;
  actors;

  constructor(private actorsService: ActorsService) { }

  ngOnInit(): void {
    this.actorsService.getAll()
      .subscribe(
        response => {
          this.actors = response.results;
        },
        errorRes => {
          this.error = errorRes.message;
        }
      );
  }

}
