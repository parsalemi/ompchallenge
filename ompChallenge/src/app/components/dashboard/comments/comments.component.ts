import { Component, inject, OnDestroy, OnInit } from '@angular/core';
import { DashboardService } from "../dashboard.service";
import { ActivatedRoute, RouterLink } from "@angular/router";
import { AsyncPipe, DatePipe, JsonPipe, NgFor, NgForOf, NgIf } from "@angular/common";
import { combineLatest, map, Observable, of, Subject, switchMap } from "rxjs";
import { HttpClient } from "@angular/common/http";

interface Comment {
  createdAt: Date;
  content: string;
}

@Component({
  selector: 'app-comments',
  standalone: true,
  imports: [NgIf, NgForOf, AsyncPipe, JsonPipe, DatePipe, RouterLink],
  templateUrl: './comments.component.html',
  styleUrl: './comments.component.scss'
})
export class CommentsComponent implements OnDestroy, OnInit{
  private _api = inject(DashboardService);
  private _route = inject(ActivatedRoute);
  inProgress = false;
  articleId: string = this._route.snapshot.paramMap.get('articleId') as string;
  newComments$: Observable<any> = this._api.commentsBroadcaster$;

  comments$: Observable<Comment[]> = this._route
    .paramMap
    .pipe(
      switchMap(paramsMap => {
        const articleId = paramsMap.get('articleId');
        if (!articleId) return of([]);

        return combineLatest([this._api.getComments(articleId), this.newComments$]);
      }),

      map(([comments, newComments]) => [...newComments, ...comments].map(comment => ({
        createdAt: new Date(comment.created_at),
        content: comment.content
      })))
    );
  generateComment(){
    console.log(this.articleId);
    this.inProgress = true;
    this._api.streamComment(this.articleId);
  }
  stopGenerate(){
    this.inProgress = false;
    // this._api.cancelStreamComments(this.articleId).subscribe(console.log);
  }
  reloadPage(){
    location.reload();
  }
  ngOnInit() {
    // this._api.streamComment(this.articleId);
    this._api.commentsBroadcaster$.subscribe(console.log)
  }

  ngOnDestroy() {
    // window.stop();
  }
}
