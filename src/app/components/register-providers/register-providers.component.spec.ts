import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RegisterProvidersComponent } from './register-providers.component';

describe('RegisterProvidersComponent', () => {
  let component: RegisterProvidersComponent;
  let fixture: ComponentFixture<RegisterProvidersComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RegisterProvidersComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(RegisterProvidersComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
