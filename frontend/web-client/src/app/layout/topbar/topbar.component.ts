import { Component, EventEmitter, Input, Output } from '@angular/core';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-topbar',
  standalone: true,
  imports: [RouterLink],
  templateUrl: './topbar.component.html',
  styleUrl: './topbar.component.css',
})
export class TopbarComponent {
  @Input() sidebarCollapsed = false;
  @Output() toggleSidebar = new EventEmitter<void>();

  notificationCount = 3;
  showUserMenu = false;

  onToggle() {
    this.toggleSidebar.emit();
  }

  toggleUserMenu() {
    this.showUserMenu = !this.showUserMenu;
  }
}
