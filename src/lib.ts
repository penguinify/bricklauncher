import { invoke } from '@tauri-apps/api/tauri'
import { RobloxSettingsValues, flattenSettings } from './fflags'

function animateSpin(elementid: string, time: number): void {
    let element = document.getElementById(elementid)

    element?.animate(
        [{ transform: 'rotate(0deg)' }, { transform: 'rotate(360deg)' }],
        {
            duration: time,
            easing: 'ease'
        }
    )
}

async function patch(robloxsettings: RobloxSettingsValues) {

    let settings = flattenSettings(robloxsettings)
    
    let custom_fflags: Record<string, string> = {}

    try {
        custom_fflags = await invoke('get_custom_fflags_cache')
    } catch {
        console.error('No custom fflags')
    }

    settings = { ...settings, ...custom_fflags }
    await invoke('patch_roblox', { json: settings })
}


export { animateSpin, patch }
