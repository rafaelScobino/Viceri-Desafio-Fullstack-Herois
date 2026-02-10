export class Superpoder {
  id: number = 0;
  superpoder: string = '';
  descricao: string = '';

  constructor(init?: Partial<Superpoder>) {
    Object.assign(this, init);
  }
}
