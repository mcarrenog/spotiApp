import { Component } from '@angular/core';
import { ActivatedRoute} from '@angular/router';
import { SpotifyService } from '../../services/spotify.service';

@Component({
  selector: 'app-artist',
  templateUrl: './artist.component.html',
  styleUrls: ['./artist.component.css']
})
export class ArtistComponent {

  artist: any={};
  topTracks: any[]=[];
  loading: boolean;
  token: string

  constructor(private activatedRoute: ActivatedRoute,
              private spotify: SpotifyService) { 

                this.spotify.getToken().subscribe( data => {
                  this.token = data
                  this.loading = true;
                  this.activatedRoute.params.subscribe( params => {
                    console.log(params['id']);
                    this.getArtist(params['id']);
                    this.getTopTracks(params['id']);
                  });
                });            
  }

  getArtist(id: string){
    
    this.spotify.getArtist(id, this.token)
    .subscribe(artista =>{
        console.log(artista);
        this.artist = artista;
        this.loading = false;
    });
  }

  getTopTracks(id: string){
    
    this.spotify.getTopTrack(id, this.token)
    .subscribe(topTracks =>{
        console.log(topTracks);
        this.topTracks = topTracks;
        this.loading = false;
    });
  }

}
