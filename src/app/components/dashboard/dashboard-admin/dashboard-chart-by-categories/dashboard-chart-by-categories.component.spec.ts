import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DashboardChartByCategoriesComponent } from './dashboard-chart-by-categories.component';

describe('DashboardChartByCategoriesComponent', () => {
  let component: DashboardChartByCategoriesComponent;
  let fixture: ComponentFixture<DashboardChartByCategoriesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DashboardChartByCategoriesComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DashboardChartByCategoriesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
