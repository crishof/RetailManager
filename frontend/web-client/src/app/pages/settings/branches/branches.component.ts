import { CommonModule } from '@angular/common';
import { Component, OnInit, inject } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { IBranch, IBranchRequest } from '../../../model/branch.model';
import { ILocation, ILocationRequest, LocationType } from '../../../model/location.model';
import { BranchService } from '../../../services/branch.service';

@Component({
  selector: 'app-branches',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './branches.component.html',
  styleUrl: './branches.component.css',
})
export class BranchesComponent implements OnInit {
  private readonly branchService = inject(BranchService);
  private readonly fb = inject(FormBuilder);

  branches: IBranch[] = [];
  selectedBranch: IBranch | null = null;

  loading = false;
  successMessage = '';
  errorMessage = '';

  // Modal state
  branchModalOpen = false;
  branchModalMode: 'create' | 'edit' = 'create';
  locationModalOpen = false;
  locationModalMode: 'create' | 'edit' = 'create';
  editingLocationId: string | null = null;
  deletingBranch: IBranch | null = null;
  deletingLocation: ILocation | null = null;
  saving = false;

  readonly locationTypes: { value: LocationType; label: string }[] = [
    { value: 'SALES', label: 'Mostrador / Ventas' },
    { value: 'WAREHOUSE', label: 'Depósito' },
    { value: 'TRANSIT', label: 'Tránsito' },
    { value: 'CONSIGNMENT', label: 'Consignación' },
  ];

  readonly branchForm = this.fb.group({
    code: ['', [Validators.required, Validators.maxLength(20)]],
    name: ['', Validators.required],
    address: [''],
    active: [true],
  });

  readonly locationForm = this.fb.group({
    code: ['', [Validators.required, Validators.maxLength(20)]],
    name: ['', Validators.required],
    locationType: ['SALES' as LocationType, Validators.required],
    active: [true],
  });

  ngOnInit(): void {
    this.loadBranches();
  }

  loadBranches(): void {
    this.loading = true;
    this.branchService.getBranches().subscribe({
      next: (list) => {
        this.branches = list;
        // Keep selection in sync after reload
        if (this.selectedBranch) {
          this.selectedBranch = list.find(b => b.id === this.selectedBranch?.id) ?? list[0] ?? null;
        } else {
          this.selectedBranch = list[0] ?? null;
        }
        this.loading = false;
      },
      error: () => {
        this.errorMessage = 'No se pudieron cargar las sucursales.';
        this.loading = false;
      },
    });
  }

  selectBranch(branch: IBranch): void {
    this.selectedBranch = branch;
  }

  // ── Branch modal ──────────────────────────────────────────────────────────

  openCreateBranch(): void {
    this.branchModalMode = 'create';
    this.branchForm.reset({ active: true });
    this.branchModalOpen = true;
  }

  openEditBranch(branch: IBranch): void {
    this.branchModalMode = 'edit';
    this.branchForm.setValue({
      code: branch.code,
      name: branch.name,
      address: branch.address ?? '',
      active: branch.active,
    });
    this.branchModalOpen = true;
  }

  saveBranch(): void {
    if (this.branchForm.invalid) return;
    this.saving = true;
    const request = this.branchForm.value as IBranchRequest;

    const op$ = this.branchModalMode === 'create'
      ? this.branchService.createBranch(request)
      : this.branchService.updateBranch(this.selectedBranch?.id ?? '', request);

    op$.subscribe({
      next: () => {
        this.successMessage = this.branchModalMode === 'create'
          ? 'Sucursal creada correctamente.'
          : 'Sucursal actualizada.';
        this.branchModalOpen = false;
        this.saving = false;
        this.loadBranches();
        this.clearMessages();
      },
      error: () => {
        this.errorMessage = 'Error al guardar la sucursal.';
        this.saving = false;
      },
    });
  }

  confirmDeleteBranch(branch: IBranch, event: Event): void {
    event.stopPropagation();
    this.deletingBranch = branch;
  }

  deleteBranch(): void {
    if (!this.deletingBranch) return;
    this.branchService.deleteBranch(this.deletingBranch.id).subscribe({
      next: () => {
        this.successMessage = 'Sucursal eliminada.';
        if (this.selectedBranch?.id === this.deletingBranch?.id) {
          this.selectedBranch = null;
        }
        this.deletingBranch = null;
        this.loadBranches();
        this.clearMessages();
      },
      error: () => {
        this.errorMessage = 'Error al eliminar la sucursal.';
        this.deletingBranch = null;
      },
    });
  }

  // ── Location modal ────────────────────────────────────────────────────────

  openCreateLocation(): void {
    this.locationModalMode = 'create';
    this.editingLocationId = null;
    this.locationForm.reset({ locationType: 'SALES', active: true });
    this.locationModalOpen = true;
  }

  openEditLocation(location: ILocation): void {
    this.locationModalMode = 'edit';
    this.editingLocationId = location.id;
    this.locationForm.setValue({
      code: location.code,
      name: location.name,
      locationType: location.locationType,
      active: location.active,
    });
    this.locationModalOpen = true;
  }

  saveLocation(): void {
    if (this.locationForm.invalid || !this.selectedBranch) return;
    this.saving = true;
    const request = this.locationForm.value as ILocationRequest;
    const branchId = this.selectedBranch.id;

    const op$ = this.locationModalMode === 'create'
      ? this.branchService.createLocation(branchId, request)
      : this.branchService.updateLocation(branchId, this.editingLocationId ?? '', request);

    op$.subscribe({
      next: (updated) => {
        this.successMessage = this.locationModalMode === 'create'
          ? 'Depósito creado correctamente.'
          : 'Depósito actualizado.';
        this.locationModalOpen = false;
        this.saving = false;
        // Reload and keep selection
        this.loadBranches();
        this.clearMessages();
      },
      error: () => {
        this.errorMessage = 'Error al guardar el depósito.';
        this.saving = false;
      },
    });
  }

  confirmDeleteLocation(location: ILocation): void {
    this.deletingLocation = location;
  }

  deleteLocation(): void {
    if (!this.deletingLocation || !this.selectedBranch) return;
    this.branchService.deleteLocation(this.selectedBranch.id, this.deletingLocation.id).subscribe({
      next: (updated) => {
        this.successMessage = 'Depósito eliminado.';
        this.selectedBranch = updated;
        this.deletingLocation = null;
        this.loadBranches();
        this.clearMessages();
      },
      error: () => {
        this.errorMessage = 'Error al eliminar el depósito.';
        this.deletingLocation = null;
      },
    });
  }

  locationTypeLabel(type: LocationType): string {
    return this.locationTypes.find(t => t.value === type)?.label ?? type;
  }

  private clearMessages(): void {
    setTimeout(() => {
      this.successMessage = '';
      this.errorMessage = '';
    }, 3500);
  }
}
