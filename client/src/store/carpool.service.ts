import { inject, Injectable } from "@angular/core";
import axios, { AxiosError, AxiosResponse } from "axios";
import { Observable, Subscriber } from "rxjs";
import { ApiException, CarpoolResponse } from "../model";
import { Store } from "@ngrx/store";

@Injectable({ providedIn: 'root' })
export class CarpoolService {
    private readonly apiUrl = this.getAPIurl()
    private readonly audioHorn = new Audio('horn.mp3')
    private readonly store = inject(Store)

    getAPIurl() {
        switch(window.location.hostname) {
            case 'localhost':
            case '127.0.0.1':
            case '0.0.0.0':
                return `${window.location.protocol}//${window.location.hostname}:8081/rest/carpool`
            default:
                return `${window.location.protocol}//${window.location.host}/api`
        }
    }

    handleResponse(o: Subscriber<CarpoolResponse>, response: AxiosResponse<CarpoolResponse, any>) {
        o.next(response.data)
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


    dispatch = (method: 'GET' | 'PUT' | 'PATCH' | 'DELETE', uri: string) => new Observable<CarpoolResponse>(o => {
        const APIurl = this.getAPIurl()
        const url = `${APIurl}${uri}`
        console.dir([method, url])
        axios
            .request<CarpoolResponse>({
                method,
                url
            })
            .then(response => this.handleResponse(o, response))
            .catch(reason => this.handleCatch(o, reason))
    })

    get = () => this.dispatch('GET', '/')
    reset = () => this.dispatch('DELETE', '/reset')
    resetLane = () => this.dispatch('DELETE', '/')
    laneAdd = (poolNumber: number) => this.dispatch('PUT', `/${poolNumber}`)
    laneDel = (poolNumber: number) => this.dispatch('DELETE', `/${poolNumber}`)
    doorCallOne = (poolNumber: number) => this.dispatch('PATCH', `/${poolNumber}`)
    doorCallMany = (num: number) => this.dispatch('PATCH', `/call?n=${num}`)
    doorCallAll = () => this.dispatch('PATCH', `/call/all`)
    setOptionCallImmediate = (option: boolean) => this.dispatch('PUT', `/option/callImmediate?option=${option}`)
    roomSend = (poolNumber: number) => this.dispatch('PATCH', `/${poolNumber}`)
    doorExit = (poolNumber: number) => this.dispatch('PATCH', `/${poolNumber}`)
}