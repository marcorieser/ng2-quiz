import {Injectable} from "@angular/core";
import {Response, Http} from "@angular/http";
import {Observable} from "rxjs/Observable";

@Injectable()
export abstract class AbstractService {
    constructor(protected http: Http) {
    }

    /**
     * Handle any errors from the API
     */
    protected handleError(err) {
        let errorMessage: string;

        if (err instanceof Response) {
            let body = err.json() || '';
            let error = body.error || JSON.stringify(body);
            errorMessage = `${err.status} - ${err.statusText || ''} ${error}`;
        } else {
            errorMessage = err.message ? err.message : err.toString();
        }

        return Observable.throw(errorMessage);
    }
}
