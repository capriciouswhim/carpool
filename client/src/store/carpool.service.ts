import { inject, Injectable } from "@angular/core";
import axios, { AxiosError, AxiosResponse } from "axios";
import { Observable, Subscriber } from "rxjs";
import { ApiException, CarpoolResponse } from "../model";
import { Store } from "@ngrx/store";
import { carpoolAction } from "./carpool.action";

@Injectable({ providedIn: 'root' })
export class CarpoolService {
    private readonly store = inject(Store)
    private intervalHandle: number | null = null

    startPolling() {
        if(!this.intervalHandle) {
            this.intervalHandle = setInterval(() => this.store.dispatch(carpoolAction.get()), 2000)
        }
    }

    getAPIurl() {
        switch(window.location.hostname) {
            case 'localhost':
            case '127.0.0.1':
            case '0.0.0.0':
                switch(window.location.port) {
                    case '8080':
                        // Local Docker
                        return `${window.location.protocol}//${window.location.hostname}:8081/rest/carpool`
                    case '4200':
                    default:
                        // Local Development
                        return `${window.location.protocol}//${window.location.hostname}:8083/rest/carpool`
                }
            default:
                // Internet Production
                return `${window.location.protocol}//${window.location.host}/api`
        }
    }

    handleResponse(o: Subscriber<CarpoolResponse>, response: AxiosResponse<CarpoolResponse, any>) {
        if(response.status >= 200 && response.status < 300) {
            o.next(response.data)
            o.complete()
        } else {
            const err: ApiException = { reason: `${response.status} ${response.statusText}` }
            o.error(err)
        }
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

    dispatch = (method: 'GET' | 'PUT' | 'PATCH' | 'DELETE', uri: string) => new Observable<CarpoolResponse>(o => {
        const APIurl = this.getAPIurl()
        const url = `${APIurl}${uri}`
        // console.dir([method, url]);

        axios
            .request<CarpoolResponse>({
                method,
                url,
                validateStatus: () => true // all statuses are good
            })
            .then(response => this.handleResponse(o, response))
            .catch(reason => this.handleCatch(o, reason))
    })

    get = () => this.dispatch('GET', '/')
    reset = () => this.dispatch('DELETE', '/reset')
    resetLane = () => this.dispatch('DELETE', '/')
    laneAdd = (poolNumber: number) => this.dispatch('PUT', `/${poolNumber}`)
    laneDel = (poolNumber: number) => this.dispatch('DELETE', `/${poolNumber}`)
    doorCallOne = (poolNumber: number) => this.dispatch('PATCH', `/${poolNumber}/call`)
    doorCallMany = (num: number) => this.dispatch('PATCH', `/call?n=${num}`)
    doorCallAll = () => this.dispatch('PATCH', `/call/all`)
    setOptionCallImmediate = (option: boolean) => this.dispatch('PUT', `/option/callImmediate?option=${option}`)
    roomSend = (poolNumber: number) => this.dispatch('PATCH', `/${poolNumber}/send`)
    doorExit = (poolNumber: number) => this.dispatch('PATCH', `/${poolNumber}/exit`)
    escortGone = (poolNumber: number) => this.dispatch('PATCH', `/${poolNumber}/gone`)
}