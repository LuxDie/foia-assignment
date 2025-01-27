import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';
import { AnswersComponent } from './answers/answers.component';

@Component({
  selector: 'app-root',
  imports: [RouterModule, AnswersComponent],
  templateUrl: './app.component.html'
})
export class AppComponent {
  title = 'foia-assignment';
}
