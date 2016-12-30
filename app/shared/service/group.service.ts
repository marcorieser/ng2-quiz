import {Injectable} from '@angular/core';
import {Response} from "@angular/http";
import {Observable} from "rxjs/Observable";
import {Group} from "../models/models";
import {AbstractService} from "./abstract.service";

@Injectable()
export class GroupService extends AbstractService {

    getGroups(): Observable<Group[]> {
        return this.http.get('/groups.json')
            .map((response: Response) => response.json())
            .catch(this.handleError);
    }
}
