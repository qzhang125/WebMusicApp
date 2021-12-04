import { Component, OnInit } from '@angular/core';
import { MusicDataService } from '../music-data.service';
@Component({
  selector: 'app-favourites',
  templateUrl: './favourites.component.html',
  styleUrls: ['./favourites.component.css']
})
export class FavouritesComponent implements OnInit {

  constructor(private data: MusicDataService) { }
  favourites: Array<any> = [];

  ngOnInit(): void {
    this.data.getFavourites().subscribe(data=>{
      this.favourites = data.tracks; 
    });
  }

  iconClick(clickedId: string) : void{
    this.data.removeFromFavourites(clickedId).subscribe(data=>{
      this.favourites = data.tracks; 
    });
  };

}
