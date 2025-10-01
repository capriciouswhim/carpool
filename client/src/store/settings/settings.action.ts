import { createActionGroup, props } from "@ngrx/store";
import { settingsSource } from "./settings.state";

export const settingsAction = createActionGroup({
    source: settingsSource,
    events: {
        setOverscan: props<{value: boolean}>()
    }
})