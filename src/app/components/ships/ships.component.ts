import { Component, OnInit } from '@angular/core';
import { ShipsService } from 'src/app/services/ships.service';

@Component({
  selector: 'app-ships',
  templateUrl: './ships.component.html',
  styleUrls: ['./ships.component.css']
})
export class ShipsComponent implements OnInit {

  ships;
  shipsImg;
  error;
  showBtn: boolean;

  constructor(private shipsService: ShipsService) { }

  ngOnInit(): void {
    this.showMore();
    this.shipsImg = this.shipsService.photosShips;
  }

  showMore() {
    this.shipsService.getAll()
      .subscribe(
        response => {
          this.ships = response.results;
          this.showBtn = false;
        },
        errorRes => {
          this.error = errorRes.message;
          this.showBtn = true;
        }
      );

  }

}
