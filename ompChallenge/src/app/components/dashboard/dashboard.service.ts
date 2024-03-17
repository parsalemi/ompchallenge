import { Injectable } from '@angular/core';
import { HttpClient, HttpRequest } from "@angular/common/http";
import { map } from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class DashboardService {

  constructor(private _http: HttpClient) { }

  baseUrl = 'http://localhost:8080';

  getArticles(){
    return this._http.get<any>(this.baseUrl + '/articles');
  }
  deleteArticle(id: string): any{
    return this._http.delete(this.baseUrl + `/articles/${id}`);
  }
  addArticle(data: addArticle){
    return this._http.post(this.baseUrl + '/articles',  data )
  }
}
interface addArticle {
  title: string,
  content: string
}
