import { Component, OnInit} from '@angular/core';
//a5 TODO:
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRoute } from '@angular/router';
import { MusicDataService } from '../music-data.service';


@Component({
  selector: 'app-album',
  templateUrl: './album.component.html',
  styleUrls: ['./album.component.css']
})
export class AlbumComponent implements OnInit {
  id : number = -1;
  album: any;
  constructor(private bar: MatSnackBar, private route: ActivatedRoute, private data: MusicDataService) { }

  iconClick(clickedId: string) : void{
      this.data.addToFavourites(clickedId).subscribe((res)=>{
        console.log(res);
        this.bar.open("Adding to Favourites...", "Done", { duration: 1500 });
      },err=>{
        err.bar.open("Unable to add song to Favourites", "Done", { duration: 1500 });
      });
  }

  ngOnInit(): void {
    this.route.params.subscribe(params=>{
      this.id = params['id'];
      this.data.getAlbumById(this.id).subscribe(data=>{
        this.album = data;
      });
    })
  }

}
