import { Output } from '@angular/core';
import { Superpoder } from "./superpoder";

export class Heroi {
  id!: number;
  nome: string = '';
  nomeHeroi: string = '';
  dataNascimento: string = '';
  altura: number = 0;
  peso: number = 0;
  heroiSuperpoderes: Superpoder[] = [];

  constructor(init?: Partial<Heroi>) {
    Object.assign(this, init);
  }

  static map(data: any): Heroi {
    return new Heroi({
      ...data,
      dataNascimento: data.dataNascimento ? data.dataNascimento.split('T')[0] : ''
    });
  }


  static mapList(list: any[]): Heroi[] {
    return (list || []).map(item => Heroi.map(item));
  }


public static mapOutput(data: any): any {
  return {
    nome: data.nome,
    nomeHeroi: data.nomeHeroi,
    dataNascimento: data.dataNascimento,
    altura: data.altura,
    peso: data.peso,
    heroiSuperpoderesIds: data.heroiSuperpoderes ? [...data.heroiSuperpoderes] : []
  };
}
}
