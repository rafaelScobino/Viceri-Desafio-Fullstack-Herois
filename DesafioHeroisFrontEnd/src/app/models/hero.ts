import { Power } from "./power";

export class Hero {
  id?: number;
  name: string = '';
  heroName: string = '';
  birth: string = '';
  height: number = 0;
  weight: number = 0;
  heroPowers: Power[] = [];

  constructor(init?: Partial<Hero>) {
    Object.assign(this, init);
  }

  static map(data: any): Hero {
    return new Hero({
      ...data,
      birth: data.birth ? data.birth.split('T')[0] : ''
    });
  }


  static mapList(list: any[]): Hero[] {
    return (list || []).map(item => Hero.map(item));
  }


  static mapOutput(data: any): any {
    return {
      ...data,
      id: data.id || null,
      heroPowers: data.powers.map((powerId: number) => ({
        powerId: powerId
      }))
    };
  }
}
