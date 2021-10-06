import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditFicheChatComponent } from './edit-fiche-chat.component';

describe('EditFicheChatComponent', () => {
  let component: EditFicheChatComponent;
  let fixture: ComponentFixture<EditFicheChatComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EditFicheChatComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(EditFicheChatComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
