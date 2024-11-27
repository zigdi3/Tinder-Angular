import { ActivatedRoute, Router } from '@angular/router';
import { UsersActions } from '../../../store/users/users.actions';
import { IAppState } from '../../../store';
import { UsersService } from '../../users.service';
import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.css'],
})
export class ListComponent implements OnInit {
  public users!: any[]; // TODO: User Model
  public page!: number;
  public searchQuery!: string;

  constructor(
    private usersActions: UsersActions,
    private ngRedux: Store<IAppState>,
    private usersService: UsersService,
    private activatedRoute: ActivatedRoute,
    private router: Router
  ) {}

  ngOnInit() {
    this.activatedRoute.queryParams.subscribe((params) => {
      this.page = params['page'] || 1;
      this.searchQuery = params['search'];

      this.fetchData();
    });
  }

  fetchData() {
    this.usersActions.getUsersList(this.generateQuery());
    this.ngRedux
      .select((state) => state.users)
      .subscribe((usersState: any) => {
        this.users = usersState.usersList;
      });
  }

  nextPage() {
    this.page++;
    this.router.navigate([`users/list`], {
      queryParams: this.generateQueryParams(),
    });
  }

  prevPage() {
    this.page--;
    this.router.navigate([`users/list`], {
      queryParams: this.generateQueryParams(),
    });
  }

  search() {
    this.page = 1;
    this.router.navigate([`users/list`], {
      queryParams: this.generateQueryParams(),
    });
  }

  private generateQueryParams() {
    const params: any = {};

    if (this.page !== 1) {
      params.page = this.page;
    }
    if (this.searchQuery) {
      params.search = this.searchQuery;
    }

    return params;
  }

  private generateQuery() {
    return `?page=${this.page || 1}${
      this.searchQuery ? '&search=' + this.searchQuery : ''
    }`;
  }

  like(id: any) {
    this.usersService.like(id).subscribe(console.log);
  }

  dislike(id: any) {
    this.usersService.dislike(id).subscribe(console.log);
  }
}
