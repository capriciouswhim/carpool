import { createReducer, on } from "@ngrx/store";
import { settingsInitialState, SettingsState } from "./settings.state";
import { settingsAction } from "./settings.action";

const enabled = '1'
const disabled = ''

interface SetBoolean { value: boolean }

export const settingsReducer = createReducer(
    settingsInitialState,
    on(settingsAction.setOverscan, (s,a) => setOverscan(s,a))
)

function setOverscan(s: SettingsState, a: SetBoolean) {
    localStorage.setItem('overscan', a.value ? enabled : disabled)

    return {
        ...s,
        overscan: a.value
    }
}