import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HeroListFilterComponent } from './hero-list-filter.component';

describe('HeroListFilterComponent', () => {
  let component: HeroListFilterComponent;
  let fixture: ComponentFixture<HeroListFilterComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [HeroListFilterComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(HeroListFilterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
