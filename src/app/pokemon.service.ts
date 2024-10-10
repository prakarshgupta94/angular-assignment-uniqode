import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";

@Injectable({
  providedIn: "root",
})
export class PokemonService {
  baseUrl: string = "https://pokeapi.co/api";
  constructor(private http: HttpClient) {}

  getData(endpoint: string) {
    return this.http.get(`${this.baseUrl}/${endpoint}`);
  }
}
