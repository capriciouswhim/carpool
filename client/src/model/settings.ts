const enabled = '1'
const disabled = ''

export interface CarpoolSettings {
    overscan: boolean
}

export function getSettings() {
    const storage = window.localStorage
    
    return {
        overscan: storage.getItem('overscan') === enabled
    }
}

export function putSettings(settings: CarpoolSettings) {
    const storage = window.localStorage

    storage.setItem('overscan', settings.overscan ? enabled : disabled)
}