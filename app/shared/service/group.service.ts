import {Injectable} from '@angular/core';
import {Http, Response} from "@angular/http";
import {Observable} from "rxjs/Observable";
import {Group} from "../models/models";
import {AbstractService} from "./abstract.service";

@Injectable()
export class GroupService extends AbstractService {

    constructor(http: Http) {
        super(http);
    }

    getGroups(): Observable<Group[]> {
        return this.http.get('/groups.json')
            .map((response: Response) => response.json())
            .catch(this.handleError);
    }
}
