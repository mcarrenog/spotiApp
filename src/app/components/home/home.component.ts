import { Component, OnInit } from '@angular/core';
import { SpotifyService } from '../../services/spotify.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styles: []
})
export class HomeComponent implements OnInit {

  nuevasCanciones: any[] = [];
  loading: boolean;
  error: boolean;
  mensajeError: string;
  token: string;

  constructor(private spotify: SpotifyService) { 
   
    this.loading = true;
    this.error = false;

    this.spotify.getToken().subscribe( data => {
      this.token = data
 

      this.spotify.getNewRelease(this.token).subscribe((response: any) =>{
      console.log(response);
      this.nuevasCanciones = response;
      this.loading = false;
    }, (errorServicio) =>{
        this.mensajeError = errorServicio.error.error.message;
        console.log(errorServicio.error.error.message);
        this.loading = false;
        this.error = true;
      
        });;
      });

    

  

  }

  ngOnInit() {
    
  }

}
