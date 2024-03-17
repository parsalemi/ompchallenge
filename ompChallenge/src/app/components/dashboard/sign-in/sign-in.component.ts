import { Component, inject, OnDestroy, OnInit } from '@angular/core';
import { FormControl, FormGroup, FormsModule, ReactiveFormsModule } from "@angular/forms";
import { SignInService } from "../sign-in.service";
import { Router } from "@angular/router";
import { AltKeys, KeymapService } from "../../../keymap.service";

@Component({
  selector: 'app-sign-in',
  standalone: true,
  imports: [
    FormsModule,
    ReactiveFormsModule
  ],
  templateUrl: './sign-in.component.html',
  styleUrl: './sign-in.component.scss'
})
export class SignInComponent implements OnInit, OnDestroy {
  private _api = inject(SignInService);
  private _keymapService = inject(KeymapService)
  router = inject(Router)
  togglePass: boolean = false;
  token: string = '';
  ctrla: number | undefined = undefined;
  parsedToken: any;

  signInUser = new FormGroup( {
    email: new FormControl(""),
    password: new FormControl("")
  });

  constructor() {}
  signIn(){
    const body = {
      email: this.signInUser.value.email as string,
      password: this.signInUser.value.password as string
    };

    this._api.userSignIn(body).subscribe( {
      next: ( data: any) =>{
        console.log(data);
        if(data.token){

          this._api.setToken(data.token);
          this.router.navigate(['/dashboard/articles'])
        }
      }
    })
  }
  ngOnInit() {
    this.ctrla = this._keymapService.registerKeyboardShortcut({
      combination: [AltKeys.CTRL],
      keycode: 49,
      callback: () => {
        console.log('ashdgfjsf')
      }
    })

  }

  showPass() {
    this.togglePass = !this.togglePass;
  }
  ngOnDestroy() {
    if(this.ctrla !== undefined) {
      this._keymapService.removeKeyboardShortcut(this.ctrla)
    }
  }
}
