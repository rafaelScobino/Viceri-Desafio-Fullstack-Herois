export class Power {
  id: number = 0;
  name: string = '';

  constructor(init?: Partial<Power>) {
    Object.assign(this, init);
  }
}
