import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";

@Injectable({
  providedIn: "root",
})
export class HomeService {
  baseUrl: string = "https://jsonplaceholder.typicode.com";
  constructor(private http: HttpClient) {}

  getData(endpoint: string) {
    return this.http.get(`${this.baseUrl}/${endpoint}`);
  }
}
