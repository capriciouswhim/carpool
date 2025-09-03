import { PoolNumber as APIPoolNumber } from '../../../api/src/model/pool-number.model'

interface PoolNumber extends APIPoolNumber {
    isNew: boolean
    isReleased: boolean
    isStale: boolean
}

export function fixAxiosDates(poolNumber: APIPoolNumber): PoolNumber {
    // no need to typecheck if we just call toString.
    const textCalled = poolNumber.called.toString();
    const textReleased = poolNumber.released?.toString() ?? null
    
    const dateCalled = new Date(textCalled)
    const dateReleased = textReleased ? new Date(textReleased) : null

    return {
        ...poolNumber,
        called: dateCalled,
        released: dateReleased,
        isNew: poolNumber.paused ? false : getIntervalSecondsFromNow(dateCalled) < freshnessSeconds,
        isReleased: null !== poolNumber.released,
        isStale: poolNumber.paused ? false : getIntervalSecondsFromNow(dateReleased) > freshnessSeconds,
    }
}

const freshnessSeconds = 10;

function getIntervalSecondsFromNow(date: Date | null | undefined) {
    if( date ) {
        return Math.abs((Date.now() - date.valueOf()) / 1000);
    } else {
        return 0;
    }
}

export type { APIPoolNumber, PoolNumber }