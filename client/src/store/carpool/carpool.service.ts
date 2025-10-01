import { inject, Injectable } from "@angular/core";
import axios, { AxiosError, AxiosResponse } from "axios";
import { Observable, Subscriber } from "rxjs";
import { ApiException, CarpoolResponse } from "../../model";
import { Store } from "@ngrx/store";
import { carpoolAction } from "./carpool.action";
import { Util } from "../../util";

@Injectable({ providedIn: 'root' })
export class CarpoolService {
    private readonly store = inject(Store)
    private intervalHandle: number | null = null

    delay = () => new Promise<void>((resolve, reject) => {
        setTimeout(() => { resolve() }, 1000)
    })

    startPolling() {
        if(!this.intervalHandle) {
            this.intervalHandle = setInterval(() => this.store.dispatch(carpoolAction.get()), 2000)
        }
    }

    getTestData = () => {
        setTimeout(async () => {
            const nums = new Array<number>(15);

            // reset the day
            this.store.dispatch(carpoolAction.reset())
            await this.delay()
            
            // queue 15 numbers
            for(let i=0; i<15; i++) {
                nums[i] = Util.randBetween(1,299)
                this.store.dispatch(carpoolAction.add({ poolNumber: nums[i] }))
                await this.delay()
            }

            // Call numbers
            for(let i=0; i<8; i++) {
                this.store.dispatch(carpoolAction.callOne({ poolNumber: nums[i] }))
                await this.delay()
            }

            // Send the first 3 numbers
            for(let i=0; i<3; i++) {
                this.store.dispatch(carpoolAction.send({ poolNumber: nums[i] }))
                await this.delay()
            }

            // Recall the fourth number
            this.store.dispatch(carpoolAction.callOne({ poolNumber: nums[3] }))
            await this.delay()

            // Exit two numbers
            for(let i=0; i<2; i++) {
                this.store.dispatch(carpoolAction.escort({ poolNumber: nums[i] }))
                await this.delay()
            }

            // Gone one number
            this.store.dispatch(carpoolAction.dispatch({ poolNumber: nums[0] }))
        }, 1000)
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

    handleResponse<T>(o: Subscriber<T>, response: AxiosResponse<T, any>) {
        if(response.status >= 200 && response.status < 300) {
            o.next(response.data)
            o.complete()
        } else {
            const err: ApiException = { reason: `${response.status} ${response.statusText}` }
            o.error(err)
        }
    }

    handleCatch<T>(o: Subscriber<T>, reason: any) {
        if(reason instanceof AxiosError) {
            const err: ApiException = { axiosError: reason }
            o.error(err);
        } else {
            const err: ApiException = { reason: reason }
            o.error(err)
        }
    }

    dispatch = <T>(method: 'GET' | 'POST' | 'PUT' | 'PATCH' | 'DELETE', uri: string, data?: any) => new Observable<T>(o => {
        const APIurl = this.getAPIurl()
        const url = `${APIurl}${uri}`

        axios
            .request<T>({
                method,
                url,
                data,
                validateStatus: () => true // all statuses are good
            })
            .then(response => this.handleResponse(o, response))
            .catch(reason => this.handleCatch(o, reason))
    })

    get = () => this.dispatch<CarpoolResponse>('GET', '/')
    reset = () => this.dispatch<CarpoolResponse>('DELETE', '/reset')
    resetLane = () => this.dispatch<CarpoolResponse>('DELETE', '/')
    laneAdd = (poolNumber: number) => this.dispatch<CarpoolResponse>('PUT', `/${poolNumber}`)
    laneDel = (poolNumber: number) => this.dispatch<CarpoolResponse>('DELETE', `/${poolNumber}`)
    doorCallOne = (poolNumber: number) => this.dispatch<CarpoolResponse>('PATCH', `/${poolNumber}/call`)
    doorCallMany = (num: number) => this.dispatch<CarpoolResponse>('PATCH', `/call?n=${num}`)
    doorCallAll = () => this.dispatch<CarpoolResponse>('PATCH', `/call/all`)
    setOptionCallImmediate = (option: boolean) => this.dispatch<CarpoolResponse>('PUT', `/option/callImmediate?option=${option}`)
    roomSend = (poolNumber: number) => this.dispatch<CarpoolResponse>('PATCH', `/${poolNumber}/send`)
    doorExit = (poolNumber: number) => this.dispatch<CarpoolResponse>('PATCH', `/${poolNumber}/exit`)
    escortGone = (poolNumber: number) => this.dispatch<CarpoolResponse>('PATCH', `/${poolNumber}/gone`)
}