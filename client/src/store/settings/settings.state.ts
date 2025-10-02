export const enabled = '1'
export const settingsSource = 'settings'

export interface SettingsState {
    overscan: boolean
    sinistral: boolean
}

export const settingsInitialState: SettingsState = {
    overscan: localStorage.getItem('overscan') === enabled,
    sinistral: localStorage.getItem('sinistral') === enabled
}
