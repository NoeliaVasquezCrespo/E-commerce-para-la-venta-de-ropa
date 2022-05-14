import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DashboardProductsReportComponent } from './dashboard-products-report.component';

describe('DashboardProductsReportComponent', () => {
  let component: DashboardProductsReportComponent;
  let fixture: ComponentFixture<DashboardProductsReportComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DashboardProductsReportComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DashboardProductsReportComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
