import { ChangeDetectionStrategy, Component, ModelSignal, model } from '@angular/core';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'lab-credits',
  standalone: true,
  imports: [FormsModule],
  template: `
    <dialog open>
      <article>
        <input type="number" [(ngModel)]="credits" />
      </article>
    </dialog>
  `,
  styles: ``,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CreditsComponent {
  // ToDo
  credits: ModelSignal<number> = model(0);
}
