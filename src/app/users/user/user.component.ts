import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.css']
})
export class UserComponent implements OnInit {
  user: {id: number, name: string};

  constructor(private route: ActivatedRoute) { }

  ngOnInit() {
    /** the component that you on may never be reloaded from within that component. */
    this.user = {
      id: this.route.snapshot.params['id'],
      name: this.route.snapshot.params['name']
    }

    /** use this method when you know this component may be changes in your route parameters.  */
    this.route.params.subscribe((params: Params) => {
      this.user.id = params['id'];
      this.user.name = params['name'];
    });
  }

}
