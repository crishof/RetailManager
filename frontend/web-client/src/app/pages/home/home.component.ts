import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';

@Component({
    selector: 'app-home',
    standalone: true,
    imports: [RouterLink],
    templateUrl: './home.component.html',
    styleUrl: './home.component.css',
})
export class HomeComponent {
    quickLinks = [
        { label: 'Productos',       icon: 'inventory_2',   route: '/products',        color: 'bg-teal-500'   },
        { label: 'Proveedores',     icon: 'storefront',    route: '/supplier',        color: 'bg-blue-500'   },
        { label: 'Factura venta',   icon: 'receipt',       route: '/customerInvoice', color: 'bg-violet-500' },
        { label: 'Marcas',          icon: 'label',         route: '/brand',           color: 'bg-amber-500'  },
        { label: 'Categorías',      icon: 'category',      route: '/category',        color: 'bg-rose-500'   },
        { label: 'Lista de precios',icon: 'price_check',   route: '/supplierPriceList', color: 'bg-indigo-500'},
        { label: 'Dashboard',       icon: 'dashboard',     route: '/dashboard',       color: 'bg-emerald-600'},
        { label: 'Caja diaria',     icon: 'point_of_sale', route: '/caja',            color: 'bg-orange-500' },
    ];
}
