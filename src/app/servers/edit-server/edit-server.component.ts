import { Component, OnInit } from '@angular/core';

import { ServersService } from '../servers.service';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { CanComponentDeactivate } from './can-deactivate-guard.service';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-edit-server',
  templateUrl: './edit-server.component.html',
  styleUrls: ['./edit-server.component.css']
})
export class EditServerComponent implements OnInit, CanComponentDeactivate {
  server: {id: number, name: string, status: string};
  serverName = '';
  serverStatus = '';
  isAllowEdit = false;
  changesSave = false;

  constructor(private serversService: ServersService, private route: ActivatedRoute, private router: Router) { }

  canDeactivate(): boolean | Promise<boolean> | Observable<boolean> {
    if (!this.isAllowEdit) return true;
    if ((this.serverName !== this.server.name || this.serverStatus !== this.server.status) && this.changesSave === false) {
      return confirm('Do you want to discard the changes?');
    } else {
      return true;
    }
  }

  ngOnInit() {
    console.log(this.route.snapshot.queryParams);
    console.log(this.route.snapshot.fragment);

    this.route.queryParams.subscribe((queryParams: Params) => {
      this.isAllowEdit = queryParams['allowEdit'] === '1' ? true : false;
    });
    this.route.fragment.subscribe();


    const id = +this.route.snapshot.params['id'];
    this.server = this.serversService.getServer(id);
    this.serverName = this.server.name;
    this.serverStatus = this.server.status;
  }

  onUpdateServer() {
    this.serversService.updateServer(this.server.id, {name: this.serverName, status: this.serverStatus});
    this.changesSave =true;
    this.router.navigate(['../'], { relativeTo: this.route });
  }

}
