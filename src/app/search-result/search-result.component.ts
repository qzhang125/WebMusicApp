import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { MusicDataService } from '../music-data.service';

@Component({
  selector: 'app-search-result',
  templateUrl: './search-result.component.html',
  styleUrls: ['./search-result.component.css']
})
export class SearchResultComponent implements OnInit {

  results: any;
  searchQuery: string ="";
  constructor(private route: ActivatedRoute, private data: MusicDataService) { }

  ngOnInit(): void {
    this.route.queryParams.subscribe(params=>{
      this.searchQuery = params['q'] || "";
      this.data.searchArtists(this.searchQuery).subscribe(data=>{
        this.results = data.artists.items.filter((x:any)=>x.images.length > 0);
        console.log(this.results);
      }, err=>{
        this.results = [];
      });
    });
  }
}
