// import {
//   ActivatedRouteSnapshot,
//   Resolve,
//   RouterStateSnapshot,
// } from '@angular/router';
// import { Observable } from 'rxjs';
// import { ServersService } from '../servers.service';
// import { Injectable } from '@angular/core';

// interface Server {
//   id: number;
//   name: string;
//   status: string;
// }

// @Injectable()
// export class ServerResolver implements Resolve<Server> {
//   constructor(private _serverService: ServersService) {}

//   /** Resolving Dynamic Data with the resolve Guard
//    * this would also work if this were to return an observable or a promise, so with asynchronous code, for example an HTTP request.
//    */
//   resolve(
//     route: ActivatedRouteSnapshot,
//     state: RouterStateSnapshot
//   ): Server | Observable<Server> | Promise<Server> {
//     /** this code below will run on each time we re-render the route. */
//     return this._serverService.getServer(+route.params['id']);
//   }
// }

import {
  ActivatedRouteSnapshot,
  RouterStateSnapshot,
  ResolveFn,
} from '@angular/router';
import { Observable } from 'rxjs';
import { inject } from '@angular/core';

import { ServersService } from '../servers.service';

interface Server {
  id: number;
  name: string;
  status: string;
}

export const serverResolver: ResolveFn<Server> = (
  route: ActivatedRouteSnapshot,
  state: RouterStateSnapshot
): Observable<Server> | Promise<Server> | Server => {
  return inject(ServersService).getServer(+route.params['id']);
};
