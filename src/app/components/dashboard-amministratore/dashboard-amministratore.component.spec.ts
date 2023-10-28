import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DashboardAmministratoreComponent } from './dashboard-amministratore.component';

describe('DashboardAmministratoreComponent', () => {
  let component: DashboardAmministratoreComponent;
  let fixture: ComponentFixture<DashboardAmministratoreComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [DashboardAmministratoreComponent]
    });
    fixture = TestBed.createComponent(DashboardAmministratoreComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
