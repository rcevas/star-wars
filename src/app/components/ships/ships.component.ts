import { Component, OnInit } from '@angular/core';
import { ShipsService } from 'src/app/services/ships.service';

@Component({
  selector: 'app-ships',
  templateUrl: './ships.component.html',
  styleUrls: ['./ships.component.css']
})
export class ShipsComponent implements OnInit {

  clicked: boolean;
  ships;
  shipsImg;
  error;
  showBtn: boolean;
  defaultImage = 'assets/images/image-not-available.jpg';

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
          this.clicked = true;
          setTimeout(() => {
            this.clicked = false;
          }, 5000);
        }
      );
  }

}
