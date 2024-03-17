import { Component, inject, OnDestroy, OnInit } from '@angular/core';
import { ArticleDetails, DashboardService } from "../dashboard.service";
import { AsyncPipe, JsonPipe, NgForOf, NgIf } from "@angular/common";
import { BehaviorSubject, map, Observable, switchMap } from "rxjs";
import { ButtonModule } from "primeng/button";
import { TooltipModule } from "primeng/tooltip";
import { AltKeys, KeyboardShortcut, KeymapService } from "../../../keymap.service";
import { Router } from "@angular/router";
import { NgxPaginationModule } from "ngx-pagination";
import { ArticleDTO, Article} from "../dashboard.service";

@Component({
  selector: 'app-articles',
  standalone: true,
  imports: [
    JsonPipe,
    AsyncPipe,
    NgIf,
    NgForOf,
    ButtonModule,
    TooltipModule,
    NgxPaginationModule
  ],
  templateUrl: './articles.component.html',
  styleUrl: './articles.component.scss'
})
export class ArticlesComponent implements OnInit, OnDestroy {
  private _api = inject(DashboardService);
  private _keymapService = inject(KeymapService)
  private _router = inject(Router);

  page$ = new BehaviorSubject(1);
  articles$ = this.page$.pipe(switchMap((page) => this._api.getArticles(page)));

  shortcutone: KeyboardShortcut | undefined = undefined;
  shortcuttwo: KeyboardShortcut | undefined = undefined;

  constructor() {

  }
  ngOnInit() {
    this.shortcutone = {
      combination: [AltKeys.CTRL, AltKeys.SHIFT],
      keycode: 49,
      callback: () => {
        console.log('short cut from articles with 1')
      }
    }

    this.shortcuttwo = {
      combination: [AltKeys.CTRL, AltKeys.SHIFT],
      keycode: 50,
      callback: () => {
        console.log('short cut from articles with 2')
      }
    }

    this._keymapService.registerMassKeyboardShortcut([this.shortcutone, this.shortcuttwo]);
  }

  deleteArticle(id: string, event: any): any{
    this._api.deleteArticle(id).subscribe( (a:Article) => {
      this.articles$ = this._api.getArticles(1).pipe(map(a => a))
    });
  }
  showComments(id: string, event: any){
    // this._api.getComments(id).subscribe( (a:any) => a);
    this._router
      .navigate(['dashboard', 'articles', id, 'comments'])
      .then(console.log);
  }
  articleDetails(i: number, id: string){
    this._router.navigate(['dashboard/details']).then()

  }

  ngOnDestroy() {
    this._keymapService.removeMassKeyboardShortcut([this.shortcutone, this.shortcuttwo]);
  }
}

export interface addArticle{
  title: string;
  content: string;
}
