import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ChatLightComponent } from './chat-light.component';

describe('ChatLightComponent', () => {
  let component: ChatLightComponent;
  let fixture: ComponentFixture<ChatLightComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ChatLightComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ChatLightComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
