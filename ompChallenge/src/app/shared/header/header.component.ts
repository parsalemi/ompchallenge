import { Component, inject, Input, OnInit } from '@angular/core';
import { Router, RouterLink } from "@angular/router";
import { SignInService, UserClaim } from "../../components/dashboard/sign-in.service";
import { map, Observable } from "rxjs";
import { AsyncPipe, Location } from "@angular/common";

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [
    RouterLink,
    AsyncPipe,
  ],
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss'
})
export class HeaderComponent implements OnInit {
  private _api = inject(SignInService);
  fullName: Observable<string> = this._api.userClaim$.pipe(map((a: UserClaim | undefined) => {
      return a?.full_name ?? '';
    }));
  id: Observable<string> = this._api.userClaim$.pipe(map((a: UserClaim | undefined) => {
    return a?.id ?? '';
  }))
  constructor( private _location: Location) {
  }
  ngOnInit() {

  }
  signOut(){
    localStorage.clear();
  }
  goBack() {
    this._location.back();
  }
}
