import { inject, Injectable } from "@angular/core";
import { Actions, createEffect, ofType } from "@ngrx/effects";
import { carpoolAction } from "./carpool.action";
import { CarpoolService } from "./carpool.service";
import { catchError, exhaustMap, map, of, startWith, tap } from "rxjs";
import { ApiException } from "../model/api.exception";

@Injectable({ providedIn: 'root' })
export class CarpoolEffect {
    private actions$ = inject(Actions)
    private carpoolService = inject(CarpoolService)

    public test$ = createEffect(() => this.actions$.pipe(
        startWith(carpoolAction.test()),
        ofType(carpoolAction.test),
        tap(_action => this.carpoolService.getTestData())
    ), { dispatch: false })

    public poll$ = createEffect(() => this.actions$.pipe(
        startWith(carpoolAction.poll()),
        ofType(carpoolAction.poll),
        tap(_action => this.carpoolService.startPolling())
    ), { dispatch: false})
    
    public get$ = createEffect(() => this.actions$.pipe(
        ofType(carpoolAction.get),
        exhaustMap(_action => this.carpoolService.get().pipe(
            map(response => carpoolAction.get_success(response)),
            catchError((apiException: ApiException) => of(carpoolAction.get_failure(apiException)))
        )))
    )

    public reset$ = createEffect(() => this.actions$.pipe(
        ofType(carpoolAction.reset),
        exhaustMap(_action => this.carpoolService.reset().pipe(
            map(response => carpoolAction.reset_success(response)),
            catchError((apiException: ApiException) => of(carpoolAction.reset_failure(apiException)))
        )))
    )

    public resetLane$ = createEffect(() => this.actions$.pipe(
        ofType(carpoolAction.resetLane),
        exhaustMap(action => this.carpoolService.resetLane().pipe(
            map(response => carpoolAction.resetLane_success(response)),
            catchError((apiException: ApiException) => of(carpoolAction.resetLane_failure(apiException)))
        )))
    )

    public laneAdd$ = createEffect(() => this.actions$.pipe(
        ofType(carpoolAction.add),
        exhaustMap(action => this.carpoolService.laneAdd(action.poolNumber).pipe(
            map(response => carpoolAction.add_success(response)),
            catchError((apiException: ApiException) => of(carpoolAction.add_failure(apiException)))
        )))
    )

    public laneDel$ = createEffect(() => this.actions$.pipe(
        ofType(carpoolAction.del),
        exhaustMap(action => this.carpoolService.laneDel(action.poolNumber).pipe(
            map(response => carpoolAction.del_success(response)),
            catchError((apiException: ApiException) => of(carpoolAction.del_failure(apiException)))
        )))
    )

    public doorCallOne$ = createEffect(() => this.actions$.pipe(
        ofType(carpoolAction.callOne),
        exhaustMap(action => this.carpoolService.doorCallOne(action.poolNumber).pipe(
            map(response => carpoolAction.callOne_success(response)),
            catchError((apiException: ApiException) => of(carpoolAction.callOne_failure(apiException)))
        )))
    )

    public doorCallMany$ = createEffect(() => this.actions$.pipe(
        ofType(carpoolAction.callMany),
        exhaustMap(action => this.carpoolService.doorCallMany(action.num).pipe(
            map(response => carpoolAction.callMany_success(response)),
            catchError((apiException: ApiException) => of(carpoolAction.callMany_failure(apiException)))
        )))
    )

    public doorCallAll$ = createEffect(() => this.actions$.pipe(
        ofType(carpoolAction.callAll),
        exhaustMap(action => this.carpoolService.doorCallAll().pipe(
            map(response => carpoolAction.callAll_success(response)),
            catchError((apiException: ApiException) => of(carpoolAction.callAll_failure(apiException)))
        )))
    )

    public setOptionCallImmediate$ = createEffect(() => this.actions$.pipe(
        ofType(carpoolAction.setOptionCallImmediate),
        exhaustMap(action => this.carpoolService.setOptionCallImmediate(action.option).pipe(
            map(response => carpoolAction.setOptionCallImmediate_success(response)),
            catchError((apiException: ApiException) => of(carpoolAction.setOptionCallImmediate_failure(apiException)))
        )))
    )

    public roomSend$ = createEffect(() => this.actions$.pipe(
        ofType(carpoolAction.send),
        exhaustMap(action => this.carpoolService.roomSend(action.poolNumber).pipe(
            map(response => carpoolAction.send_success(response)),
            catchError((apiException: ApiException) => of(carpoolAction.send_failure(apiException)))
        )))
    )

    public doorExit$ = createEffect(() => this.actions$.pipe(
        ofType(carpoolAction.escort),
        exhaustMap(action => this.carpoolService.doorExit(action.poolNumber).pipe(
            map(response => carpoolAction.escort_success(response)),
            catchError((apiException: ApiException) => of(carpoolAction.escort_failure(apiException)))
        )))
    )

    public escortGone$ = createEffect(() => this.actions$.pipe(
        ofType(carpoolAction.dispatch),
        exhaustMap(action => this.carpoolService.escortGone(action.poolNumber).pipe(
            map(response => carpoolAction.dispatch_success(response)),
            catchError((apiException: ApiException) => of(carpoolAction.dispatch_failure(apiException)))
        )))
    )
}