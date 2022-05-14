import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DashboardChartByCityComponent } from './dashboard-chart-by-city.component';

describe('DashboardChartByCityComponent', () => {
  let component: DashboardChartByCityComponent;
  let fixture: ComponentFixture<DashboardChartByCityComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DashboardChartByCityComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DashboardChartByCityComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
