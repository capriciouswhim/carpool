export const enabled = '1'
export const settingsSource = 'settings'

export interface SettingsState {
    overscan: boolean
}

export const settingsInitialState: SettingsState = {
    overscan: localStorage.getItem('overscan') === enabled
}
