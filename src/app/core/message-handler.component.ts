import { Component, OnInit } from '@angular/core';

import { IAppState } from '../store';
import { Store } from '@ngrx/store';

@Component({
  selector: 'message-handler',
  template: `
    <div>
      {{ message }}
    </div>
  `,
})
export class MessageHandlerComponent implements OnInit {
  message: string = '';

  constructor(private ngRedux: Store<IAppState>) {}

  ngOnInit() {
    this.ngRedux
      .select((state) => state.core.message)
      .subscribe((message: string) => (this.message = message));
  }
}
