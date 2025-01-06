export interface IPayments {
  id: number;
  name: string;
  email: string;
  cpf: number;
  total: number;
  customer_id: string | null;
  status: number;
}