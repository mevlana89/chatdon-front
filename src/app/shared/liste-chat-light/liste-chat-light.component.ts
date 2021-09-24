import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, ParamMap } from '@angular/router';
import { ChatLight } from './chat-light/chat-light';
import { ChatLightComponent } from './chat-light/chat-light.component';
import { FilterDto } from './FilterDto';
import { ListeChatLightService } from './liste-chat-light.service';

@Component({
  selector: 'app-liste-chat-light',
  templateUrl: './liste-chat-light.component.html',
  styleUrls: ['./liste-chat-light.component.css']
})
export class ListeChatLightComponent implements OnInit {

  filterDto: FilterDto = new FilterDto;
  listeChatLight: ChatLight[] = [];

  constructor(private servicelisteChat : ListeChatLightService, private route: ActivatedRoute) { }

  ngOnInit(): void {
        // USE THIS
        this.route.paramMap.subscribe((params: ParamMap) => {
          this.servicelisteChat.getAllUnreservedCats(this.filterDto).subscribe( data => { console.log (this.listeChatLight = data) })
      });
    }
}
