import { Investimento } from "./investimento";

export interface Carteira {
  id: string;
  nome: string;
  valorCarteira: number;
  valorComAporte: number;
  aporte: number;
  investimentos: Investimento[]
}