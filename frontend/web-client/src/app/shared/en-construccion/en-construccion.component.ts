import { Component, inject } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-en-construccion',
  standalone: true,
  imports: [],
  template: `
    <div class="flex flex-col items-center justify-center min-h-[60vh] text-center px-4">
      <div class="w-24 h-24 rounded-full bg-primary-50 flex items-center justify-center mb-6">
        <span class="material-icons text-primary-500" style="font-size:3rem">construction</span>
      </div>
      <h2 class="text-2xl font-semibold text-slate-800 mb-2">
        {{ titulo }}
      </h2>
      <p class="text-slate-500 max-w-md">
        Esta sección está en construcción. Próximamente disponible.
      </p>
      <div class="mt-6 flex gap-2 items-center">
        <span class="inline-block w-2 h-2 rounded-full bg-primary-400 animate-bounce" style="animation-delay:0s"></span>
        <span class="inline-block w-2 h-2 rounded-full bg-primary-400 animate-bounce" style="animation-delay:.15s"></span>
        <span class="inline-block w-2 h-2 rounded-full bg-primary-400 animate-bounce" style="animation-delay:.3s"></span>
      </div>
    </div>
  `,
})
export class EnConstruccionComponent {
  private route = inject(ActivatedRoute);
  titulo = this.route.snapshot.data['titulo'] ?? 'Sección en construcción';
}
