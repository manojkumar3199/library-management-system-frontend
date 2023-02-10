import { ComponentFixture, TestBed } from '@angular/core/testing';

import { IssuebookDetailComponent } from './issuebook-detail.component';

describe('IssuebookDetailComponent', () => {
  let component: IssuebookDetailComponent;
  let fixture: ComponentFixture<IssuebookDetailComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ IssuebookDetailComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(IssuebookDetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
