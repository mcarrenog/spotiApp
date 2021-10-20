import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders} from '@angular/common/http';
import { map } from 'rxjs/operators';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SpotifyService {

  constructor(private http: HttpClient) {

    console.log("Spotify Service OK!");
   }

   getQuery(query: string, token: string){
   
      const url = `https://api.spotify.com/v1/${ query }`;

      const headers =new HttpHeaders({
        'Authorization': `Bearer ${token}`
      });

      return this.http.get(url, {headers});
   }

   
   getNewRelease(token: string){

    return this.getQuery('browse/new-releases', token)
             .pipe( map( data =>  data['albums'].items));
      
   }

   getArtists(termino: string, token: string){
   
    return this.getQuery(`search?q=${termino}&type=artist&limit=15`, token)
              .pipe ( map( data =>  data['artists'].items));
    
   }

   getArtist(id: string, token: string){
     return this.getQuery(`artists/${ id }`, token);
            //.pipe ( map( data =>  data['artists'].items));
   }

   getTopTrack(id: string, token: string){
    return this.getQuery(`artists/${ id }/top-tracks?country=cl`, token)
           .pipe ( map( data =>  data['tracks']));
  }

  getToken(): Observable<any>{
    const clientId: string = '95a226828c0146f9b8469f8dc7162a85';
    const clientSecret: string = 'a886043fd8aa49b682eb7cc78329ffb4';
    return this.http.get(`https://spotify-get-token.herokuapp.com/spotify/${ clientId}/${clientSecret}`)
   .pipe( map(data=>data['access_token']));
}
}
