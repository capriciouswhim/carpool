import { createReducer, on } from "@ngrx/store";
import { settingsInitialState, SettingsState } from "./settings.state";
import { settingsAction } from "./settings.action";

const enabled = '1'
const disabled = ''

interface SetBoolean { value: boolean }

export const settingsReducer = createReducer(
    settingsInitialState,
    on(settingsAction.setSinistral, (s,a) => setBoolean(s, 'sinistral', a)),
    on(settingsAction.setOverscan, (s,a) => setBoolean(s, 'overscan', a))
)

function setBoolean(s: SettingsState, n:string, a: SetBoolean) {
    localStorage.setItem(n, a.value ? enabled : disabled)

    const result: SettingsState = {
        ...s
    }

    Object.defineProperty(result, n, { value: a.value })

    return result;
}