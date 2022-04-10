import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DashboardInactiveAdminComponent } from './dashboard-inactive-admin.component';

describe('DashboardInactiveAdminComponent', () => {
  let component: DashboardInactiveAdminComponent;
  let fixture: ComponentFixture<DashboardInactiveAdminComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DashboardInactiveAdminComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DashboardInactiveAdminComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
