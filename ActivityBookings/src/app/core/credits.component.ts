import {
  ChangeDetectionStrategy,
  Component,
  ModelSignal,
  WritableSignal,
  computed,
  model,
  signal,
} from '@angular/core';

@Component({
  selector: 'lab-credits',
  standalone: true,
  template: `
    <span (click)="openDialog.set(true)">💲 {{ moons() }}</span>
    <dialog [open]="openDialog()">
      <article>
        <header>
          <button aria-label="Close" rel="prev" (click)="openDialog.set(false)"></button>
          <p>💲 {{ moons() }}</p>
        </header>
        <form>
          <input type="number" [value]="credits()" (input)="onInput($event)" />
        </form>
      </article>
    </dialog>
  `,
  styles: ``,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CreditsComponent {
  /** Double input/output binding [(credits)]  */
  credits: ModelSignal<number> = model.required();

  /** Private signals for local state */
  openDialog: WritableSignal<boolean> = signal(false);

  /** Computed signals for presentation */
  moons = computed(() => {
    const credits = this.credits();
    if (credits > 9) return '🌕';
    if (credits > 6) return '🌔';
    if (credits > 3) return '🌓';
    if (credits > 0) return '🌒';
    return '🌑';
  });

  onInput(event: Event) {
    const target = event.target as HTMLInputElement;
    const value = target.value;
    // model signals propagate changes to parent like an output does
    this.credits.set(+value);
  }
}
