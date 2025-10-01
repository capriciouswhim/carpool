import { createReducer, on } from "@ngrx/store";
import { settingsInitialState, SettingsState } from "./settings.state";
import { settingsAction } from "./settings.action";

const enabled = '1'
const disabled = ''

export const settingsReducer = createReducer(
    settingsInitialState,
    on(settingsAction.setOverscan, (s,a) => setBoolean(s, 'overscan', a))
)

interface SetBoolean { value: boolean }
function setBoolean(s: SettingsState, n: string, a: SetBoolean) {
    localStorage.setItem(n, a.value ? enabled : disabled)
    const result = {...s}
    Object.defineProperty(result, n, { value: a })
    return result;
}