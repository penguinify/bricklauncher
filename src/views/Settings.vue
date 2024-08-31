<template>
    <div class="settings-container">
        <div class="header">
            <h1><span>roblox </span><span>settings</span></h1>
        </div>

        <div class="buttons">
            <div>
                <RouterLink to="/">
                <button class="button-left">back</button>
                </RouterLink>

                <RouterLink to="settings">
                <button class="button-right" @click="patch">apply</button>
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
    import { Settings, flattenSettings, RobloxSettingValues } from '../fflags';
    import { PatchSettings, PatchOption } from '../settings';
    import Dropdown from '../components/Dropdown.vue';
    import Switch from '../components/Switch.vue';
    import { invoke } from '@tauri-apps/api/tauri';

    import { reactive, onBeforeMount, getCurrentInstance } from 'vue';
    

    var robloxsettings = reactive<RobloxSettingValues>({
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
            console.log(res);
        });

    }

    function load_cache() {
        invoke('get_cache').then((res) => {
            
            // edits the values of robloxsettings so that they update the components
            for (let key in res) {
                robloxsettings[key] = res[key];
            }

        });
    }



    load_cache();


</script>


<style>

.settings-container {
    width: clamp(30rem, 50vw, 60rem);
    height: clamp(40rem, 50vh, 60rem);

    border-radius: 3rem;

    overflow-y: auto;
    overflow-x: hidden;
    padding: 2rem;
}

.buttons {
    display: flex;
    flex-direction: column;
    align-items: center;
    margin-top: 2rem;

    a {
        width: 100%;
        transition: 0.5s ease;
    }

    button {
        background-color: var(--secondary);
        color: var(--text);
        border: none;
        padding: 1rem 0rem;
        cursor: pointer;
        transition: 1s ease;
        font-size: 1.5rem;
        width: 100%;

        font-weight: 300;

        font-family: 'Inter', sans-serif;

        &:hover {
            background-color: var(--accent);
        }
    }

    div {
        display: flex;
        width: 100%;

        &:hover :not(a:hover) {
            width: 60%;

            button {
                width: 100%;
            }
        }

        &:hover a:hover {
            button {
                width: 100%;
            }
        }
    }

    .button-right {
        border-bottom-right-radius: var(--border-radius);
        border-top-right-radius: var(--border-radius);
    }
    
    .button-left {
        border-bottom-left-radius: var(--border-radius);
        border-top-left-radius: var(--border-radius);
    }


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
