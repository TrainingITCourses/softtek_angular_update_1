import {
  ChangeDetectionStrategy,
  Component,
  ModelSignal,
  OutputEmitterRef,
  model,
  output,
} from '@angular/core';

export type Acceptance = 'essentials' | 'all';

@Component({
  selector: 'lab-cookies',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <dialog [open]="openDialog()">
      <article>
        <header>
          <h2>We use cookies</h2>
          <p>To ensure you get the best experience on our website.</p>
        </header>
        <section>
          <p>To be compliant with the EU GDPR law, we need your consent to set the cookies.</p>
        </section>
        <footer>
          <button class="contrast outline" (click)="onButtonsClick()">Cancel</button>
          <button class="secondary outline" (click)="onButtonsClick('essentials')">
            Essentials
          </button>
          <button class="primary outline" (click)="onButtonsClick('all')">Accept all</button>
        </footer>
      </article>
    </dialog>
  `,
})
export class CookiesComponent {
  cancel: OutputEmitterRef<void> = output();
  accept: OutputEmitterRef<Acceptance> = output<Acceptance>();

  openDialog: ModelSignal<boolean> = model(false);

  onButtonsClick(acceptance?: Acceptance) {
    this.openDialog.set(false);
    if (acceptance) this.accept.emit(acceptance);
    else this.cancel.emit();
  }
}
