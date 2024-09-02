type KeyString = {
    [key: string]: string
}

type RobloxSettingsValues = {
    Renderer: {
        [key: string]: string
    }
    Lighting: {
        [key: string]: string
    }
    Graphics: {
        [key: string]: string
    }
}

type RobloxSettings = {
    Renderer: {
        [key: string]: (input: string) => KeyString | {}
    }
    Lighting: {
        [key: string]: (input: string) => KeyString | {}
    }

    Graphics: {
        [key: string]: (input: string) => KeyString | {}
    }
}

const Settings: RobloxSettings = {
    Renderer: {
        Framework: function (input: string) {
            switch (input) {
                case 'Metal':
                    return {
                        FFlagDebugGraphicsPreferMetal: 'True'
                    }
                case 'Vulkan':
                    return {
                        FFlagDebugGraphicsDisableDirect3D11: 'True',
                        FFlagDebugGraphicsPreferVulkan: 'True'
                    }
                case 'OpenGL':
                    return {
                        FFlagDebugGraphicsDisableDirect3D11: 'True',
                        FFlagDebugGraphicsPreferOpenGl: 'True'
                    }
                default:
                    return {}
            }
        }
    },
    Lighting: {
        Phase: function (input: string) {
            switch (input) {
                case 'Voxel: Phase 1':
                    return {
                        DFFlagDebugRenderForceTechnologyVoxel: 'True'
                    }
                case 'Shadow Map: Phase 2':
                    return {
                        DFFlagDebugRenderForceTechnologyShadowMap: 'True'
                    }
                case 'Future: Phase 3':
                    return {
                        DFFlagDebugRenderForceTechnologyShadowMapV2: 'True'
                    }
                default:
                    return {}
            }
        }
    },
    Graphics: {
        MoreQualityOptions: function (input: string) {
            if (input == 'True') {
                return {
                    FFlagCommitToGraphicsQualityFix: 'True',
                    FFlagFixGraphicsQuality: 'True'
                }
            } else {
                return {}
            }
        },

        ShowFPS: function (input: string) {
            if (input == 'True') {
                return {
                    FFlagDebugDisplayFPS: 'True'
                }
            } else {
                return {}
            }
        },

        UnlockFPS: function (input: string) {
            if (input == 'True') {
                return {
                    FFlagTaskSchedulerLimitTargetFpsTo2402: 'False',
                    DFIntTaskSchedulerTargetFps: '9999'
                }
            } else {
                return {}
            }
        },
        BlueColors: function (input: string) {
            if (input == 'True') {
                return {
                    FFlagLuaAppEnableFoundationColors: 'True'
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

    for (var category in settings) {
        var categorykey = category as keyof RobloxSettingsValues

        for (let key in settings[categorykey]) {
            let keykey = key as keyof KeyString
            let value: string = settings[categorykey][keykey]

            try { 
                flattenedSettings = {
                    ...flattenedSettings,
                    ...Settings[category as keyof RobloxSettings][
                        key as keyof KeyString
                    ](value)
                }
            } catch (e) {
                console.error(`Failed to apply setting ${category}.${key} with value ${value}`)
            }
        }
    }

    return flattenedSettings
}

export { Settings, flattenSettings }
export type { RobloxSettingsValues, KeyString }
