import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DisattivaNewsletterComponent } from './disattiva-newsletter.component';

describe('DisattivaNewsletterComponent', () => {
  let component: DisattivaNewsletterComponent;
  let fixture: ComponentFixture<DisattivaNewsletterComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [DisattivaNewsletterComponent]
    });
    fixture = TestBed.createComponent(DisattivaNewsletterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
