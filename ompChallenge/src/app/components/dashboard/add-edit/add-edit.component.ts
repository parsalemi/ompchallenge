import { Component, inject } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule } from "@angular/forms";
import { DashboardService } from "../dashboard.service";
import { map } from "rxjs";
import { addArticle } from "../articles/articles.component";

@Component({
  selector: 'app-add-edit',
  standalone: true,
  imports: [
    ReactiveFormsModule
  ],
  templateUrl: './add-edit.component.html',
  styleUrl: './add-edit.component.scss'
})
export class AddEditComponent {
  private _api = inject(DashboardService)

  addArticle = new FormGroup({
    title: new FormControl( ''),
    content: new FormControl(''),
})

  add(){
    const body: addArticle = {
      title: this.addArticle.value.title as string,
      content: this.addArticle.value.content as string
    }
    this._api.addArticle(body).subscribe(a => a);
    this.addArticle.reset();
  }
}
