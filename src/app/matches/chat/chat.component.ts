import { Message } from '../message';
import { MatchesService } from '../matches.service';
import { ActivatedRoute } from '@angular/router';
import { IAppState } from '../../store/app.state';
import { MatchesActions } from '../../store/matches/matches.actions';
import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { Store } from '@ngrx/store';

@Component({
  selector: 'app-chat',
  templateUrl: './chat.component.html',
  styleUrls: ['./chat.component.css'],
})
export class ChatComponent implements OnInit {
  private id!: number;
  private messages!: Message[];
  @ViewChild('input') input!: ElementRef;

  constructor(
    private matchesActions: MatchesActions,
    private ngRedux: Store<IAppState>,
    private activatedRoute: ActivatedRoute,
    private matchesService: MatchesService
  ) {}

  ngOnInit() {
    this.activatedRoute.params.subscribe((params: any) => {
      this.id = params.id;

      this.fetchMessages();
    });
    this.ngRedux
      .select((state) => state.matches)
      .subscribe((matchesState) => {
        this.messages = matchesState.messages.map((x) =>
          this.matchesService.convertDbMessageToModel(x)
        );
        // console.log(this.messages);
      });
  }

  fetchMessages() {
    this.matchesActions.fetchMessages(this.id);
  }

  send(message: any) {
    this.matchesActions.sendMessage(this.id, message);
    this.input.nativeElement.value = '';
  }
}
