import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DialogAddEmployeesComponent } from './dialog-add-employees.component';

describe('DialogAddEmployeesComponent', () => {
  let component: DialogAddEmployeesComponent;
  let fixture: ComponentFixture<DialogAddEmployeesComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [DialogAddEmployeesComponent]
    });
    fixture = TestBed.createComponent(DialogAddEmployeesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
