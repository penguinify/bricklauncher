

type KeyString = {
    [key: string]: string
}

type RobloxSettingsValues = {
    Renderer: {
        Framework: string | null
        [key: string]: string | null
    }
    Lighting: {
        Phase: string | null
        [key: string]: string | null
    }
    Graphics: {
        MoreQualityOptions: string | null
        [key: string]: string | null
    }
}

type RobloxSettings = {
    Renderer: {
        [key: string]: (input: string | null) => KeyString | {}
    }
    Lighting: {
        [key: string]: (input: string | null) => KeyString | {}
    }

    Graphics: {
        [key: string]: (input: string | null) => KeyString | {}
    }
}

const Settings: RobloxSettings = {
    Renderer: {
        Framework: function (input: string | null = null) {
            switch (input) {
                case "Metal":
                    return {
                        "FFlagDebugGraphicsPreferMetal": "True"
                    }
                case "Vulkan":
                    return {
                        "FFlagDebugGraphicsDisableDirect3D11": "True",
                        "FFlagDebugGraphicsPreferVulkan": "True"
                    }
                case "OpenGL":
                    return {
                        "FFlagDebugGraphicsDisableDirect3D11": "True",
                        "FFlagDebugGraphicsPreferOpenGl": "True"
                    }
                default:
                    return {}
            }
            
        }
    },
    Lighting: {
        Phase: function (input: string | null = null) {
            switch (input) {
                case "Voxel: Phase 1":
                    return {
                        "DFFlagDebugRenderForceTechnologyVoxel": "True"
                    }
                case "Shadow Map: Phase 2":
                    return {
                        "DFFlagDebugRenderForceTechnologyShadowMap": "True"
                    }
                case "Future: Phase 3":
                    return {
                        "DFFlagDebugRenderForceTechnologyShadowMapV2": "True"
                    }
                default:
                    return {}
            }
        }
    },
    Graphics: {
        MoreQualityOptions: function (input: string | null = null) {
            if (input == "True") {
                return {
                    "FFlagCommitToGraphicsQualityFix": "True",
                    "FFlagFixGraphicsQuality": "True"
                }
            } else {
                return {}
            }
        }
    }
}


function flattenSettings(settings: RobloxSettingsValues): KeyString {
    // TODO: Add Typesafety lol
    let flattenedSettings: KeyString = {}

    for (let category in settings) {
        let categorykey = category as keyof RobloxSettingsValues
        
        for (let key in settings[categorykey]) {

            let keykey = key as keyof KeyString
            let value: string | null = settings[categorykey][keykey]

            flattenedSettings = {
                ...flattenedSettings,
                ...Settings[category as keyof RobloxSettings][key as keyof KeyString](value)

            }
            
        }

    }



    return flattenedSettings
}

export { Settings, flattenSettings }
export type { RobloxSettingsValues, KeyString }
