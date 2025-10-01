import { Component, inject, input, OnChanges, signal, SimpleChanges } from "@angular/core";
import { TypedPoolNumber } from "../../model";
import { CommonModule } from "@angular/common";
import { MatButtonModule } from "@angular/material/button";
import { MatIconModule } from "@angular/material/icon";
import { MatMenuModule } from "@angular/material/menu";
import { Store } from "@ngrx/store";
import { carpoolAction } from "../../store";

@Component({
    selector: 'car-pool-number',
    imports: [CommonModule, MatButtonModule, MatIconModule, MatMenuModule],
    templateUrl: 'pool-number.component.html',
    styleUrl: 'pool-number.component.scss'
})
export class PoolNumberComponent implements OnChanges {
    store = inject(Store)
    typedPoolNumber = input.required<TypedPoolNumber>()
    blink_interval = 250; // ms
    blink_timer: number | null = null
    blink = signal(false);

    ngOnChanges(changes: SimpleChanges): void {
        if(this.typedPoolNumber().state === 'RECALL' && !this.blink_timer) {
            this.blink_timer = setInterval(() => {
                this.blink.set(!this.blink())
            }, this.blink_interval)
        }
        if(this.blink_timer && this.typedPoolNumber().state !== 'RECALL') {
            clearInterval(this.blink_timer);
            this.blink_timer = null;
        }
    }

    del = () => this.store.dispatch(carpoolAction.del({ poolNumber: this.typedPoolNumber().pool_number }));
    call = () => this.store.dispatch(carpoolAction.callOne({ poolNumber: this.typedPoolNumber().pool_number }));
    send = () => this.store.dispatch(carpoolAction.send({ poolNumber: this.typedPoolNumber().pool_number }));
    escort = () => this.store.dispatch(carpoolAction.escort({ poolNumber: this.typedPoolNumber().pool_number }));
    dispatch = () => this.store.dispatch(carpoolAction.dispatch({ poolNumber: this.typedPoolNumber().pool_number }));

    getBorderStyle() {
        return this.typedPoolNumber().state.toLowerCase()
    }

    getIcon() {
        switch(this.typedPoolNumber().state) {
            case 'LANE':    return 'time_to_leave'
            case 'CALL':    return 'notifications'
            case 'RECALL':  return 'notification_important'
            case 'SEND':    return 'follow_the_signs'
            case 'EXIT':    return 'escalator_warning'
            case 'GONE':    return 'flight_takeoff'
        }
    }

    getHumanType() {
        switch(this.typedPoolNumber().state) {
            case 'LANE':    return 'Car Arrived'
            case 'CALL':    return 'Called'
            case 'RECALL':  return 'Recalled'
            case 'SEND':    return 'Student Sent'
            case 'EXIT':    return 'Student Outside'
            case 'GONE':    return 'Car Departed'
        }
    }

    canRemove() {
        // if pref show all options, return true
        switch(this.typedPoolNumber().state) {
            case 'LANE':
                return true;
            case 'CALL':
            case 'RECALL':
            case 'SEND':
            case 'EXIT':
            case 'GONE':
                return false;
        }
    }
    canCall() {
        // if pref show all options, return true
        switch(this.typedPoolNumber().state) {
            case 'LANE':
                return true;
            case 'CALL':
            case 'RECALL':
            case 'SEND':
            case 'EXIT':
            case 'GONE':
                return false;
        }
    }
    canRecall() {
        // if pref show all options, return true
        switch(this.typedPoolNumber().state) {
            case 'LANE':
                return false;
            case 'CALL':
                return true;
            case 'RECALL':
                return false;
            case 'SEND':
                return true;
            case 'EXIT':
            case 'GONE':
                return false;
        }
    }
    canSend() {
        // if pref show all options, return true
        switch(this.typedPoolNumber().state) {
            case 'LANE':
                return false;
            case 'CALL':
            case 'RECALL':
                return true;
            case 'SEND':
            case 'EXIT':
            case 'GONE':
                return false;
        }
    }
    canExit() {
        // if pref show all options, return true
        switch(this.typedPoolNumber().state) {
            case 'LANE':
            case 'CALL':
            case 'RECALL':
                return false;
            case 'SEND':
                return true;
            case 'EXIT':
            case 'GONE':
                return false;
        }
    }
    canDispatch() {
        // if pref show all options, return true
        switch(this.typedPoolNumber().state) {
            case 'LANE':
            case 'CALL':
            case 'RECALL':
            case 'SEND':
                return false;
            case 'EXIT':
                return true;
            case 'GONE':
                return false;
        }
    }
    isGone() {
        switch(this.typedPoolNumber().state) {
            case 'LANE':
            case 'CALL':
            case 'RECALL':
            case 'SEND':
            case 'EXIT':
                return false;
            case 'GONE':
                return true;
        }  
    }
}