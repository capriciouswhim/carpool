import { createFeature } from "@ngrx/store";
import { settingsSource } from "./settings.state";
import { settingsReducer } from "./settings.reducer";

export const settingsFeature = createFeature({
    name: settingsSource,
    reducer: settingsReducer
})

export const selectOverscan = settingsFeature.selectOverscan