import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ShowplaylistPage } from './showplaylist.page';

describe('ShowplaylistPage', () => {
  let component: ShowplaylistPage;
  let fixture: ComponentFixture<ShowplaylistPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(ShowplaylistPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
