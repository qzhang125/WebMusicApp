import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Injectable } from '@angular/core';
import { SpotifyTokenService } from './spotify-token.service';
import { environment } from './../environments/environment';
//a5 todo
import { Router } from '@angular/router';
import { mergeMap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class MusicDataService {

  constructor(private spotifyToken: SpotifyTokenService, private http: HttpClient, private router: Router) { }
  //favouritesList: Array<any> = [];
  include_groups: string = "album" || "group";

  getNewReleases(): Observable<any> {
    return this.spotifyToken.getBearerToken().pipe(mergeMap(token => {
      return this.http.get<any>("https://api.spotify.com/v1/browse/new-releases", { headers: { "Authorization": `Bearer ${token}` } });
    }));
  }

  getArtistById(id: number): Observable<any> {
    return this.spotifyToken.getBearerToken().pipe(mergeMap(token => {
      return this.http.get<any>(`https://api.spotify.com/v1/artists/${id}`, { headers: { "Authorization": `Bearer ${token}` } });
    }));
  }

  getAlbumsByArtistId(id: number): Observable<any> {
    //this.router.navigate(['/include_groups'], {queryParams: {limit: 50}});
    return this.spotifyToken.getBearerToken().pipe(mergeMap(token => {
      return this.http.get<any>(`https://api.spotify.com/v1/artists/${id}/albums?limit=50&include_groups=album,single`, { headers: { "Authorization": `Bearer ${token}` } });
    }));
  }

  getAlbumById(id: number): Observable<any> {
    return this.spotifyToken.getBearerToken().pipe(mergeMap(token => {
      return this.http.get<any>(`https://api.spotify.com/v1/albums/${id}`, { headers: { "Authorization": `Bearer ${token}` } });
    }));
  }

  searchArtists(searchString: string): Observable<any> {
    return this.spotifyToken.getBearerToken().pipe(mergeMap(token => {
      return this.http.get<any>(`https://api.spotify.com/v1/search?type=artist&q=${searchString}&limit=50`, { headers: { "Authorization": `Bearer ${token}` } });
    }));
  }

  /*addToFavourites(id: string){
    if (id == null || this.favouritesList.length >= 50) {
      return false;
    } else {
      this.favouritesList.push(id);
      return true;
    }
  }*/
  //Assignment6
  addToFavourites(id:string): Observable<[String]> {
    // TODO: make a PUT request to environment.userAPIBase/favourites/:id to add id to favourites
    return this.http.put<any>(`${environment.userAPIBase}/favourites/${id}`, id);
  }
  

  /*removeFromFavourites(id: string): Observable<any> {
    this.favouritesList.splice(this.favouritesList.indexOf(id), 1);
    console.log(this.favouritesList);
    return this.getFavourites();
  }*/
  //Assignment 6
  removeFromFavourites(id:string): Observable<any> {
    return this.http.delete<[String]>(`${environment.userAPIBase}/favourites/${id}`).pipe(mergeMap(favouritesArray => {
      // TODO: Perform the same tasks as the original getFavourites() method, only using "favouritesArray" from above, instead of this.favouritesList
      // NOTE: for the empty array, you will need to use o=>o.next({tracks: []}) instead of o=>{o.next([])}
      if(favouritesArray.length > 0){
        let favouritesListItem = favouritesArray.join(',');
        return this.spotifyToken.getBearerToken().pipe(mergeMap(token => {
          return this.http.get<any>(`https://api.spotify.com/v1/tracks?ids=${favouritesListItem}`, { headers: { "Authorization": `Bearer ${token}` } });
        }));
      }else{
        return new Observable(o=>o.next({tracks: []}));
      }
    }));
  }

  /*getFavourites(): Observable<any> {
    if (this.favouritesList.length > 0) {
      let favouritesListItem = this.favouritesList.join(',');
      console.log(favouritesListItem);
      return this.spotifyToken.getBearerToken().pipe(mergeMap(token => {
        return this.http.get<any>(`https://api.spotify.com/v1/tracks?ids=${favouritesListItem}`, { headers: { "Authorization": `Bearer ${token}` } });
      }));
    } else {
      return new Observable(o => { o.next([]) });
    }
  }*/
  //Assignemt 6
  getFavourites(): Observable<any> {
    return this.http.get<[String]>(`${environment.userAPIBase}/favourites/`).pipe(mergeMap(favouritesArray => {
      // TODO: Perform the same tasks as the original getFavourites() method, only using "favouritesArray" from above, instead of this.favouritesList
      // NOTE: for the empty array, you will need to use o=>o.next({tracks: []}) instead of o=>{o.next([])}
      if(favouritesArray.length > 0){
        let favouritesListItem = favouritesArray.join(',');
        return this.spotifyToken.getBearerToken().pipe(mergeMap(token => {
          return this.http.get<any>(`https://api.spotify.com/v1/tracks?ids=${favouritesListItem}`, { headers: { "Authorization": `Bearer ${token}` } });
        }));
      }else{
        return new Observable(o=>o.next({tracks: []}));
      }
    }));
  }
}
