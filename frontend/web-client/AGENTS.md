---
description: Angular app with Tailwind CSS, SSR support, and B2B dashboard
---

# Ecommerce Web Client (Admin/B2B Dashboard)

## Project Context

**Web Client** - Angular 21 server-side rendered (SSR) application for B2B operations, admin dashboard, and supplier portal.

- **Location**: `frontend/web-client/`
- **Backend**: Spring microservices (Gateway at http://localhost:8080)
- **Dev Server**: http://localhost:4200 (Angular dev server with SSR)
- **Build**: Angular with Express server support

## Tech Stack

- **Framework**: Angular 21 (standalone components)
- **Language**: TypeScript 5.9 (strict mode)
- **Styling**: Tailwind CSS 4.3 + PostCSS
- **Server**: Express.js (SSR)
- **Testing**: Vitest
- **Package Manager**: npm

## Project Guidelines

### Code Style

- **Strict TypeScript**: All files must compile with strict mode enabled
- **Standalone Components**: Use `@Component()` with `imports` array
- **Reactive Programming**: Signals for state, computed() for derived state
- **Change Detection**: Always use `ChangeDetectionStrategy.OnPush`
- **Tailwind CSS**: Use utility classes for all styling

### Component Patterns

```typescript
// ✅ Correct: Standalone with OnPush
@Component({
  selector: 'app-dashboard',
  imports: [CommonModule, TailwindDirectives],
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `<div class="px-4 py-6">...</div>`,
})
export class DashboardComponent {
  orders = input<Order[]>();
  refreshed = output<void>();
}

// ❌ Wrong: Template logic, deprecated directives
```

## Project Structure

```
src/
├── app/
│   ├── app.ts                    # Root component
│   ├── app.config.ts             # App providers + SSR config
│   ├── app.routes.ts             # Route definitions
│   ├── app.server.ts             # Server bootstrap (SSR)
│   ├── core/
│   │   ├── services/
│   │   ├── guards/
│   │   └── interceptors/
│   ├── shared/
│   │   ├── components/
│   │   ├── ui/                   # Tailwind-based UI components
│   │   └── utils/
│   └── features/
│       ├── dashboard/
│       ├── suppliers/
│       ├── inventory/
│       ├── analytics/
│       └── settings/
├── styles.css                    # Tailwind imports + globals
├── index.html
└── server.ts                     # Express server for SSR
```

## Commands

```bash
npm start              # Dev server with SSR (http://localhost:4200)
npm run build          # Production build with SSR
npm run build:ssr      # SSR build only
npm run serve:ssr      # Serve SSR build
npm test               # Run tests
```

## Backend Integration

API Gateway: `http://localhost:8080`

### Microservices Routes
- **Dashboard**: Product, Order, Customer aggregate data
- **Suppliers**: Supplier portal and price lists
- **Inventory**: Stock management and transfers
- **Analytics**: Sales trends and reporting
- **Settings**: User preferences and configurations

## SSR Considerations

### No Browser APIs in Components
```typescript
// ❌ Wrong: localStorage not available on server
ngOnInit() {
  const user = JSON.parse(localStorage.getItem('user'));
}

// ✅ Correct: Guard with isPlatformBrowser
constructor(private platformId: Object) {}

ngOnInit() {
  if (isPlatformBrowser(this.platformId)) {
    const user = JSON.parse(localStorage.getItem('user'));
  }
}
```

### Avoid DOM Manipulation
- Use Angular templates instead of direct DOM queries
- Use `@ViewChild()` with proper typing
- Use `@HostListener()` for event binding

## Accessibility

Every component MUST:
- Pass AXE accessibility checks
- Meet WCAG AA color contrast
- Support keyboard navigation
- Include semantic HTML and ARIA attributes

## When to Use Skills

| Task | Skill |
|------|-------|
| Build dashboard page or UI component | `frontend-design` |
| Audit accessibility compliance | `accessibility` |
| Add meta tags, sitemap, structured data | `seo` |

## Important Notes

1. **Tailwind CSS**: Already configured with PostCSS
2. **SSR Enabled**: Be mindful of platform detection
3. **Tree-shaking**: Import only needed Angular modules
4. **Performance**: Use `OnPush` change detection everywhere
5. **Code Splitting**: Lazy-load feature routes

## Troubleshooting

- **Build errors**: Check `tsconfig.app.json` strict settings
- **SSR errors**: Ensure no browser APIs in components
- **Tailwind not working**: Run `npm install` to sync styles