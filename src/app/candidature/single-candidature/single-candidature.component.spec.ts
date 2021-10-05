import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SingleCandidatureComponent } from './single-candidature.component';

describe('SingleCandidatureComponent', () => {
  let component: SingleCandidatureComponent;
  let fixture: ComponentFixture<SingleCandidatureComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SingleCandidatureComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SingleCandidatureComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
