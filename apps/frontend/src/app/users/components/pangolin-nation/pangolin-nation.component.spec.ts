import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PangolinNationComponent } from './pangolin-nation.component';

describe('PangolinNationComponent', () => {
  let component: PangolinNationComponent;
  let fixture: ComponentFixture<PangolinNationComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [PangolinNationComponent]
    })
      .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PangolinNationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
