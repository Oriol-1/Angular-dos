import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { SearchGifsResponse, Gif } from '../interface/gifs.interface';

@Injectable({
  providedIn: 'root'
})
export class GifsService {

  private apiKey: string = 'oiNmpExURbfleLCcapJhGVAJ3cD94An2';
  private servicioUrl: string = 'https://api.giphy.com/v1/gifs';
  private _historial: string[] = [];

// TODO: camniar any por su tipo
  public resultados: Gif[] = [];

  get historial(){
    return [...this._historial];
  }

  constructor( private http: HttpClient ) {

    this._historial = JSON.parse( localStorage.getItem('historial')!) || [];
    this.resultados = JSON.parse( localStorage.getItem('resultados')!) || [];

// if ( localStorage.getItem('historial') ){
//   this._historial = JSON.parse( localStorage.getItem('historial')! );
// }



  }

  buscarGifs (query:string= '' ){
//no repite busqueda ( con el if)
query = query.trim().toLocaleLowerCase();

  if( !this._historial.includes( query ) ){
  this._historial.unshift( query );
  this._historial = this._historial.splice(0, 10);
  localStorage.setItem('historial', JSON.stringify( this._historial ));
  
  
   // guarda en el localstorage, el historial y el resultados, y los convierte a string, para poder guardarlos en el localstorage, y poderlos leer de nuevo, y poderlos usar en el componente, y poderlos mostrar en el componente


  
  }
  const params = new HttpParams() 
    .set('api_key', this.apiKey)
    .set('q', query)
    .set('limit', '10');

    console.log( params.toString() );
  
  this.http.get<SearchGifsResponse>(` ${this.servicioUrl}/search`, {params})
  .subscribe( (resp)=> {
    
    this.resultados = resp.data;
    localStorage.setItem('resultados', JSON.stringify( this.resultados ));

  });

}

}
