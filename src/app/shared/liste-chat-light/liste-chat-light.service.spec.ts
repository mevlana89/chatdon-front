import { TestBed } from '@angular/core/testing';

import { ListeChatLightService } from './liste-chat-light.service';

describe('ListeChatLightService', () => {
  let service: ListeChatLightService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ListeChatLightService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
