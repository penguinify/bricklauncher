<template>
    <div class="settings-container">


        <div class="header">
            <h1><span>roblox </span><span>settings</span></h1>
        </div>

        <div class="buttons">
            <div>
                <RouterLink to="/">
                <button class="button-left">
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512"><!--!Font Awesome Free 6.6.0 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license/free Copyright 2024 Fonticons, Inc.--><path d="M9.4 233.4c-12.5 12.5-12.5 32.8 0 45.3l160 160c12.5 12.5 32.8 12.5 45.3 0s12.5-32.8 0-45.3L109.2 288 416 288c17.7 0 32-14.3 32-32s-14.3-32-32-32l-306.7 0L214.6 118.6c12.5-12.5 12.5-32.8 0-45.3s-32.8-12.5-45.3 0l-160 160z"/></svg>
                    back
                </button>
                </RouterLink>

                <RouterLink to="settings">
                <button class="button-right" @click="patch()">
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512" id="apply-svg"><!--!Font Awesome Free 6.6.0 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license/free Copyright 2024 Fonticons, Inc.--><path d="M64 32C28.7 32 0 60.7 0 96L0 416c0 35.3 28.7 64 64 64l320 0c35.3 0 64-28.7 64-64l0-242.7c0-17-6.7-33.3-18.7-45.3L352 50.7C340 38.7 323.7 32 306.7 32L64 32zm0 96c0-17.7 14.3-32 32-32l192 0c17.7 0 32 14.3 32 32l0 64c0 17.7-14.3 32-32 32L96 224c-17.7 0-32-14.3-32-32l0-64zM224 288a64 64 0 1 1 0 128 64 64 0 1 1 0-128z"/></svg>
                    apply
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
            :default="robloxsettings.Renderer.Framework"
            />
            <Dropdown 
            label="Lighting Technology" 
            description="The lighting technology to use." 
            :options="['Game Default (Recommended)', 'Shadow Map: Phase 2', 'Voxel: Phase 1', 'Future: Phase 3']" 
            v-model:value="robloxsettings.Lighting.Phase" 
            :default="robloxsettings.Lighting.Phase"
            />
            <Switch 
            label="More Quality Options" 
            description="Graphics quality is now a scale from 1-21 instead of 1-7" 
            v-model:value="robloxsettings.Graphics.MoreQualityOptions" 
            :default="robloxsettings.Graphics.MoreQualityOptions"
            />
            <Switch 
            label="Show FPS" 
            description="Show the FPS counter in the top left corner of the screen." 
            v-model:value="robloxsettings.Graphics.ShowFPS" 
            :default="robloxsettings.Graphics.ShowFPS"
            />
            <Switch 
            label="Unlock FPS" 
            description="Unlock the FPS cap of 60." 
            v-model:value="robloxsettings.Graphics.UnlockFPS" 
            :default="robloxsettings.Graphics.UnlockFPS"
            />
        </div>
    </div>
</template>


<script setup lang="ts">
    import { flattenSettings, RobloxSettingsValues } from '../fflags';
    import Dropdown from '../components/Dropdown.vue';
    import Switch from '../components/Switch.vue';
    import { invoke } from '@tauri-apps/api/tauri';

    import { reactive } from 'vue';
    var robloxsettings = reactive<RobloxSettingsValues>({
        Renderer: {
            Framework: ""
        },
        Lighting: {
            Phase: ""
        },
        Graphics: {
            MoreQualityOptions: "",
            ShowFPS: "",
            UnlockFPS: ""
        }
    });

    function patch() {
        console.log(robloxsettings);

        invoke('set_cache', { json: robloxsettings }).then((res) => {
            console.log(res);
        });

        let settings = flattenSettings(robloxsettings);
        invoke('patch_roblox', { json: settings }).then((res) => {
            document.getElementById('apply-svg')?.animate([
                { transform: 'rotate(0deg)' },
                { transform: 'rotate(360deg)' }
            ], {
                duration: 500,
                easing: 'ease',
                iterations: 1
            });
            
            console.log(res);
        });

    }
/* Scroll bar stylings */

    function load_cache() {
        invoke('get_cache').then((res) => {

            
            // edits the values of robloxsettings so that they update the components
            for (let key in res as RobloxSettingsValues) {

                robloxsettings[key as keyof RobloxSettingsValues] = (res as RobloxSettingsValues)[key as keyof RobloxSettingsValues];
            }

        });
    }



    load_cache();


</script>


<style>

.settings-container {
    width: clamp(30rem, 50vw, 60rem);
    height: clamp(20rem, 70vh, 90rem);

    border-radius: 3rem;

    overflow-y: auto;
    overflow-x: hidden;
    padding: 2rem;
}

    .button-right {
        border-bottom-right-radius: var(--border-radius);
        border-top-right-radius: var(--border-radius);
    }
    
    .button-left {
        border-bottom-left-radius: var(--border-radius);
        border-top-left-radius: var(--border-radius);
    }

            .setting-label {
                font-size: 1.7rem;
                font-weight: 500;
                line-height: 0;
                margin-top: 2rem;
            }

            .setting-description {
                font-size: 1rem;
                font-weight: 300;
                margin-top: 0;
            }

            .options {
                div {
                    display: flex;
                    flex-direction: column;
                    margin-top: 1rem;
                    background-color: var(--secondary);
                    padding: 1rem;
                    border-radius: var(--border-radius);
                }
            }
</style>
