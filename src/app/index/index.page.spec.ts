import { ComponentFixture, TestBed } from '@angular/core/testing';

import { IndexPage } from './index.page';

describe('IndexPage', () => {
  let component: IndexPage;
  let fixture: ComponentFixture<IndexPage>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [IndexPage],
    });
    fixture = TestBed.createComponent(IndexPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
