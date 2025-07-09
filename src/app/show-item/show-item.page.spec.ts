import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ShowItemPage } from './show-item.page';

describe('ShowItemPage', () => {
  let component: ShowItemPage;
  let fixture: ComponentFixture<ShowItemPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(ShowItemPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
