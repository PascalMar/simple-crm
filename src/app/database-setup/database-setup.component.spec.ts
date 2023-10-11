import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DatabaseSetupComponent } from './database-setup.component';

describe('DatabaseSetupComponent', () => {
  let component: DatabaseSetupComponent;
  let fixture: ComponentFixture<DatabaseSetupComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [DatabaseSetupComponent]
    });
    fixture = TestBed.createComponent(DatabaseSetupComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
