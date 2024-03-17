import { Injectable } from '@angular/core';
import { HttpClient, HttpRequest } from "@angular/common/http";
import { BehaviorSubject, map, Observable, Subject } from "rxjs";
// @ts-ignore
import { EventSourcePolyfill } from 'event-source-polyfill';

interface CommentDTO {
  id: string;
  author_id: string;
  article_id: string;
  content: string;
  created_at: string;
}
export interface ArticlesDTO{
  articles: ArticleDTO[];
  last_page: number;
  page: number;
  per_page: number;
  total_count: number;
}
export interface Articles{
  articles: Article[];
  details: ArticleDetails;
}
export interface ArticleDTO{
  id: string;
  author: string;
  title: string;
  content: string;
  comments: number;
  created_at: string;
  updated_at: string;
}
export interface Article{
  id: string;
  author: string;
  title: string;
  content: string;
  comments: number;
  createdAt: string;
  updatedAt: string;
}
export interface ArticleDetails{
  lastPage: number;
  page: number;
  perPage: number;
  totalCount: number;
}
interface addArticle {
  title: string,
  content: string
}
@Injectable({
  providedIn: 'root'
})
export class DashboardService {

  constructor(private _http: HttpClient) { }

  private _commentsBroadcaster$ = new BehaviorSubject<any[]>([]);

  baseUrl = 'http://localhost:8080';

  get commentsBroadcaster$() {
    return this._commentsBroadcaster$.asObservable();
  }

  getArticles(offset: number): Observable<Articles>{
    return this._http.get<ArticlesDTO>(this.baseUrl + `/articles?page=${offset}&per_page=10`)
      .pipe(
        map(res => ({
          articles: res.articles.map(article => ({
            id: article.id,
            author: article.author,
            title: article.title,
            content: article.content,
            comments: article.comments,
            createdAt: article.created_at,
            updatedAt: article.updated_at,
          })),

          details: {
            lastPage: res.last_page,
            page: res.page,
            perPage: res.per_page,
            totalCount: res.total_count,
          }
        })
      )
    );
  }
  deleteArticle(id: string): any{
    return this._http.delete(this.baseUrl + `/articles/${id}`);
  }
  addArticle(data: addArticle){
    return this._http.post(this.baseUrl + '/articles', data )
  }
  getComments(id: string){
    return this._http.get<CommentDTO[]>(this.baseUrl + `/articles/${id}/comments`)
  }
  streamComment(id: string){
    const token = localStorage.getItem('token');

    const eventSource = new EventSourcePolyfill(`${this.baseUrl}/articles/${id}/comments/stream`, {
      headers: {
        'Authorization': `Bearer ${token}`
      }
    });

    eventSource.addEventListener('open', () => {
      console.log('open');
    }, false);

    eventSource.addEventListener('message', (event: any) => {
      if (event?.data) {
        this._commentsBroadcaster$.next([JSON.parse(event.data), ...this._commentsBroadcaster$.getValue()]);
      }
    }, false);

    eventSource.addEventListener('error', (event: any) => {
      this._commentsBroadcaster$.error('something went wrong');
    }, false);
  }
  cancelStreamComments(id: string): any{
    let req: any = this._http.get(`${this.baseUrl}/articles/${id}/comments/stream`);
    req.cancel();
  }
}
