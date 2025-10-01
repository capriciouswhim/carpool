import { inject, Injectable } from "@angular/core";
import { Actions, createEffect, ofType } from "@ngrx/effects";
import { actions } from "./actions";
import { ApiService } from "./api.service";
import { catchError, exhaustMap, map, of, startWith, tap } from "rxjs";
import { ApiException } from '../model';

@Injectable({ providedIn: 'root' })
export class Effects {
    private actions$ = inject(Actions)
    private apiService = inject(ApiService)

    public test$ = createEffect(() => this.actions$.pipe(
        startWith(actions.test()),
        ofType(actions.test),
        tap(_action => this.apiService.getTestData())
    ), { dispatch: false })

    public poll$ = createEffect(() => this.actions$.pipe(
        startWith(actions.poll()),
        ofType(actions.poll),
        tap(_action => this.apiService.startPolling())
    ), { dispatch: false})
    
    public get$ = createEffect(() => this.actions$.pipe(
        ofType(actions.get),
        exhaustMap(_action => this.apiService.get().pipe(
            map(response => actions.get_success(response)),
            catchError((apiException: ApiException) => of(actions.get_failure(apiException)))
        )))
    )

    public reset$ = createEffect(() => this.actions$.pipe(
        ofType(actions.reset),
        exhaustMap(_action => this.apiService.reset().pipe(
            map(response => actions.reset_success(response)),
            catchError((apiException: ApiException) => of(actions.reset_failure(apiException)))
        )))
    )

    public resetLane$ = createEffect(() => this.actions$.pipe(
        ofType(actions.resetLane),
        exhaustMap(action => this.apiService.resetLane().pipe(
            map(response => actions.resetLane_success(response)),
            catchError((apiException: ApiException) => of(actions.resetLane_failure(apiException)))
        )))
    )

    public add$ = createEffect(() => this.actions$.pipe(
        ofType(actions.add),
        exhaustMap(action => this.apiService.add(action.poolNumber).pipe(
            map(response => actions.add_success(response)),
            catchError((apiException: ApiException) => of(actions.add_failure(apiException)))
        )))
    )

    public del$ = createEffect(() => this.actions$.pipe(
        ofType(actions.del),
        exhaustMap(action => this.apiService.del(action.poolNumber).pipe(
            map(response => actions.del_success(response)),
            catchError((apiException: ApiException) => of(actions.del_failure(apiException)))
        )))
    )

    public callOne$ = createEffect(() => this.actions$.pipe(
        ofType(actions.callOne),
        exhaustMap(action => this.apiService.callOne(action.poolNumber).pipe(
            map(response => actions.callOne_success(response)),
            catchError((apiException: ApiException) => of(actions.callOne_failure(apiException)))
        )))
    )

    public callMany$ = createEffect(() => this.actions$.pipe(
        ofType(actions.callMany),
        exhaustMap(action => this.apiService.callMany(action.num).pipe(
            map(response => actions.callMany_success(response)),
            catchError((apiException: ApiException) => of(actions.callMany_failure(apiException)))
        )))
    )

    public callAll$ = createEffect(() => this.actions$.pipe(
        ofType(actions.callAll),
        exhaustMap(action => this.apiService.callAll().pipe(
            map(response => actions.callAll_success(response)),
            catchError((apiException: ApiException) => of(actions.callAll_failure(apiException)))
        )))
    )

    public setOptionCallImmediate$ = createEffect(() => this.actions$.pipe(
        ofType(actions.setOptionCallImmediate),
        exhaustMap(action => this.apiService.setOptionCallImmediate(action.option).pipe(
            map(response => actions.setOptionCallImmediate_success(response)),
            catchError((apiException: ApiException) => of(actions.setOptionCallImmediate_failure(apiException)))
        )))
    )

    public exit$ = createEffect(() => this.actions$.pipe(
        ofType(actions.exit),
        exhaustMap(action => this.apiService.exit(action.poolNumber).pipe(
            map(response => actions.exit_success(response)),
            catchError((apiException: ApiException) => of(actions.exit_failure(apiException)))
        )))
    )

    public escort$ = createEffect(() => this.actions$.pipe(
        ofType(actions.escort),
        exhaustMap(action => this.apiService.escort(action.poolNumber).pipe(
            map(response => actions.escort_success(response)),
            catchError((apiException: ApiException) => of(actions.escort_failure(apiException)))
        )))
    )

    public dispatch$ = createEffect(() => this.actions$.pipe(
        ofType(actions.dispatch),
        exhaustMap(action => this.apiService.dispatch(action.poolNumber).pipe(
            map(response => actions.dispatch_success(response)),
            catchError((apiException: ApiException) => of(actions.dispatch_failure(apiException)))
        )))
    )
}