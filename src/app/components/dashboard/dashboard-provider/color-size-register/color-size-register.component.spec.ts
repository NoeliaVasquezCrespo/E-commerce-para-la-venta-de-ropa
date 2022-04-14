import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ColorSizeRegisterComponent } from './color-size-register.component';

describe('ColorSizeRegisterComponent', () => {
  let component: ColorSizeRegisterComponent;
  let fixture: ComponentFixture<ColorSizeRegisterComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ColorSizeRegisterComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ColorSizeRegisterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
