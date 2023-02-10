import { ComponentFixture, TestBed } from '@angular/core/testing';

import { IssuebookAddComponent } from './issuebook-add.component';

describe('IssuebookAddComponent', () => {
  let component: IssuebookAddComponent;
  let fixture: ComponentFixture<IssuebookAddComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ IssuebookAddComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(IssuebookAddComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
