import { Component, computed } from '@angular/core';
import { RouterOutlet, NavigationEnd, Router } from '@angular/router';
import { SidebarComponent } from './layout/sidebar/sidebar.component';
import { TopbarComponent } from './layout/topbar/topbar.component';
import { toSignal } from '@angular/core/rxjs-interop';
import { filter, map } from 'rxjs/operators';

@Component({
  selector: "app-root",
  imports: [RouterOutlet, SidebarComponent, TopbarComponent],
  templateUrl: "./app.component.html",
  styleUrl: "./app.component.css",
})
export class AppComponent {
  sidebarCollapsed = false;

  private _url = toSignal(
    this.router.events.pipe(
      filter(e => e instanceof NavigationEnd),
      map(e => (e as NavigationEnd).urlAfterRedirects)
    ),
    { initialValue: this.router.url }
  );

  isLanding = computed(() => {
    const raw = this._url();
    // Extraer solo el pathname sin fragmento ni query: "/" o ""
    const pathname = raw.split('?')[0].split('#')[0];
    return pathname === '/' || pathname === '';
  });

  constructor(private router: Router) {}

  toggleSidebar() {
    this.sidebarCollapsed = !this.sidebarCollapsed;
  }
}
