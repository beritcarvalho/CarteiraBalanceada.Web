import { Investimento } from "./investimento";

export interface Carteira {
  id: string;
  nome: string;
  ativo: boolean,
  investimentos: Investimento[]
}