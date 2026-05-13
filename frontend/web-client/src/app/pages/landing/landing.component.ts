import {
  Component,
  ChangeDetectionStrategy,
  OnInit,
  OnDestroy,
  Inject,
  PLATFORM_ID,
  signal,
} from '@angular/core';
import { isPlatformBrowser, DecimalPipe } from '@angular/common';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-landing',
  standalone: true,
  imports: [RouterLink, DecimalPipe],
  templateUrl: './landing.component.html',
  styleUrl: './landing.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class LandingComponent implements OnInit, OnDestroy {
  mobileMenuOpen = signal(false);
  activeAccordion = signal<number | null>(null);

  constructor(@Inject(PLATFORM_ID) private platformId: object) {}

  ngOnInit(): void {
    if (isPlatformBrowser(this.platformId)) {
      this.initScrollAnimations();
    }
  }

  ngOnDestroy(): void {}

  toggleMobileMenu(): void {
    this.mobileMenuOpen.update(v => !v);
  }

  toggleAccordion(index: number): void {
    this.activeAccordion.update(v => (v === index ? null : index));
  }

  isAccordionOpen(index: number): boolean {
    return this.activeAccordion() === index;
  }

  private initScrollAnimations(): void {
    const observer = new IntersectionObserver(
      entries => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            entry.target.classList.add('rm-visible');
          }
        });
      },
      { threshold: 0.1 }
    );

    setTimeout(() => {
      document.querySelectorAll('.rm-animate').forEach(el => observer.observe(el));
    }, 100);
  }

  plans = [
    {
      name: 'Starter',
      price: '$19',
      desc: 'Ideal para emprendedores',
      highlight: false,
      badge: '',
      features: [
        { label: 'Productos', value: 'Hasta 200' },
        { label: 'Sucursales', value: '1' },
        { label: 'Usuarios', value: '2' },
        { label: 'Ecommerce', value: false },
        { label: 'Soporte', value: 'Email' },
        { label: 'Reportes avanzados', value: false },
        { label: 'Facturación', value: true },
        { label: 'CRM básico', value: true },
      ],
      cta: 'Elegir plan',
      ctaClass: 'btn-outline',
    },
    {
      name: 'Plus',
      price: '$49',
      desc: 'El más elegido por pymes',
      highlight: true,
      badge: 'Recomendado',
      features: [
        { label: 'Productos', value: 'Hasta 2.000' },
        { label: 'Sucursales', value: '3' },
        { label: 'Usuarios', value: '8' },
        { label: 'Ecommerce', value: true },
        { label: 'Soporte', value: 'Email + Chat' },
        { label: 'Reportes avanzados', value: true },
        { label: 'Facturación', value: true },
        { label: 'CRM completo', value: true },
      ],
      cta: 'Elegir plan',
      ctaClass: 'btn-primary',
    },
    {
      name: 'Premium',
      price: '$99',
      desc: 'Para empresas en expansión',
      highlight: false,
      badge: '',
      features: [
        { label: 'Productos', value: 'Ilimitados' },
        { label: 'Sucursales', value: '10' },
        { label: 'Usuarios', value: '25' },
        { label: 'Ecommerce', value: true },
        { label: 'Soporte', value: 'Prioritario 24/7' },
        { label: 'Reportes avanzados', value: true },
        { label: 'Facturación', value: true },
        { label: 'CRM completo', value: true },
      ],
      cta: 'Elegir plan',
      ctaClass: 'btn-outline',
    },
    {
      name: 'Enterprise',
      price: 'A medida',
      desc: 'Solución personalizada',
      highlight: false,
      badge: '',
      features: [
        { label: 'Productos', value: 'Ilimitados' },
        { label: 'Sucursales', value: 'Ilimitadas' },
        { label: 'Usuarios', value: 'Ilimitados' },
        { label: 'Ecommerce', value: true },
        { label: 'Soporte', value: 'Dedicado SLA' },
        { label: 'Reportes avanzados', value: true },
        { label: 'Facturación', value: true },
        { label: 'CRM completo', value: true },
      ],
      cta: 'Hablar con ventas',
      ctaClass: 'btn-outline',
    },
  ];

  features = [
    { icon: 'people', title: 'CRM de clientes', desc: 'Historial completo, cuentas corrientes y seguimiento de cada cliente.' },
    { icon: 'local_shipping', title: 'Proveedores y CC', desc: 'Gestión de proveedores, órdenes de compra y cuentas corrientes.' },
    { icon: 'receipt_long', title: 'Facturación', desc: 'Facturas A/B/C, notas de crédito, remitos y presupuestos.' },
    { icon: 'inventory', title: 'Control de stock', desc: 'Stock en tiempo real por sucursal, depósito y canal de venta.' },
    { icon: 'manage_search', title: 'Auditorías', desc: 'Trazabilidad completa de movimientos y cambios en el sistema.' },
    { icon: 'store', title: 'Multi-sucursal', desc: 'Operá múltiples locales desde un único panel centralizado.' },
    { icon: 'point_of_sale', title: 'Caja y fondos', desc: 'Control de caja diaria, movimientos y flujo de efectivo.' },
    { icon: 'bar_chart', title: 'Reportes inteligentes', desc: 'Dashboards dinámicos, exportación a Excel y estadísticas de ventas.' },
    { icon: 'shopping_cart', title: 'Ecommerce integrado', desc: 'Publicá productos en tu tienda online sincronizada con el stock.' },
    { icon: 'sell', title: 'Productos y precios', desc: 'Gestión avanzada de catálogo, listas de precios y promociones.' },
  ];

  useCases = [
    {
      icon: 'storefront',
      title: 'Tiendas retail',
      desc: 'Control completo de ventas, stock y clientes.',
      points: ['Stock en tiempo real', 'Facturación integrada', 'Ecommerce propio'],
    },
    {
      icon: 'local_shipping',
      title: 'Distribuidoras',
      desc: 'Gestión de proveedores, despachos y cuentas.',
      points: ['Pedidos a sucursales', 'Remitos y recepciones', 'Cuentas corrientes'],
    },
    {
      icon: 'restaurant',
      title: 'Gastronomía',
      desc: 'Insumos, costos y servicio al cliente.',
      points: ['Control de insumos', 'Caja diaria', 'Pedidos online'],
    },
    {
      icon: 'hardware',
      title: 'Ferreterías',
      desc: 'Catálogo extenso, ubicaciones y proveedores.',
      points: ['Miles de productos', 'Depósitos y ubicaciones', 'Lista de precios'],
    },
    {
      icon: 'checkroom',
      title: 'Indumentaria',
      desc: 'Talles, colores, temporadas y ecommerce.',
      points: ['Variantes de producto', 'Catálogo visual online', 'Multi-sucursal'],
    },
    {
      icon: 'build',
      title: 'Servicios técnicos',
      desc: 'Órdenes de trabajo, turnos y garantías.',
      points: ['Órdenes de servicio', 'Número de serie', 'Gestión de turnos'],
    },
  ];

  testimonials = [
    {
      name: 'Mariana Solís',
      role: 'Gerente Comercial',
      company: 'TecnoHogar S.R.L.',
      text: 'Desde que implementamos RetailManager dejamos de perder ventas por stock desactualizado. El ecommerce integrado nos abrió un canal nuevo en menos de una semana.',
      avatar: 'MS',
    },
    {
      name: 'Rodrigo Ibáñez',
      role: 'Dueño',
      company: 'Ferretería El Tornillo',
      text: 'Teníamos todo en Excel. La migración fue más fácil de lo que pensaba y ahora tengo visibilidad total del stock en mis tres locales desde el celular.',
      avatar: 'RI',
    },
    {
      name: 'Carolina Mena',
      role: 'Directora de Operaciones',
      company: 'Distribuidora Andina',
      text: 'El control de cuentas corrientes con proveedores y el sistema de remitos nos ahorra horas de trabajo administrativo todos los días.',
      avatar: 'CM',
    },
  ];

  faqs = [
    {
      q: '¿Puedo empezar con pocos productos?',
      a: 'Sí. El plan Starter está pensado para negocios que arrancan, con hasta 200 productos y sin costo de configuración inicial.',
    },
    {
      q: '¿Sirve si tengo varias sucursales?',
      a: 'Absolutamente. RetailManager soporta múltiples sucursales y depósitos con stock independiente y panel unificado desde el plan Plus.',
    },
    {
      q: '¿El ecommerce viene incluido?',
      a: 'Desde el plan Plus. Incluye una tienda propia con catálogo sincronizado, carrito de compras y gestión de pedidos integrada al sistema.',
    },
    {
      q: '¿Puedo migrar desde Excel?',
      a: 'Sí. Contamos con importadores de productos, precios y clientes desde archivos Excel. El equipo de soporte te acompaña en el proceso.',
    },
    {
      q: '¿Funciona para Argentina y España?',
      a: 'Sí. El sistema soporta facturación electrónica argentina (AFIP) y adaptación para España, con IVA configurables y distintos formatos de comprobantes.',
    },
    {
      q: '¿Qué pasa si crece mi negocio?',
      a: 'Podés cambiar de plan en cualquier momento sin perder datos. El sistema está diseñado para escalar sin fricciones.',
    },
    {
      q: '¿Se puede integrar con pasarelas de pago?',
      a: 'Sí. El ecommerce integrado es compatible con Mercado Pago, PayU y otras pasarelas. También soporta tarjetas, transferencias y cuentas corrientes.',
    },
    {
      q: '¿Es seguro? ¿Mis datos están respaldados?',
      a: 'Los datos se almacenan con cifrado, backups automáticos diarios y acceso por roles. La plataforma cumple estándares de seguridad empresarial.',
    },
  ];
}
