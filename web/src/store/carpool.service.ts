import { inject, Injectable } from "@angular/core";
import axios, { AxiosError, AxiosResponse } from "axios";
import { Observable, Subscriber } from "rxjs";
import { ApiException, CarpoolResponse } from "../model";
import { APICarpoolResponse, fixAxiosResponse } from "../model/carpool-response.model";
import { Util } from "../util";
import { carpoolAction } from "./carpool.action";
import { Store } from "@ngrx/store";

@Injectable({ providedIn: 'root' })
export class CarpoolService {
    private readonly apiUrl = this.getAppUrl()
    private readonly audioHorn = new Audio('horn.mp3')
    private readonly store = inject(Store)

    getAppUrl() {
        switch(window.location.hostname) {
            case 'localhost':
            case '127.0.0.1':
            case '0.0.0.0':
                return `${window.location.protocol}//${window.location.hostname}:8083/rest/carpool`
            default:
                return `${window.location.protocol}//${window.location.host}/api`
        }
    }

    handleResponse(o: Subscriber<CarpoolResponse>, response: AxiosResponse<APICarpoolResponse, any>) {
        o.next({ ...fixAxiosResponse(response.data) })
        o.complete()
    }

    handleCatch(o: Subscriber<CarpoolResponse>, reason: any) {
        if(reason instanceof AxiosError) {
            const err: ApiException = { axiosError: reason }
            o.error(err);
        } else {
            const err: ApiException = { reason: reason }
            o.error(err)
        }
    }
    private timeoutId: number = 0;
    private readonly hornDebounce = 6 * 1000; // 6 seconds in ms

    add = (poolNumber: number) => new Observable<CarpoolResponse>(o => {
        axios
            .post<APICarpoolResponse>(`${this.apiUrl}/${poolNumber}`)
            .then(response => this.handleResponse(o, response))
            .catch(reason => this.handleCatch(o, reason))
    })

    cls = () => new Observable<CarpoolResponse>(o => {
        axios
            .delete<APICarpoolResponse>(`${this.apiUrl}/`)
            .then(response => this.handleResponse(o, response))
            .catch(reason => this.handleCatch(o, reason))
    })

    resume = () => new Observable<CarpoolResponse>(o => {
        axios
            .post<APICarpoolResponse>(`${this.apiUrl}/resume`)
            .then(response => this.handleResponse(o, response))
            .catch(reason => this.handleCatch(o, reason))
    })    

    interval = 1000 + Math.random() + Util.randBetween(-250,+250)
    intervalHandle: number = 0

    fetch = () => new Observable<CarpoolResponse>(o => {
        if(!this.intervalHandle) {
            this.intervalHandle = setInterval(() => {
                this.store.dispatch(carpoolAction.fetch())
            }, 1000)
        }

        axios
            .get<APICarpoolResponse>(`${this.apiUrl}/`)
            .then(response => this.handleResponse(o, response))
            .catch(reason => this.handleCatch(o, reason))
    })

    pause = () => new Observable<CarpoolResponse>(o => {
        axios
            .post<APICarpoolResponse>(`${this.apiUrl}/pause`)
            .then(response => this.handleResponse(o, response))
            .catch(reason => this.handleCatch(o, reason))
    })

    horn = () => {
        const self = this;
        if(self.timeoutId) {
            clearTimeout(self.timeoutId);
        }

        this.timeoutId = setTimeout(() => {
            self.timeoutId = 0;
            self.audioHorn.play()
        }, self.hornDebounce);
    }

    rel = (poolNumber: number) => new Observable<CarpoolResponse>(o => {
        axios
            .post<APICarpoolResponse>(`${this.apiUrl}/release/${poolNumber}`)
            .then(response => this.handleResponse(o, response))
            .catch(reason => this.handleCatch(o, reason))
    })

    rem = (poolNumber: number) => new Observable<CarpoolResponse>(o => {
        axios
            .delete<APICarpoolResponse>(`${this.apiUrl}/${poolNumber}`)
            .then(response => this.handleResponse(o, response))
            .catch(reason => this.handleCatch(o, reason))
    })

    togglePause = () => new Observable<CarpoolResponse>(o => {

        axios
            .post<APICarpoolResponse>(`${this.apiUrl}/togglePause`)
            .then(response => this.handleResponse(o, response))
            .catch(reason => this.handleCatch(o, reason))

    })
}