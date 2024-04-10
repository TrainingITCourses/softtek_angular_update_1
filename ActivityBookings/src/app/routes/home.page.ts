import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
  selector: 'lab-home',
  standalone: true,
  imports: [],
  template: `
    <article>
      <header>My home page</header>
      <main>The amazing content</main>
      <footer>The home</footer>
    </article>
  `,
  styles: ``,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export default class HomePage {}
