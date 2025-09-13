import { inject, Injectable } from "@angular/core";
import { Actions, createEffect, ofType } from "@ngrx/effects";
import { carpoolAction } from "./carpool.action";
import { CarpoolService } from "./carpool.service";
import { catchError, exhaustMap, map, of, tap } from "rxjs";
import { ApiException } from "../model/api.exception";

@Injectable({ providedIn: 'root' })
export class CarpoolEffect {
    private actions$ = inject(Actions)
    private carpoolService = inject(CarpoolService)

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
        ofType(carpoolAction.laneAdd),
        exhaustMap(action => this.carpoolService.laneAdd(action.poolNumber).pipe(
            map(response => carpoolAction.laneAdd_success(response)),
            catchError((apiException: ApiException) => of(carpoolAction.laneAdd_failure(apiException)))
        )))
    )

    public laneDel$ = createEffect(() => this.actions$.pipe(
        ofType(carpoolAction.laneDel),
        exhaustMap(action => this.carpoolService.laneDel(action.poolNumber).pipe(
            map(response => carpoolAction.laneDel_success(response)),
            catchError((apiException: ApiException) => of(carpoolAction.laneDel_failure(apiException)))
        )))
    )

    public doorCallOne$ = createEffect(() => this.actions$.pipe(
        ofType(carpoolAction.doorCallOne),
        exhaustMap(action => this.carpoolService.doorCallOne(action.poolNumber).pipe(
            map(response => carpoolAction.doorCallOne_success(response)),
            catchError((apiException: ApiException) => of(carpoolAction.doorCallOne_failure(apiException)))
        )))
    )

    public doorCallMany$ = createEffect(() => this.actions$.pipe(
        ofType(carpoolAction.doorCallMany),
        exhaustMap(action => this.carpoolService.doorCallMany(action.num).pipe(
            map(response => carpoolAction.doorCallMany_success(response)),
            catchError((apiException: ApiException) => of(carpoolAction.doorCallMany_failure(apiException)))
        )))
    )

    public doorCallAll$ = createEffect(() => this.actions$.pipe(
        ofType(carpoolAction.doorCallAll),
        exhaustMap(action => this.carpoolService.doorCallAll().pipe(
            map(response => carpoolAction.doorCallAll_success(response)),
            catchError((apiException: ApiException) => of(carpoolAction.doorCallAll_failure(apiException)))
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
        ofType(carpoolAction.roomSend),
        exhaustMap(action => this.carpoolService.roomSend(action.poolNumber).pipe(
            map(response => carpoolAction.roomSend_success(response)),
            catchError((apiException: ApiException) => of(carpoolAction.roomSend_failure(apiException)))
        )))
    )

    public doorExit$ = createEffect(() => this.actions$.pipe(
        ofType(carpoolAction.doorExit),
        exhaustMap(action => this.carpoolService.doorExit(action.poolNumber).pipe(
            map(response => carpoolAction.doorExit_success(response)),
            catchError((apiException: ApiException) => of(carpoolAction.doorExit_failure(apiException)))
        )))
    )

    public escortGone$ = createEffect(() => this.actions$.pipe(
        ofType(carpoolAction.escortGone),
        exhaustMap(action => this.carpoolService.escortGone(action.poolNumber).pipe(
            map(response => carpoolAction.escortGone_success(response)),
            catchError((apiException: ApiException) => of(carpoolAction.escortGone_failure(apiException)))
        )))
    )

}