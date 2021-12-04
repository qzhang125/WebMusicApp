import { Component, OnInit } from '@angular/core';
//a5 TODO: 
import { ActivatedRoute } from '@angular/router';
import { MusicDataService } from '../music-data.service';
@Component({
  selector: 'app-artist-discography',
  templateUrl: './artist-discography.component.html',
  styleUrls: ['./artist-discography.component.css']
})

export class ArtistDiscographyComponent implements OnInit {
  //albums = albumData.items.filter((curValue:any, index:any, self:any) => self.findIndex((t:any) => t.name.toUpperCase() === curValue.name.toUpperCase()) === index);
  //artist = artistData;


  //a5 TODO:
  id: number = -1;
  artist :any;
  albums :any;
  item :any;
  constructor(private route: ActivatedRoute, private data: MusicDataService) { }

  ngOnInit(): void {
    this.route.params.subscribe(params=>{
      this.id = params['id'];
      this.data.getArtistById(this.id).subscribe(data=>{
        this.artist = data;
      });
      this.data.getAlbumsByArtistId(this.id).subscribe(data=>{
        this.item = data.items.filter((curValue:any, index:any, self:any) => self.findIndex((t:any) => t.name.toUpperCase() === curValue.name.toUpperCase()) === index);
        this.albums = this.item; 
      });
    })
  }

}
