import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { SearchGifsResponse, Gif } from '../interface/gifs.interface';



@Injectable({
  providedIn: 'root'
})
export class GifsService {

  private _historial: string[] = [];
  private apiKey: string = "XgDKU1lj7o1Ed84Yt4YIfEfGqERWg5Sw";
  public resultados: Gif[] = [];


  get historial() {

    return [...this._historial];
  }

  constructor(private http: HttpClient) {
    this._historial = JSON.parse(localStorage.getItem("historial")!) || [];
    this.resultados = JSON.parse(localStorage.getItem("resultados")!) || [];

  }

  buscarGifs(query: string = "") {

    query = query.trim().toLocaleLowerCase();

    if (!this._historial.includes(query)) {
      this._historial.unshift(query);
      this._historial = this._historial.splice(0, 10);

      localStorage.setItem("historial", JSON.stringify(this._historial));
    }

    // fetch("https://api.giphy.com/v1/gifs/search?api_key=XgDKU1lj7o1Ed84Yt4YIfEfGqERWg5Sw&q=amongus&limit=10").then(resp => {
    //   resp.json().then(data => {
    //     console.log(data);
    //   })
    // })

    this.http.get<SearchGifsResponse>(`https://api.giphy.com/v1/gifs/search?api_key=XgDKU1lj7o1Ed84Yt4YIfEfGqERWg5Sw&q=${query}&limit=10`)
      .subscribe((resp) => {
        console.log(resp.data);
        this.resultados = resp.data;
        localStorage.setItem("resultados", JSON.stringify(this.resultados));
      });


  }


}
