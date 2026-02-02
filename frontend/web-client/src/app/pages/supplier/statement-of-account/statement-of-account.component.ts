import { CommonModule, NgClass } from "@angular/common";
import { Component, inject, Input, OnInit } from "@angular/core";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { SupplierDetailsComponent } from "../supplier-details/supplier-details.component";
import { SupplierNavbarComponent } from "../supplier-navbar/supplier-navbar.component";
import { ITransaction } from "../../../model/transaction.model";
import { TransactionService } from "../../../services/transaction.service";
import { ISupplier } from "../../../model/supplier.model";
import { ActivatedRoute } from "@angular/router";
import { ModalDialogService } from "../../../services/modal-dialog.service";

@Component({
  selector: "app-statement-of-account",
  imports: [
    CommonModule,
    SupplierNavbarComponent,
    SupplierDetailsComponent,
    FormsModule,
    ReactiveFormsModule,
    NgClass,
  ],
  templateUrl: "./statement-of-account.component.html",
  styleUrl: "./statement-of-account.component.css",
})
export class StatementOfAccountComponent implements OnInit {
  readonly route = inject(ActivatedRoute);
  @Input() supplier: ISupplier | null = null;
  transactionList: ITransaction[] = [];
  selectedTransaction: ITransaction | null = null;
  totalB: number = 0;
  totalN: number = 0;
  totalBalance: number = 0;

  supplierId: string | null = null;
  balance: number = 0;

  currentTransaction: ITransaction | null = null;

  readonly modalDialogService = inject(ModalDialogService);
  readonly _transactionService = inject(TransactionService);

  ngOnInit(): void {
    this.route.paramMap.subscribe((params) => {
      this.supplierId = params.get("id");

      if (this.supplierId) {
        this._transactionService
          .getTransactions(this.supplierId)
          .subscribe((data: ITransaction[]) => {
            this.transactionList = data;
          });
      }
    });
    this.calculateTotals();
  }

  // Definir la función trackByFn para usar en el *ngFor
  trackByFn(index: number, item: ITransaction): any {
    return item.transactionId; // O el campo único que tiene cada transacción, por ejemplo, el id
  }

  calculateBalance(): number[] {
    let balance = 0;
    const balanceList = this.transactionList.map((transaction) => {
      balance +=
        transaction.type === "invoice"
          ? transaction.amount
          : -transaction.amount;
      return balance;
    });
    return balanceList;
  }

  getTotalBalance() {
    const balanceList = this.calculateBalance();
    return balanceList.length > 0 ? balanceList[balanceList.length - 1] : 0;
  }

  totals = {
    totalB: 10,
    totalN: 20,
    totalBalance: 30,
  };

  calculateTotals() {
    let balance = 0;
    let totalB = 0;
    let totalN = 0;

    this.transactionList.forEach((transaction) => {
      // Cálculo del balance acumulado
      balance +=
        transaction.type === "invoice"
          ? transaction.amount
          : -transaction.amount;

      // Cálculo de Total B (saveTax=true)
      if (transaction.taxSave) {
        totalB += transaction.amount;
      } else {
        // Cálculo de Total N (saveTax=false)
        totalN += transaction.amount;
      }
    });

    // Asignar los resultados a las propiedades de 'totals'
    this.totals.totalB = totalB;
    this.totals.totalN = totalN;
    this.totals.totalBalance = balance;
  }

  selectTransaction(transaction: ITransaction) {
    console.log(transaction.description);
    this._transactionService.setSelectedTransaction(transaction);
    this.currentTransaction = { ...transaction };
  }

  openCreateModal() {}
  openEditModal() {}
  openDeleteModal() {}
}
