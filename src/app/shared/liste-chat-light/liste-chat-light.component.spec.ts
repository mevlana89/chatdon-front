import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListeChatLightComponent } from './liste-chat-light.component';

describe('ListeChatLightComponent', () => {
  let component: ListeChatLightComponent;
  let fixture: ComponentFixture<ListeChatLightComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ListeChatLightComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ListeChatLightComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
