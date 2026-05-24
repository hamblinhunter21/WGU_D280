import { Component, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { World } from './world/world';
@Component({
  selector: 'app-root',
  imports: [RouterOutlet, World],
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class App {
  protected readonly title = signal('first-app');
}
