<template>
    <div class="settings-container">
        <div class="header">
            <h1><span>roblox </span><span>settings</span></h1>
        </div>

        <div class="buttons">
            <div>
                <RouterLink to="/">
                    <button class="button-left" @click="patch_wrapper()">
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            viewBox="0 0 448 512">
                            <!--!Font Awesome Free 6.6.0 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license/free Copyright 2024 Fonticons, Inc.-->
                            <path
                                d="M9.4 233.4c-12.5 12.5-12.5 32.8 0 45.3l160 160c12.5 12.5 32.8 12.5 45.3 0s12.5-32.8 0-45.3L109.2 288 416 288c17.7 0 32-14.3 32-32s-14.3-32-32-32l-306.7 0L214.6 118.6c12.5-12.5 12.5-32.8 0-45.3s-32.8-12.5-45.3 0l-160 160z" />
                        </svg>
                        back
                    </button>
                </RouterLink>
                <RouterLink to="customfflags" @click="patch_wrapper()">
                    <button class="button-right">
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            viewBox="0 0 448 512">
                            <!--!Font Awesome Free 6.6.0 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license/free Copyright 2024 Fonticons, Inc.-->
                            <path
                                d="M64 32C64 14.3 49.7 0 32 0S0 14.3 0 32L0 64 0 368 0 480c0 17.7 14.3 32 32 32s32-14.3 32-32l0-128 64.3-16.1c41.1-10.3 84.6-5.5 122.5 13.4c44.2 22.1 95.5 24.8 141.7 7.4l34.7-13c12.5-4.7 20.8-16.6 20.8-30l0-247.7c0-23-24.2-38-44.8-27.7l-9.6 4.8c-46.3 23.2-100.8 23.2-147.1 0c-35.1-17.6-75.4-22-113.5-12.5L64 48l0-16z" />
                        </svg>
                        custom fflags
                    </button>
                </RouterLink>
  
            </div>
        </div>

        <div class="options">
            <Dropdown
                label="Renderer Framework"
                description="Which rendering framework to use. Metal is the best if you are unsure."
                :options="['Metal', 'Vulkan', 'OpenGL']"
                v-model:value="robloxsettings.Renderer.Framework"
                :default="robloxsettings.Renderer.Framework" />
            <Dropdown
                label="Lighting Technology"
                description="The lighting technology to use."
                :options="[
                    'Game Default (Recommended)',
                    'Shadow Map: Phase 2',
                    'Voxel: Phase 1',
                    'Future: Phase 3'
                ]"
                v-model:value="robloxsettings.Lighting.Phase"
                :default="robloxsettings.Lighting.Phase" />
            <Switch
                label="More Quality Options"
                description="Graphics quality is now a scale from 1-21 instead of 1-7"
                v-model:value="robloxsettings.Graphics.MoreQualityOptions"
                :default="robloxsettings.Graphics.MoreQualityOptions" />
            <Switch
                label="Show FPS"
                description="Show the FPS counter in the top left corner of the screen."
                v-model:value="robloxsettings.Graphics.ShowFPS"
                :default="robloxsettings.Graphics.ShowFPS" />
            <Switch
                label="Unlock FPS"
                description="Unlock the FPS cap of 60. If your monitor is 60hz, this will not do anything. If you want more fps than you can disable vsync using quartz debug"
                v-model:value="robloxsettings.Graphics.UnlockFPS"
                :default="robloxsettings.Graphics.UnlockFPS" />
            <Switch
                label="Dark Blue Theme"
                description="Makes the accent color blue and background colors darker. Looks really good imo"
                v-model:value="robloxsettings.Graphics.BlueColors"
                :default="robloxsettings.Graphics.BlueColors" />
        </div>
    </div>
</template>

<script setup lang="ts">
import { flattenSettings, RobloxSettingsValues } from '../fflags'
import Dropdown from '../components/Dropdown.vue'
import Switch from '../components/Switch.vue'
import { invoke } from '@tauri-apps/api/tauri'
import { animateSpin, patch } from '../lib'
import { reactive } from 'vue'
var robloxsettings = reactive<RobloxSettingsValues>({
    Renderer: {
        Framework: ''
    },
    Lighting: {
        Phase: ''
    },
    Graphics: {
        MoreQualityOptions: '',
        ShowFPS: '',
        UnlockFPS: '',
        BlueColors: ''
    }
})

async function patch_wrapper() {
    await invoke('set_cache', { json: robloxsettings, cacheFileName: 'robloxsettings.json' })
    patch(robloxsettings)
}

function load_cache() {
    invoke('get_cache', { cacheFileName: 'robloxsettings.json' }).then((res) => {
        const settings = res as RobloxSettingsValues;
        for (const key in settings) {
            robloxsettings[key] = settings[key];
        }
    });
}

load_cache()
</script>

