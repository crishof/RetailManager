import { Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormBuilder, FormGroup, Validators } from '@angular/forms';
import {
  CashService,
  ICashSessionResponse,
  ICashMovementResponse,
} from '../../services/cash.service';
import { BranchService } from '../../services/branch.service';
import { IBranch } from '../../model/branch.model';

@Component({
  selector: 'app-cash',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './cash.component.html',
  styleUrls: ['./cash.component.css'],
})
export class CashComponent implements OnInit {
  private cashService = inject(CashService);
  private branchService = inject(BranchService);
  private fb = inject(FormBuilder);

  branches: IBranch[] = [];
  selectedBranchId: string = '';

  currentSession: ICashSessionResponse | null = null;
  movements: ICashMovementResponse[] = [];
  historySessions: ICashSessionResponse[] = [];
  selectedHistorySession: ICashSessionResponse | null = null;
  historyMovements: ICashMovementResponse[] = [];

  loading = false;
  errorMessage = '';

  // Open session form
  showOpenForm = false;
  openForm: FormGroup = this.fb.group({
    openingBalance: [0, [Validators.required, Validators.min(0)]],
    notes: [''],
  });
  isOpening = false;
  openError = '';

  // Close session form
  showCloseForm = false;
  closeForm: FormGroup = this.fb.group({
    closingBalance: [0, [Validators.required, Validators.min(0)]],
    notes: [''],
  });
  isClosing = false;
  closeError = '';

  // Movement form
  showMovementForm = false;
  movementForm: FormGroup = this.fb.group({
    type: ['INCOME', Validators.required],
    amount: [0, [Validators.required, Validators.min(0.01)]],
    description: ['', Validators.required],
    reference: [''],
  });
  isSavingMovement = false;
  movementError = '';
  movementSuccess = false;

  activeView: 'session' | 'history' = 'session';

  readonly movementTypes = [
    { value: 'INCOME', label: 'Ingreso' },
    { value: 'EXPENSE', label: 'Egreso' },
  ];

  readonly typeLabels: Record<string, string> = {
    INCOME: 'Ingreso',
    EXPENSE: 'Egreso',
    SALE: 'Venta',
    CUSTOMER_PAYMENT: 'Cobro cliente',
    SUPPLIER_PAYMENT: 'Pago proveedor',
    OPENING: 'Apertura',
    CLOSING: 'Cierre',
  };

  ngOnInit(): void {
    this.branchService.getBranches().subscribe({
      next: (branches) => {
        this.branches = branches.filter((b) => b.active);
        if (this.branches.length > 0) {
          this.selectedBranchId = this.branches[0].id;
          this.loadCurrentSession();
        }
      },
      error: () => {
        this.errorMessage = 'No se pudieron cargar las sucursales.';
      },
    });
  }

  onBranchChange(event: Event): void {
    this.selectedBranchId = (event.target as HTMLSelectElement).value;
    this.currentSession = null;
    this.movements = [];
    this.errorMessage = '';
    this.loadCurrentSession();
  }

  loadCurrentSession(): void {
    if (!this.selectedBranchId) return;
    this.loading = true;
    this.cashService.getCurrentSession(this.selectedBranchId).subscribe({
      next: (session) => {
        this.currentSession = session;
        this.loading = false;
        this.loadMovements(session.id);
      },
      error: () => {
        this.currentSession = null;
        this.loading = false;
      },
    });
  }

  loadMovements(sessionId: string): void {
    this.cashService.getMovements(sessionId).subscribe({
      next: (mvs) => (this.movements = mvs),
    });
  }

  loadHistory(): void {
    if (!this.selectedBranchId) return;
    this.cashService.getAllSessions(this.selectedBranchId).subscribe({
      next: (sessions) => (this.historySessions = sessions),
    });
  }

  selectHistorySession(session: ICashSessionResponse): void {
    this.selectedHistorySession = session;
    this.cashService.getMovements(session.id).subscribe({
      next: (mvs) => (this.historyMovements = mvs),
    });
  }

  switchView(view: 'session' | 'history'): void {
    this.activeView = view;
    if (view === 'history') {
      this.loadHistory();
    }
  }

  // Open session
  onOpenSession(): void {
    if (this.openForm.invalid) return;
    this.isOpening = true;
    this.openError = '';
    this.cashService
      .openSession({
        branchId: this.selectedBranchId,
        openingBalance: this.openForm.value.openingBalance,
        notes: this.openForm.value.notes || undefined,
      })
      .subscribe({
        next: (session) => {
          this.currentSession = session;
          this.movements = [];
          this.showOpenForm = false;
          this.openForm.reset({ openingBalance: 0, notes: '' });
          this.isOpening = false;
        },
        error: () => {
          this.openError = 'Error al abrir la sesión de caja.';
          this.isOpening = false;
        },
      });
  }

  // Close session
  onCloseSession(): void {
    if (!this.currentSession || this.closeForm.invalid) return;
    this.isClosing = true;
    this.closeError = '';
    this.cashService
      .closeSession(this.currentSession.id, {
        closingBalance: this.closeForm.value.closingBalance,
        notes: this.closeForm.value.notes || undefined,
      })
      .subscribe({
        next: (session) => {
          this.currentSession = null;
          this.movements = [];
          this.showCloseForm = false;
          this.closeForm.reset({ closingBalance: 0, notes: '' });
          this.isClosing = false;
          this.loadHistory();
        },
        error: () => {
          this.closeError = 'Error al cerrar la sesión de caja.';
          this.isClosing = false;
        },
      });
  }

  // Add movement
  onAddMovement(): void {
    if (!this.currentSession || this.movementForm.invalid) return;
    this.isSavingMovement = true;
    this.movementError = '';
    this.movementSuccess = false;
    this.cashService
      .addMovement(this.currentSession.id, {
        type: this.movementForm.value.type,
        amount: this.movementForm.value.amount,
        description: this.movementForm.value.description,
        reference: this.movementForm.value.reference || undefined,
      })
      .subscribe({
        next: (mv) => {
          this.movements.push(mv);
          this.movementSuccess = true;
          this.movementForm.reset({ type: 'INCOME', amount: 0, description: '', reference: '' });
          this.showMovementForm = false;
          this.isSavingMovement = false;
          // Refresh session totals
          this.cashService.getSessionById(this.currentSession!.id).subscribe({
            next: (s) => (this.currentSession = s),
          });
          setTimeout(() => (this.movementSuccess = false), 3000);
        },
        error: () => {
          this.movementError = 'Error al registrar el movimiento.';
          this.isSavingMovement = false;
        },
      });
  }

  isIncome(type: string): boolean {
    return ['INCOME', 'SALE', 'CUSTOMER_PAYMENT', 'OPENING'].includes(type);
  }

  trackById(_: number, item: { id: string }): string {
    return item.id;
  }
}
