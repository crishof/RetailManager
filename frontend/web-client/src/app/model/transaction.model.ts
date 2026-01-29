export interface ITransaction {
  transactionId: string;
  date: string;
  transactionNumber: string;
  type: String;
  amount: number;
  description: string;
  taxSave: boolean;
}
