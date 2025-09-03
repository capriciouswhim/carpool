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

    public add$ = createEffect(() => this.actions$.pipe(
        ofType(carpoolAction.add),
        exhaustMap(action => this.carpoolService.add(action.poolNumber).pipe(
            map(response => carpoolAction.add_success(response)),
            catchError((apiException: ApiException) => of(carpoolAction.add_failure(apiException)))
        )))
    );

    public cls$ = createEffect(() => this.actions$.pipe(
        ofType(carpoolAction.cls),
        exhaustMap(() => this.carpoolService.cls().pipe(
            map(response => carpoolAction.cls_success(response)),
            catchError((apiException: ApiException) => of(carpoolAction.cls_failure(apiException)))
        )))
    );

    public fetch$ = createEffect(() => this.actions$.pipe(
        ofType(carpoolAction.fetch),
        exhaustMap(() => this.carpoolService.fetch().pipe(
            map(response => carpoolAction.fetch_success(response)),
            catchError((apiException: ApiException) => of(carpoolAction.fetch_failure(apiException)))
        )))
    );

    public pause$ = createEffect(() => this.actions$.pipe(
        ofType(carpoolAction.pause),
        exhaustMap(() => this.carpoolService.pause().pipe(
            map(response => carpoolAction.pause_success(response)),
            catchError((apiException: ApiException) => of(carpoolAction.pause_failure(apiException)))
        )))
    );

    public horn$ = createEffect(() => this.actions$.pipe(
        ofType(carpoolAction.horn),
        tap(a => this.carpoolService.horn())
    ), { dispatch:false })


    public resume$ = createEffect(() => this.actions$.pipe(
        ofType(carpoolAction.resume),
        exhaustMap(() => this.carpoolService.resume().pipe(
            map(response => carpoolAction.resume_success(response)),
            catchError((apiException: ApiException) => of(carpoolAction.resume_failure(apiException)))
        )))
    );

    public rel$ = createEffect(() => this.actions$.pipe(
        ofType(carpoolAction.rel),
        exhaustMap(action => this.carpoolService.rel(action.poolNumber).pipe(
            map(response => carpoolAction.rel_success(response)),
            catchError((apiException: ApiException) => of(carpoolAction.rel_failure(apiException)))
        )))
    );

    public rem$ = createEffect(() => this.actions$.pipe(
        ofType(carpoolAction.rem),
        exhaustMap(action => this.carpoolService.rem(action.poolNumber).pipe(
            map(response => carpoolAction.rem_success(response)),
            catchError((apiException: ApiException) => of(carpoolAction.rem_failure(apiException)))
        )))
    );

    public togglePause$ = createEffect(() => this.actions$.pipe(
        ofType(carpoolAction.togglePause),
        exhaustMap(() => this.carpoolService.togglePause().pipe(
            map(response => carpoolAction.togglePause_success(response)),
            catchError((apiException: ApiException) => of(carpoolAction.togglePause_failure(apiException)))
        )))
    );
}