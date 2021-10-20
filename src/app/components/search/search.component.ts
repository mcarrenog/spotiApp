import { Component } from '@angular/core';
import { SpotifyService } from '../../services/spotify.service';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styles: []
})
export class SearchComponent {

  artists: any[] = [];
  loading: boolean;
  token: string;
  constructor( private spotify: SpotifyService) { 
    
    this.spotify.getToken().subscribe( data => {
      this.token = data
    });
  }


  buscar(termino: string){
    console.log(termino); 
    this.loading = true;
    this.spotify.getArtists(termino, this.token).subscribe((data: any)=>{
      console.log(data);
      this.artists = data;
      this.loading = false;
    });

  }

}
