import { ComponentFixture, TestBed } from '@angular/core/testing';

import { IssuebookEditComponent } from './issuebook-edit.component';

describe('IssuebookEditComponent', () => {
  let component: IssuebookEditComponent;
  let fixture: ComponentFixture<IssuebookEditComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ IssuebookEditComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(IssuebookEditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
