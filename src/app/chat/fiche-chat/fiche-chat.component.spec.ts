import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FicheChatComponent } from './fiche-chat.component';

describe('FicheChatComponent', () => {
  let component: FicheChatComponent;
  let fixture: ComponentFixture<FicheChatComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FicheChatComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(FicheChatComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
