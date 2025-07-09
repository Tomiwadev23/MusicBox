import { ComponentFixture, TestBed } from '@angular/core/testing';
import { TryPage } from './try.page';

describe('TryPage', () => {
  let component: TryPage;
  let fixture: ComponentFixture<TryPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(TryPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
