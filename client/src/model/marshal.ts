import { Injectable } from "@angular/core";
import { PoolNumberState, TypedPoolNumber } from "./typedPoolNumber.model";
import { carpoolAction } from "../store";

export type Role = 'LANE' | 'DOOR' | 'ROOM' | 'ESCORT' | 'GLOBAL'

@Injectable({ providedIn: 'root' })
export class Marshal {
    nextStep(role: Role, poolNumber: TypedPoolNumber) {
        
        const payload = { poolNumber: poolNumber.pool_number }

        switch(poolNumber.state) {
            case 'LANE':
                // Are we working as the LANE?
                return role === 'LANE'
                    // The lane may remove numbers
                    // entered by mistake.
                    ? carpoolAction.laneDel(payload)
                    // All other stations may call
                    // the pool number.
                    : carpoolAction.doorCallOne(payload)
            case 'CALL':
            case 'RECALL':
                // Are we working as the LANE or DOOR?
                return role === 'LANE' || role === 'DOOR'
                    // The door may recall numbers
                    ? carpoolAction.doorCallOne(payload)
                    // All other stations may send
                    // students to the exit
                    : carpoolAction.roomSend(payload)                
            case 'SEND':
                // A student(s) have been sent from the
                // classroom to the door.  All stations
                // may exit that student to the carpool
                return carpoolAction.doorExit(payload)
            case 'EXIT':
                // A student(s) have exited the school
                // into the carpool.  All stations may
                // indicate that the student has left
                // the property
                return carpoolAction.escortGone(payload)
            case 'GONE':
                // Our records show a student has left
                // the property, however the process
                // can be restarted by any station,
                // re-calling the number
                return carpoolAction.doorCallOne(payload)
            default:
                // When in doubt, just poll
                return carpoolAction.get()
        }
    }
}