import { ComponentFixture, TestBed } from '@angular/core/testing';
import { EditpagePage } from './editpage.page';

describe('EditpagePage', () => {
  let component: EditpagePage;
  let fixture: ComponentFixture<EditpagePage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(EditpagePage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
